import React from 'react';
import { withStyles } from '@material-ui/styles'
import { Formik } from 'formik';
import styles from '../styles/login'
import { Typography, Paper, TextField, Button, Avatar} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';


const Login = ( props ) => {
    
    const { classes } = props;
    return (
        <div className={classes.root}>
        <Paper className={classes.paper} elevation={6}>
            <Avatar className={classes.avatar}>
                <LockIcon color="primary" fontSize="large" />
            </Avatar>
            <form className={classes.form}>
                <TextField className={classes.textField}
                    variant="outlined"
                    margin="normal"
                    required
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField className= {classes.textField} label="Password" variant="outlined" />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign In
                </Button>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >Test account Login</Button>
            </form>
        </Paper>
        </div>
    )
}


export default withStyles(styles)(Login);

