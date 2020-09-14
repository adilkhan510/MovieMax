import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { IMAGE_URL } from '../../config'
import { MovieCard } from '../Home/MovieCard'


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        overflow: "scroll",
        maxWidth: "65rem",
        position: "relative",
    },
    img: {
        maxHeight: "500px",
        minWidth: "300px",
        marginBottom: "2rem"
    }
}))

export const SimilarMovies = (props) => {
    const data = props.data
    const classes = useStyles()
    return (
        <Grid container
            direction="row"
            spacing={1}
            justify="space-evenly"
        >
            {
                data && data.map((m, index) => (
                    m.poster_path &&
                    <Grid item xs={12} sm={8} md={4} lg={3} key={m.id}>
                        <div className={classes.img}>
                            <MovieCard movieUrl={`${IMAGE_URL}/w500${m.poster_path}`} id={m.id} />
                        </div>
                    </Grid>
                ))
            }
        </Grid>
    )
}
