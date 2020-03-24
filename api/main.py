import time
import uuid

import psycopg2.extras

import psycopg2 as pg

from flask import abort, Flask, jsonify, request
from flask_cors import CORS
from ortools.sat.python import cp_model

app = Flask(__name__)
CORS(app)

connection = pg.connect(
    host="postgres", user="postgres", password="", dbname="rationing"
)

try:
    cursor = connection.cursor()
    cursor.execute(
        """
        CREATE TABLE meal (
            id uuid, 
            name varchar(50), 
            calories integer, 
            fat integer, 
            carbs integer, 
            protein integer, 
            servings float,
            quantity integer
        );
        """
    )
    connection.commit()
except (pg.errors.DuplicateTable, pg.errors.UniqueViolation):
    connection.rollback()
finally:
    cursor.close()


@app.route("/meal", methods=["POST"])
def post_meal():
    data = request.json

    meal_id = uuid.uuid4()

    cursor = connection.cursor()
    cursor.execute(
        "INSERT INTO meal VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
        (
            (
                str(meal_id),
                data.get("name"),
                data.get("calories"),
                data.get("fat"),
                data.get("carbs"),
                data.get("protein"),
                data.get("servings"),
                data.get("quantity"),
            )
        ),
    )
    connection.commit()
    cursor.close()

    return jsonify({**{"id": meal_id}, **data})


@app.route("/meal", methods=["GET"])
def get_meal():
    data = request.json

    cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cursor.execute("SELECT * FROM meal")

    return jsonify([dict(x) for x in cursor.fetchall()])


@app.route("/meal/<meal_id>", methods=["DELETE"])
def delete_meal(meal_id):
    cursor = connection.cursor()
    cursor.execute("DELETE FROM meal WHERE id=%s", (meal_id,))

    try:
        connection.commit()
    except Exception as e:
        return abort(e)
    finally:
        cursor.close()

    return f"Meal {meal_id} successfully deleted"


@app.route("/meal/plan", methods=["POST"])
def create_meal_plan():
    model = cp_model.CpModel()

    plan_data = request.json
    num_days = int(plan_data.get("days"))
    min_calories = int(plan_data.get("min_calories_per_day"))
    max_calories = int(plan_data.get("max_calories_per_day", 2500))

    meal_ids = plan_data.get("meals")

    cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cursor.execute(
        """
        SELECT 
            id, 
            name, 
            calories, 
            servings, 
            quantity 
        FROM meal 
        WHERE id IN %s
    """,
        (tuple(meal_ids),),
    )

    meals = [dict(x) for x in cursor.fetchall()]

    days = []
    for i in range(num_days):
        day = []
        for j in range(len(meals)):
            meal_variable = model.NewIntVar(0, meals[j].get("quantity"), f"{i}-{j}")
            day.append(meal_variable)
        days.append(day)

    for i, day in enumerate(days):
        model.Add(
            sum([day[n] * meals[n].get("calories") for n in range(len(meals))])
            >= min_calories
        )
        model.Add(
            sum([day[n] * meals[n].get("calories") for n in range(len(meals))])
            <= max_calories
        )
    for i in range(len(meals)):
        model.Add(
            sum([days[j][i] for j in range(len(days))])
            <= meals[i].get("quantity") * round(meals[i].get("servings"))
        )

    solver = cp_model.CpSolver()
    status = solver.Solve(model)

    solution = []

    for i in range(num_days):
        day_solution = []
        for j in range(len(meals)):
            day_meal = {**meals[j]}

            day_meal["servings"] = solver.Value(days[i][j])
            del day_meal["quantity"]

            day_solution.append(day_meal)
        solution.append(day_solution)

    return jsonify(solution)
