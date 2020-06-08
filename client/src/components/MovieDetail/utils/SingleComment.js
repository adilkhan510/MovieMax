import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles, mergeClasses } from '@material-ui/styles'

const useStyles = makeStyles( theme=> ({
    comment : {
        width : "100%",
        minHeight : "50px",
        display : "flex",
        flexDirection : "column",
        justifyContent : "flex-start",
        alignItems : "flex-start",
        padding : "1rem",
    },
    commentContainer : {
        width : "95%",
    },
    author : {
        margin : "0.4rem 0 0.4rem auto",
        padding : '0.5rem',
        borderRadius : "0px",
    },
    content : {
        width : "100%",
        minHeight : "30px",
        borderRadius : "0px",
        background: "rgba(212,228,239,1)",
        background: "-moz-linear-gradient(left, rgba(212,228,239,1) 0%, rgba(134,174,204,1) 100%)",
        display : "flex",
        flexDirection : "row",
        alignItems : "flex-start",
        padding : "0.5rem"
    }
}))

export const SingleComment = (props) => {
    const {author, comment, commentId} = props
    const classes = useStyles()
    return (
        <Grid 
        container
        direction="column"
        >
            <Grid item key={commentId} className={classes.commentContainer}>
                <div className={classes.comment} >
                    <Paper className={classes.content} elevation={5}>
                        {comment}
                    </Paper>
                    <Paper className={classes.author} elevation={4}>
                        Author : Name
                    </Paper>
                </div>
            </Grid>
        </Grid>
    )
}
