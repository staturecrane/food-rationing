import React, { Component } from 'react';
import './App.css';


import Grid from "@material-ui/core/Grid";
import Header from './components/Header';
import CreateMeal from './components/CreateMeal';
import MealForm from './components/MealForm';
import MealList from './components/MealList';


const API_URL = process.env.API_URL;

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      meals: [],
      newMealData: {},
      newMeal: false,
      selectedMeal: {}
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

  updateMealData(key, value) {
    const newMealData = this.state.newMealData
    newMealData[key] = value
    this.setState({ newMealData })
  }

  handleClick(action) {
    this.setState({
      newMeal: action,
      newMealData: action ? this.state.newMealData : {},
      selectedMeal: {}
    })
  }

  componentDidMount() {
    this.getMeals()
  }

  render() {
    return (
      <div className="App">
        <Header />
        <CreateMeal
          handleClick={this.handleClick.bind(this)}
          mealStarted={this.state.newMeal}
        />

        <div className="meal-container">
          <MealList
            meals={this.state.meals}
            selectedMeal={this.state.selectedMeal}
            selectMeal={(selectedMeal) => this.setState({ selectedMeal })}
            deleteMeal={this.deleteMeal.bind(this)}
          />
          {
            this.state.newMeal ?
              <MealForm updateMealData={this.updateMealData.bind(this)} handleSubmit={this.addMeals.bind(this)} />
              : ''
          }
        </div>
      </div >
    );
  }

}

export default App;
