import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    }
}));

function CreateMeal(props) {
    const classes = useStyles();

    return (
        <Container className="main">
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<Icon>add</Icon>}
                onClick={() => props.handleClick(true)}
            >
                Add Meal
            </Button>
            {props.mealStarted ?
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<Icon>clear</Icon>}
                    onClick={() => props.handleClick(false)}
                >
                    Cancel
                </Button> : ''
            }

        </Container>
    );
}

export default CreateMeal;
