import React, { useState, useEffect } from 'react';
import { withStyles, Box, Tabs, Tab, AppBar, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom'
import styles from '../styles/navbar';

const NavBar = ( props ) => {
    const { classes } = props
    const [value, setValue] = useState(0)
    const handleChange = (event, value)=>{
        setValue(value)
    }
    useEffect(()=>{
        if(window.location.pathname === "/" && value !== 0){
            setValue(0)
        }
        if(window.location.pathname === "/profile" && value !== 1){
            setValue(1)
        }
    })

    return (
        <AppBar className={classes.root}>
            <Toolbar>
                <img className={classes.img} src="" alt='img' />
                <Tabs value={value} className={classes.tabsContainer} onChange={handleChange}>
                    <Tab value={0} label="Home" component={Link} to="/" />
                    <Tab value={1} label="My Profile" component={Link} to="/profile" />
                </Tabs>
            </Toolbar>
        </AppBar>
    )
}

export default withStyles(styles)(NavBar)
