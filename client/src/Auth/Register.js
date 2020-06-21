import React from 'react';
import { useHistory } from 'react-router-dom'
import { Formik, Form, Field } from 'formik';
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
import { object, string } from 'yup'
import Axios from 'axios'

import styles from '../styles/register';



const Register = ( props ) => {
    const { classes } = props
    const history = useHistory()
    const initialValues= { 
                email: '', 
                password: '',
                Name : ''
        }
    return(
        <div className={classes.root}>
            <Paper className={classes.paper}>
            <Typography className={classes.header}>Register</Typography>
            <Formik
            initialValues={initialValues}
            validationSchema={
                object({
                    email : string().email().required().min(4).max(50),
                    password : string().required().min(5).max(20),
                    Name : string().required().min(4).max(20),
                })
            }
            onSubmit={(values, { setSubmitting }) => {
                Axios.post("/api/users/register",JSON.stringify(values),{
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                })
                .then(res=>{
                    if(res.data.success){
                        history.push('/login');
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
                setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
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
                /* and other goodies */
            }) => (
                <Form onSubmit={handleSubmit} className={classes.form}>
                <Field
                    name="Name"
                    className={classes.items}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fullName}
                    as={TextField} label="Name"
                />
                {errors.Name && touched.Name && errors.Name}
                <Field
                    className={classes.items}
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    values={values.email}
                    as={TextField}
                    label="Email"
                />
                {errors.email && touched.email && errors.email}
                <Field
                    className={classes.items}
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    as={TextField}
                    label="Password "
                />
                {errors.password && touched.password && errors.password}
                <Button type="submit" disabled={isSubmitting} variant="contained" color="primary">
                    Submit
                </Button>
                </Form>
            )}
            </Formik>
            </Paper>
        </div>
  )
};

export default withStyles(styles)(Register)