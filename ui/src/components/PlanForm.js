import React from 'react';

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";


function PlanForm(props) {
    return (
        <div className="plan-form">
            <TextField
                className="plan-form-item"
                id="outlined-basic"
                label="Number of days"
                variant="outlined"
                onChange={e => props.updatePlanData("days", e.target.value)}
            />
            <TextField
                className="plan-form-item"
                id="outlined-basic"
                label="Minimum number of calories per day"
                variant="outlined"
                onChange={e => props.updatePlanData("min_calories_per_day", e.target.value)}
            />
            <TextField
                className="plan-form-item"
                id="outlined-basic"
                label="Maximum number of calories per day"
                variant="outlined"
                onChange={e => props.updatePlanData("max_calories_per_day", e.target.value)}
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

export default PlanForm;