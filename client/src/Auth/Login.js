import React, { useEffect } from 'react';
import axios from 'axios'
import { withStyles } from '@material-ui/styles'
import { Formik } from 'formik';
import styles from '../styles/login'
import { Typography, Paper, TextField, Button, Avatar} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import formHook  from '../hooks/useFormState'


const Login = ( props ) => {
    const [email, handleEmail, resetEmail] = formHook('');
    const [password, handlePassword, resetPassword] = formHook('');

    const handleSubmit = (event)=>{
        event.preventDefault();
        axios.get('/api/users',{ headers : {
            "Content-Type" : "application/json"
            }}).then(
            res => {
                console.log(res)
            }
        ).catch(err => {
            console.log(err)
        })
    }

    const { classes } = props;
    return (
        <div className={classes.root}>
        <Paper className={classes.paper} elevation={6}>
            <Avatar className={classes.avatar}>
                <LockIcon color="primary" fontSize="large" />
            </Avatar>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField className={classes.textField}
                    variant="outlined"
                    margin="normal"
                    required
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={handleEmail}
                />
                <TextField className= {classes.textField} label="Password" variant="outlined" value={password} onChange={handlePassword} />
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
                >Test account</Button>
            </form>
        </Paper>
        </div>
    )
}


export default withStyles(styles)(Login);

