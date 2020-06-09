import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { MovieCard } from '../Home/MovieCard'
import { Paper, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme=>({
    root : {
        padding: "2rem",
        marginTop: "2rem",
        width : "80%",
        marginLeft : "auto",
        marginRight : "2rem"
    },
    header : {

    }

}))

export const MovieList = () => {
    const classes = useStyles()
    return (
        <Paper className={classes.root}>
            <div className={classes.header}>
                <Typography>
                    Movies
                </Typography>
            </div>
        </Paper>
    )
}
