import React, { useEffect, useState } from 'react'
import Rating from '@material-ui/lab/Rating';
import Axios from 'axios'
import { Grid, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import { fetchMovieInfo } from '../../actions/actions'
import { MovieCard } from '../Home/MovieCard'
import { API_URL, API_KEY,IMAGE_BASE_URL, IMAGE_SIZE, IMAGE_URL } from '../../config'

const useStyles = makeStyles(theme=>({
    main : {
        padding: "2rem",
        marginTop: "2rem",
        width : "100%",
        marginleft: "4rem",
        marginRight : "2rem",
    },
    imageContainer : {
        width : '300px',
    },
    infoContainer : {
        display : "flex",
        flexDirection : "column",
        justifyContent : "flex-start",
        alignSelf : "baseline",
        height : "500px"
    },
    movieTitle : {
        position : "relative",
        top : "0",
        left : "0",
        margin : "0rem 0rem 2rem 0",
        fontWeight: "700",
        fontSize: "2rem",
    },
    typography : {
        ...theme.typography,
    },
    subContainer : {
        marginLeft : "5rem"
    },
    rating : {
        margin : "2rem 0",
        display : "flex",
        flexDirection : "column",
        justifyContent : "space-evenly",
        alignSelf : "flex-start",
    },
    ratingText : {
        ...theme.typography,
        lineHeight : "1.1rem",
        textAlign : 'center',
        margin : "1rem 0"
    }
}))

export const MovieDetails = (props) => {

    const classes = useStyles()
    const movieId = props.match.params.id
    const [ movieInfo, setMovieInfo ] = useState([])
    const renderMovieInfo = async (id)=>{
        const res = await fetchMovieInfo(id)
        setMovieInfo(res)
    }

    useEffect(()=>{
        renderMovieInfo(movieId)
        },[movieId])
    return (
        
        <Grid 
        container 
        direction="column"
        justify="space-evenly"
        className={classes.main}
        >
            {
                movieInfo && 
            <Grid item xs={12}
                className={classes.subContainer}
            >
                <Grid container
                row
                justify="space-evenly"
                alignContent="flex-start"
                >
                    <Grid item xs={12} md={6}>
                        <div className={classes.imageContainer}>
                            <MovieCard movieUrl={`${IMAGE_URL}/w500${movieInfo.poster_path}`} />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}
                    className={classes.infoContainer}
                    >
                        <div>
                            <Typography className={`${classes.movieTitle} ${classes.typography}`}>
                                {movieInfo.title}
                            </Typography>
                        </div>
                        <Paper>
                            <Typography className={classes.typography1}>
                            {movieInfo.overview}
                            </Typography>
                        </Paper>
                        <div className={classes.rating}>
                            <Rating name="read-only" value={movieInfo.vote_average/2} readOnly />
                            <Typography className={classes.ratingText}>
                                Vote Count : {movieInfo.vote_count}
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            }
        </Grid>
    )
}
