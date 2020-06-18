import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { withStyles } from '@material-ui/styles'
import styles from '../styles/login'
import { Typography, Paper, TextField, Button, Avatar} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import formHook  from '../hooks/useFormState'
import { UserContext } from '../Context/userContext'

const Login = ( props ) => {
    const [email, handleEmail, resetEmail] = formHook('');
    const [password, handlePassword, resetPassword] = formHook('');
    const { setCurrentUser } = useContext(UserContext)
    const history = useHistory()

    const handleSubmit = async (event)=>{        
        event.preventDefault();
        let user = {
            email : email,
            password : password
        }
        axios.post(`${process.env.PORT}/api/users/login`, JSON.stringify(user), {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
            }).then(res=>{
                setCurrentUser(user)
                localStorage.setItem('user', JSON.stringify(res.data))
            }).catch(err=>{
                console.log(err)
        })
        history.push('/discover/popular')
    }
    const handleDummyAccount = async (event)=>{
        event.preventDefault();
        let user = {
            email : "test1111@gmail.com",
            password : "123456"
        }
        axios.post('http://localhost:5000/api/users/login', JSON.stringify(user), {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
            }).then(res=>{
                localStorage.setItem('user', JSON.stringify(res.data))
            }).catch(err=>{
                console.log(err)
        })
    }

    const { classes } = props;
    return (
        <div className={classes.root}>
        <Paper className={classes.paper} elevation={6}>
            <Avatar className={classes.avatar}>
                <LockIcon style={{color: "red"}} fontSize="large" />
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
                    className={classes.submit}
                >
                    Sign In
                </Button>
                <Button
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                    onClick={handleDummyAccount}
                >Test account</Button>
            </form>
        </Paper>
        </div>
    )
}


export default withStyles(styles)(Login);

