import React, {useState, useEffect} from 'react';
import {Grid, Paper, Typography} from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import styles from '../../styles/favorites'
import {MovieCard} from '../Home/MovieCard'
import axios from 'axios';


const FavoritesPage = ( props ) => {
    const { classes } = props
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user.token)
    const [movieList, setMovieList] = useState(null);


    useEffect(()=>{
        axios.post('http://localhost:5000/api/movies/getusersfavorites',user, {
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
        <>
        <div className={classes.textContainer}>
            <Paper className={classes.text1} elevation={5}>
                <Typography variant="body1" className={classes.typography}>
                    My Favorite Movies
                </Typography>
            </Paper>
        </div>
            <Grid container 
            justify="center"
            alignItems="center"
            direction="row"
            spacing ={2}
            className = {classes.container}>
                {
                    movieList && movieList.map((m,index)=>(
                        <Grid item xs={6} md={3} key={index}>
                            <Paper elevation={10}>
                                <MovieCard key={index} style={{width:"30%"}}
                                    movieUrl={m.movieImage}
                                    id={m.movieId}
                                />
                                <Paper className={classes.text}>
                                    {m.movieTitle}
                                </Paper>
                        </Paper>
                        </Grid>
                    ))
                }

            </Grid>
        </>
    )
}

export default withStyles(styles)(FavoritesPage)
