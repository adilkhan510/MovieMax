import React, {useState, useEffect} from 'react';
import { Paper,Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import { CommentForm } from "../utils/CommentForm"
import { SingleComment } from '../utils/SingleComment'

const useStyles = makeStyles(theme=>({
    commentHeader : {
        width: "80px",
        marginRight : "auto",
        height : "30px",
        background : "yellow",
        borderRadius : "0px",
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        position : "relative",
        top : "-20%",
        left : "0.5%",
        padding: "5px",
    },
    root : {
        margin : "20px",
        borderRadius : "0px",
        padding : "1rem",
    },
    commentForm : {
        overflow : "scroll"
    },
    commentList : {
        width : "90%",
        minHeight : "100px",
        margin: "10px"
    }
}))
export const Comments = () => {
    const classes = useStyles()
    const [comments, setComments] = useState(["hello"])
    return (
        <Paper elevation={12} className={classes.root}>
        <Grid container>
            <Grid xs={12}>
                <Paper className={classes.commentHeader} elevation={8}>
                    Comments
                </Paper>
            </Grid>
            <Grid item xs={12} className={classes.commentList}>
                    {
                        comments && comments.map((c,index)=>(
                            <SingleComment author="adil" commentId="1" comment='HELLO' />
                        ))
                    }
            </Grid>
            <Grid item xs={12} className={classes.commentForm}>
                <CommentForm />
            </Grid>
        </Grid>
        </Paper>
    )
}
