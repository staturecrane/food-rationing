import React, { Component } from 'react';
import './App.css';


import Header from './components/Header';
import CreateMeal from './components/CreateMeal';
import CreatePlan from './components/CreatePlan';
import MealForm from './components/MealForm';
import MealList from './components/MealList';
import PlanForm from './components/PlanForm';
import PlanSolution from './components/PlanSolution';



class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      meals: [],
      newMealData: {},
      newPlanData: {},
      newMeal: false,
      newPlan: false,
      selectedMeal: {},
      solution: []
    }
  }

  deleteMeal(id) {
    fetch(`http://localhost:8000/meal/${id}`, {
      method: "DELETE"
    })
      .then(data => {
        this.setState({
          selectedMeal: {}
        })
        this.getMeals()
      })
  }

  getMeals() {
    fetch(`http://localhost:8000/meal`)
      .then(data => {
        return data.json()
      })
      .then(data => this.setState({ meals: data }))
  }

  addMeals() {
    fetch(`http://localhost:8000/meal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.newMealData)
    })
      .then(data => data.json())
      .then(data => {
        this.setState({
          newMeal: false,
          newMealData: {}
        })
        this.getMeals()
      })
      .catch(err => {
        console.log(err)
      })
  }

  createPlan() {
    const meals = this.state.meals.map(x => x.id)
    fetch(`http://localhost:8000/meal/plan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...this.state.newPlanData, meals })
    })
      .then(data => data.json())
      .then(data => {
        this.setState({ solution: data, newPlan: false })
      })
  }

  updateMealData(key, value) {
    const newMealData = this.state.newMealData
    newMealData[key] = value
    this.setState({ newMealData })
  }

  updatePlanData(key, value) {
    const newPlanData = this.state.newPlanData
    newPlanData[key] = value
    this.setState({ newPlanData })
  }

  handleMeal(action) {
    this.setState({
      newMeal: action,
      newMealData: action ? this.state.newMealData : {},
      selectedMeal: {},
    })
  }

  handlePlan(action) {
    this.setState({
      newPlan: action,
      newPlanData: {},
      solution: []
    })
  }

  componentDidMount() {
    this.getMeals()
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="options">
          <CreateMeal
            handleClick={this.handleMeal.bind(this)}
            mealStarted={this.state.newMeal}
          />

          <CreatePlan
            handleClick={this.handlePlan.bind(this)}
            planStarted={this.state.newPlan}
          />
        </div>

        <div className="meal-container">
          <MealList
            meals={this.state.meals}
            selectedMeal={this.state.selectedMeal}
            selectMeal={(selectedMeal) => {
              this.state.selectedMeal == selectedMeal ?
                this.setState({ selectedMeal: '' }) :
                this.setState({ selectedMeal })
            }}
            deleteMeal={this.deleteMeal.bind(this)}
          />
          {
            this.state.newMeal ?
              <MealForm
                updateMealData={this.updateMealData.bind(this)}
                handleSubmit={this.addMeals.bind(this)}
              />
              : ''
          }
          {
            this.state.newPlan ?
              <PlanForm
                updatePlanData={this.updatePlanData.bind(this)}
                handleSubmit={this.createPlan.bind(this)}
              /> : ''
          }
          {
            this.state.solution.length > 0 ?
              <PlanSolution solution={this.state.solution} /> : ''
          }
        </div>
      </div >
    );
  }

}

export default App;
