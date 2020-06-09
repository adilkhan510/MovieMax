import React, { useState, useEffect, useContext } from 'react';
import { withStyles, Box, Tabs, Tab, AppBar, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom'
import styles from '../../styles/navbar';
import logo from '../../Images/logo.png'
import { UserContext } from '../../Context/userContext'

const NavBar = ( props ) => {
    const { currentUser } = useContext(UserContext);
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

    if(currentUser){
        return(
            <>
            <AppBar className={classes.root}>
                <Toolbar style={{height: "30px"}}>
                    <a href="/"><img className={classes.img} src={logo} alt='img' /></a>
                    {/* <Tabs value={value} className={classes.tabsContainer} onChange={handleChange}>
                        <Tab value={0} label="Home" component={Link} to="/" style={{color : "black"}} />
                        <Tab value={1} label="My Profile" component={Link} to="/profile" style={{color : "black"}}/>
                    </Tabs> */}
                </Toolbar>
            </AppBar>
            <div className={classes.toolbarMargin} />
            </>
        )
    }else{
        return(
            <>
            <AppBar className={classes.root}>
                <Toolbar>
                    <a href="/"><img className={classes.img} src={logo} alt='img' /></a>
                    <Tabs value={value} className={classes.tabsContainer} onChange={handleChange}>
                        <Tab value={0} label="Home" component={Link} to="/" style={{color : "black"}} />
                        <Tab value={1} label="Login" component={Link} to="/login" style={{color : "black"}} />
                    </Tabs>
                </Toolbar>
            </AppBar>
            <div className={classes.toolbarMargin} />
            </>
        )
    }
}

export default withStyles(styles)(NavBar)
