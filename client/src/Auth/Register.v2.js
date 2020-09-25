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

const Register = (props) => {

    const classes = useStyles()
    const history = useHistory()
    const initialValues = {
        email: '',
        password: '',
        Name: ''
    }
    return (
        <div className={classes.root}>
            <Formik
                initialValues={initialValues}
                validationSchema={
                    object({
                        email: string().email().required().min(4).max(50),
                        password: string().required().min(5).max(20),
                        Name: string().required().min(4).max(20),
                    })
                }
                onSubmit={(values, { setSubmitting }) => {
                    Axios.post("/api/users/register", JSON.stringify(values), {
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8'
                        }
                    })
                        .then(res => {
                            if (res.data.success) {
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
                                    <Form className={classes.form} onSubmit={handleSubmit}>
                                        <Field
                                            name="Name"
                                            className={classes.items}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            as={TextField}
                                            label="Name "
                                        />
                                        {errors.Name && touched.Name && errors.Name}
                                        <Field
                                            name="email"
                                            className={classes.items}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            as={TextField}
                                            label="email"
                                        />
                                        {errors.email && touched.email && errors.email}
                                        <Field
                                            name="password"
                                            type="password"
                                            className={classes.items}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            as={TextField}
                                            label="Password"
                                        />
                                        {errors.password && touched.password && errors.password}
                                        <div className={classes.cardActions}>
                                            <Button className={classes.items} type="submit" disabled={isSubmitting} onClick={handleSubmit} color="secondary" variant="contained">
                                                Submit
                                            </Button>
                                            <Button onClick={() => { history.push('/login') }} variant="contained"
                                                className={classes.items} color="secondary"
                                            >Already have an account?</Button>                                        </div>
                                    </Form>
                                </div>
                            </Card>
                        </Grid>
                    )}
            </Formik>
        </div>
    )
}

export default Register