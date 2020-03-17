import React from 'react';

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";


function Header(props) {
    return (
        <div className="meal-form">
            <TextField
                className="meal-form-item"
                id="outlined-basic"
                label="Meal name"
                variant="outlined"
                onChange={e => props.updateMealData("name", e.target.value)}
            />
            <TextField
                className="meal-form-item"
                id="outlined-basic"
                label="Calories"
                variant="outlined"
                onChange={e => props.updateMealData("calories", e.target.value)}
            />
            <TextField
                className="meal-form-item"
                id="outlined-basic"
                label="Fat"
                variant="outlined"
                onChange={e => props.updateMealData("fat", e.target.value)}
            />
            <TextField
                className="meal-form-item"
                id="outlined-basic"
                label="Carbs"
                variant="outlined"
                onChange={e => props.updateMealData("carbs", e.target.value)}
            />
            <TextField
                className="meal-form-item"
                id="outlined-basic"
                label="Protein"
                variant="outlined"
                onChange={e => props.updateMealData("protein", e.target.value)}
            />
            <TextField
                className="meal-form-item"
                id="outlined-basic"
                label="Servings"
                variant="outlined"
                onChange={e => props.updateMealData("servings", e.target.value)}
            />
            <Button
                variant="outlined"
                color="primary"
                onClick={() => props.handleSubmit()}
            >
                Submit
            </Button>
        </div >
    )
}

export default Header;