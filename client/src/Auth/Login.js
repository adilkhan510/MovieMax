import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Formik, Form, Field } from 'formik';
import { object, string } from 'yup';
import Axios from 'axios';
import { withStyles } from '@material-ui/styles';
import styles from '../styles/register'
import { Paper, TextField, Button, Avatar, Typography} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
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
                console.log(res)
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
                    if(res.data.success){
                        localStorage.setItem('user', JSON.stringify(res.data))
                        setCurrentUser(res.data.userData)
                        history.push('/');
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
                    <Button className={classes.items} type="submit" disabled={isSubmitting} variant="contained">
                        Submit
                    </Button>
                    <Button
                    className={classes.items} 
                    onClick={handleDummyAccount} variant="contained">
                        Demo Account
                    </Button>
                    </Form>
                )}
            </Formik>
            </Paper>
        </div>
    )
}


// const Login2 = ( props ) => {
//     const [email, handleEmail, resetEmail] = formHook('');
//     const [password, handlePassword, resetPassword] = formHook('');
//     const { setCurrentUser } = useContext(UserContext)
//     const history = useHistory()

//     const handleSubmit = async (event)=>{        
//         event.preventDefault();
//         let user = {
//             email : email,
//             password : password
//         }
//         axios.post(`/api/users/login`, JSON.stringify(user), {
//             headers: {
//                 'Content-Type': 'application/json; charset=UTF-8'
//             }
//             }).then(res=>{
//                 setCurrentUser(user)
//                 localStorage.setItem('user', JSON.stringify(res.data))
//             }).catch(err=>{
//                 console.log(err)
//         })
//         history.push('/discover/popular')
//     }
    // const handleDummyAccount = async (event)=>{
    //     event.preventDefault();
    //     let user = {
    //         email : "test1111@gmail.com",
    //         password : "123456"
    //     }
    //     axios.post('http://localhost:5000/api/users/login', JSON.stringify(user), {
    //         headers: {
    //             'Content-Type': 'application/json; charset=UTF-8'
    //         }
    //         }).then(res=>{
    //             localStorage.setItem('user', JSON.stringify(res.data))
    //         }).catch(err=>{
    //             console.log(err)
    //     })
    // }

//     const { classes } = props;
//     return (
//         <div className={classes.root}>
//         <Paper className={classes.paper} elevation={6}>
//             <Avatar className={classes.avatar}>
//                 <LockIcon style={{color: "red"}} fontSize="large" />
//             </Avatar>
//             <form className={classes.form} onSubmit={handleSubmit}>
//                 <TextField className={classes.textField}
//                     variant="outlined"
//                     margin="normal"
//                     required
//                     id="email"
//                     label="Email Address"
//                     name="email"
//                     autoComplete="email"
//                     autoFocus
//                     value={email}
//                     onChange={handleEmail}
//                 />
//                 <TextField className= {classes.textField} label="Password" variant="outlined" value={password} onChange={handlePassword} />
//                 <Button
//                     type="submit"
//                     fullWidth
//                     variant="contained"
//                     className={classes.submit}
//                 >
//                     Sign In
//                 </Button>
//                 <Button
//                     fullWidth
//                     variant="contained"
//                     className={classes.submit}
//                     onClick={handleDummyAccount}
//                 >Test account</Button>
//             </form>
//         </Paper>
//         </div>
//     )
// }


export default withStyles(styles)(Login);

