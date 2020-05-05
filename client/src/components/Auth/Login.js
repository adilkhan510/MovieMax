import React from 'react';
import { withStyles } from '@material-ui/styles'
import { Formik } from 'formik';
import styles from '../styles/login'
import { Typography, Paper } from '@material-ui/core';


const Login = ( props ) => {
    const { classes } = props;
    return (
        <Paper className={classes.paper} elevation={6}>

        </Paper>
    )
}


export default withStyles(styles)(Login);

