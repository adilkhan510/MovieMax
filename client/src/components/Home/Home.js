import React, {useEffect, useState} from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles'
import styles from '../../styles/home'
import { Typography } from '@material-ui/core';
import { API_URL, API_KEY,IMAGE_BASE_URL, IMAGE_SIZE, IMAGE_URL } from '../../config'
import { MovieImage } from './MovieImage';
import { MovieCard }  from './MovieCard'


const Home = (props) => {
    const [movies, setMovies] = useState(null);
    const [mainImg, setMainImg] = useState(null);
    // TMDB movie API call.
    useEffect(()=>{
        const endpoint = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        fetchMovies(endpoint);
    },[])
    const fetchMovies = (endpoint) => {
        fetch(endpoint)
        .then(res=>
            res.json()
        )
        .then(res=>{
            setMainImg(mainImg || res.results[0])
            setMovies(res.results)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const { classes } = props
    console.log(movies)
    return (
        <Grid container className={classes.main}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    {mainImg && <MovieImage 
                        image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${mainImg.backdrop_path}`}
                        title={mainImg.original_title}
                        text={mainImg.overview}
                    />}
                </Paper>
            </Grid>
            <Grid 
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}
                className={classes.moviesContainer} 
              >
                    {
                        movies && movies.map((movie,index)=>(
                            <Grid item xs={3} className={classes.gridItem}>
                                <MovieCard key={index}
                                    movieUrl={movie.poster_path && `${IMAGE_URL}/w500${movie.poster_path}`}
                                    id={movie.id}
                                />
                            </Grid>
                        ))
                    }
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(Home)
