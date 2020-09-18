import React, { useState, useEffect } from 'react';
import { Grid, Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import styles from '../../styles/favorites'
import { MovieCard } from '../Home/MovieCard'
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';



const FavoritesPage = (props) => {
    const { classes } = props
    const user = JSON.parse(localStorage.getItem('user'));
    const [movieList, setMovieList] = useState(null);


    useEffect(() => {
        axios.post('/api/movies/getusersfavorites', user, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                token: user.token
            }
        })
            .then(res => {
                setMovieList(res.data.movieList);

            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    if (movieList) {
        return (
            <div className={classes.root}>
                <Grid container spacing={1} justify="space-evenly">

                    {
                        movieList && movieList.map((m, index) => (
                            <Grid item xs={12} sm={8} md={4} lg={2} key={m.movieId} >
                                <div className={classes.mainContainer}>

                                    <MovieCard movieUrl={m.movieImage} id={m.movieId} mainPage={true} />
                                    <div className={classes.cardInfo}>
                                        <div>{m.title}</div>
                                        <div><Rating name="read-only" value={m.vote_average / 2} readOnly /></div>
                                    </div>
                                </div>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
        )
    }
    else {
        return <div></div>
    }
}

export default withStyles(styles)(FavoritesPage)
