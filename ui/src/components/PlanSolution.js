import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function renderMeals(meals) {
  return meals.map(x => {
    return (
      <Card
        className="solution-meal"
      >
        <CardContent>
          <Typography variant="h5" component="h2">
            {x.name}
          </Typography>
          <Typography color="textSecondary">
            {x.calories} Calories
          </Typography>
          <Typography variant="body2" component="p">
            {x.servings} Servings
          </Typography>
        </CardContent>
      </Card>
    )
  })
}


function PlanSolution(props) {
  console.log(props)
  return (
    <div className="solution">
      <Typography variant="h6">
        Solution
        <div className="solution-box">
          {props.solution.map((x, i) => {
            return (
              <div className="solution-day">
                <h5>Day {i + 1}</h5>
                {renderMeals(x.filter(y => y.servings > 0))}
              </div>
            )
          })}
        </div>
      </Typography>
    </div>
  )
}

export default PlanSolution;
