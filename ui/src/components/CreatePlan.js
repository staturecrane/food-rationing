import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    }
}));

function CreatePlan(props) {
    const classes = useStyles();

    return (
        <div className="main">
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<Icon>add</Icon>}
                onClick={() => props.handleClick(true)}
            >
                Create Plan
            </Button>
            {props.planStarted ?
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<Icon>clear</Icon>}
                    onClick={() => props.handleClick(false)}
                >
                    Cancel Plan
                </Button> : ''
            }

        </div>
    );
}

export default CreatePlan;
