import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { Formik, Form, Field } from 'formik';
import { object, string } from 'yup';
import Axios from 'axios';
import { withStyles } from '@material-ui/styles';
import styles from '../styles/register'
import { Paper, TextField, Button, Typography} from '@material-ui/core';
import { UserContext } from '../Context/userContext'





const Login = ( props ) => {
    const { classes } = props
    const history = useHistory()
    const { setCurrentUser } = useContext(UserContext)
    const initialValues = {
        email : '',
        password : ''
    }
    const handleDummyAccount = async (event)=>{
        event.preventDefault();
        let user = {
            email : "n2@gmail.com",
            password : "123456"
        }
        Axios.post('api/users/login', JSON.stringify(user), {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
            }).then(res=>{
                if(res.data){
                setCurrentUser(res.data)
                localStorage.setItem('user', JSON.stringify(res.data))
                history.push("/")
                }
            }).catch(err=>{
                console.log(err)
        })
    }
    return(
        <div className={classes.root}>
            <Paper className={classes.paper}>
            <Typography className={classes.header}>Login</Typography>
            <Formik
            initialValues={initialValues}
            validationSchema={
                object({
                    email : string().email().required().min(4).max(50),
                    password : string().required().min(5).max(20),
                })
            }
            onSubmit={(values, { setSubmitting }) => {
                Axios.post("/api/users/login",JSON.stringify(values),{
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                })
                .then(res=>{
                    if(res.data){
                        localStorage.setItem('user', JSON.stringify(res.data))
                        setCurrentUser(res.data)
                        history.push('/');
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
                setTimeout(() => {
                setSubmitting(false);
                }, 400);
            }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                })=>(
                    <Form className={classes.form}>
                        <Field
                        name = "email"
                        className={classes.items}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        as={TextField}
                        label="Email "
                        />
                        <Field 
                            name="password"
                            type="password"
                            className={classes.items}
                            onChange = {handleChange}
                            onBlur = {handleBlur}
                            as={TextField}
                            label="Password"
                        />
                    <Button className={classes.items} type="submit" disabled={isSubmitting}  color="primary" variant="contained">
                        Submit
                    </Button>
                    <Button
                    className={classes.items} 
                    onClick={handleDummyAccount} variant="contained" color="primary"
                    >
                        Demo Account
                    </Button>
                    <Button onClick={()=>{history.push('/register')}} variant="contained"
                    className={classes.items} color="primary"
                    >Register for an Account</Button>
                    </Form>
                )}
            </Formik>
            </Paper>
        </div>
    )
}


export default withStyles(styles)(Login);

