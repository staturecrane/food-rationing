import time
import uuid

import psycopg2.extras

import psycopg2 as pg

from flask import abort, Flask, jsonify, request
from flask_cors import CORS


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
            servings float);
        """
    )
    connection.commit()
except pg.errors.DuplicateTable:
    connection.rollback()
    pass
finally:
    cursor.close()


@app.route("/meal", methods=["POST"])
def post_meal():
    data = request.json

    meal_id = uuid.uuid4()

    cursor = connection.cursor()
    cursor.execute(
        "INSERT INTO meal VALUES (%s, %s, %s, %s, %s, %s, %s)",
        (
            (
                str(meal_id),
                data.get("name"),
                data.get("calories"),
                data.get("fat"),
                data.get("carbs"),
                data.get("protein"),
                data.get("servings"),
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
