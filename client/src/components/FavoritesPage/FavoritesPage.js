import React, {useState, useEffect} from 'react';
import {Grid, Paper, Typography} from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import styles from '../../styles/favorites'
import {MovieCard} from '../Home/MovieCard'
import axios from 'axios';
import { API_URL, API_KEY,IMAGE_BASE_URL, IMAGE_SIZE, IMAGE_URL } from '../../config'



const FavoritesPage = ( props ) => {
    const { classes } = props
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user.token)
    const [movieList, setMovieList] = useState(null);


    useEffect(()=>{
        axios.post('/api/movies/getusersfavorites',user, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                token : user.token
            }
        })
        .then(res=>{
            console.log(res)
            setMovieList(res.data.movieList);

        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    return (
        <Paper className={classes.root}>
        <div className={classes.header}>
        </div>
            <Grid container spacing={2}>

                {
                    movieList && movieList.map((m,index)=>(
                        <Grid item xs={12} sm={6} md={3}  >
                            <MovieCard movieUrl={m.movieImage} id={m.movieId} />
                            <div className={classes.cardInfo}>
                                <div>{m.title}</div>
                                <div>{m.rating}</div>
                            </div>
                        </Grid>
                    ))
                }
            </Grid>
        </Paper>
    )
}

export default withStyles(styles)(FavoritesPage)
