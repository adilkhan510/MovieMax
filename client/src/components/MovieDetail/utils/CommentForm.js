import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import useFormState from '../../../hooks/useFormState'

const useStyles = makeStyles({
    root : {
        width : "100%",
        overflow : "scroll"
    },
    text : {
        width : "70%",
    },
    button : {
        margin : "5px 10px",
        textTransform : "none"
    }
})

export const CommentForm = () => {
    const classes = useStyles()
    const [comment,handleChange,reset] = useFormState('')
    return (
        <form className={classes.root} >
            {console.log(comment)}
            <TextField
            onChange={handleChange}
            multiline
            className={classes.text}
            label="Type Here" 
            variant="outlined" />
            <Button
            className={classes.button}
            variant="contained"
            color="primary"
            >Submit</Button>
        </form>
    )
}
