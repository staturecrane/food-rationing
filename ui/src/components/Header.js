import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    Meal Planner
          </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
