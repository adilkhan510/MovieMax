import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { Formik, Form, Field } from 'formik';
import { object, string } from 'yup';
import Axios from 'axios';
import { withStyles } from '@material-ui/styles';
import { Paper, TextField, Button, Typography, CardActions } from '@material-ui/core';
import { UserContext } from '../Context/userContext'
import { makeStyles, Grid, Card, CardHeader, CardContent } from '@material-ui/core'
import styles from './loginStyles'


const useStyles = makeStyles(styles)

const Login = (props) => {

    const classes = useStyles()
    const history = useHistory()
    const { setCurrentUser } = useContext(UserContext)
    const initialValues = {
        email: '',
        password: ''
    }
    const handleDummyAccount = async (event) => {
        event.preventDefault();
        let user = {
            email: "n2@gmail.com",
            password: "123456"
        }
        Axios.post('api/users/login', JSON.stringify(user), {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(res => {
            if (res.data) {
                setCurrentUser(res.data)
                localStorage.setItem('user', JSON.stringify(res.data))
                history.push("/")
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className={classes.root}>
            <Formik
                initialValues={initialValues}
                validationSchema={
                    object({
                        email: string().email().required().min(4).max(50),
                        password: string().required().min(5).max(20),
                    })
                }
                onSubmit={(values, { setSubmitting }) => {
                    Axios.post("/api/users/login", JSON.stringify(values), {
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8'
                        }
                    })
                        .then(res => {
                            if (res.data) {
                                localStorage.setItem('user', JSON.stringify(res.data))
                                setCurrentUser(res.data)
                                history.push('/');
                            }
                        })
                        .catch(err => {
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
                }) => (
                        <Grid container justify="center" className={classes.container}>
                            <Card className={classes.card}>

                                <div className={classes.cardHeader}>
                                    <h4 className={classes.cardTitle}>
                                        login
                                            </h4>
                                </div>
                                <div>
                                    <Form className={classes.form}>
                                        <Field
                                            name="email"
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
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            as={TextField}
                                            label="Password"
                                        />
                                        <div className={classes.cardActions}>


                                            <Button className={classes.items} type="submit" disabled={isSubmitting} color="secondary" variant="contained">
                                                Submit
                                            </Button>

                                            <Button
                                                className={classes.items}
                                                onClick={handleDummyAccount} variant="contained" color="secondary"
                                            >
                                                Demo Account
                                        </Button>
                                            <Button onClick={() => { history.push('/register') }} variant="contained"
                                                className={classes.items} color="secondary"
                                            >Register for an Account</Button>                                        </div>
                                    </Form>
                                </div>
                            </Card>
                        </Grid>
                    )}
            </Formik>
        </div>
    )
}

export default Login