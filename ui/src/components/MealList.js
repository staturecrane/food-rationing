import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  sideBox: {
    width: "30%",
    height: "100%",
    outline: "1px solid black",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  }
}));

function MealList(props) {
  const classes = useStyles();

  return (
    <div className="meal-list" maxWidth='xl'>
      <Typography variant="h6">
        Meals
        </Typography>
      <Box className={classes.sideBox}>
        {props.meals.map(x => {
          const selectedMeal = props.selectedMeal || {}
          return (
            <Card
              onClick={() => props.selectMeal(x)}
              raised={selectedMeal.id == x.id}
              className="meal-list-item"
            >
              <CardContent>
                <Typography variant="h5" component="h2">
                  {x.name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {x.calories} Calories
                </Typography>
                <Typography variant="body2" component="p">
                  {x.fat}g Fat
                </Typography>
                <Typography variant="body2" component="p">
                  {x.carbs}g Carbs
                </Typography>
                <Typography variant="body2" component="p">
                  {x.protein}g Protein
                </Typography>
                <Typography variant="body2" component="p">
                  {x.servings} Servings
                </Typography>
                {selectedMeal.id === x.id ?
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<Icon>clear</Icon>}
                    onClick={() => props.deleteMeal(x.id)}
                  >
                    Delete
                </Button> : ""
                }
              </CardContent>
            </Card>
          )
        })
        }
      </Box>
    </div>
  );
}

export default MealList;
