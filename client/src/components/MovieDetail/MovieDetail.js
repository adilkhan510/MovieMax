// Outside Imports
import React, { useEffect, useState } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Paper, Grid, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Button} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteIcon from '@material-ui/icons/Favorite';

// Inside Imports 
import { withStyles } from '@material-ui/styles'
import styles from '../../styles/movieDetail'
import { API_URL, API_KEY,IMAGE_BASE_URL, IMAGE_SIZE, IMAGE_URL } from '../../config'
import { MovieImage } from '../Home/MovieImage'
import {MovieCard} from '../Home/MovieCard';
import Favorite from './utils/Favorite'
import {Comments} from './Comments/Comments'
import Axios from 'axios';

const MovieDetail = (props) => {
    // Get the movie ID from the URL.
    const [movie, setMovie] = useState(null)
    const [actors, setActors] = useState([])
    const [bg, setBg] = useState(null)
    const movieId = props.match.params.id
    const [moviePoster, setMoviePoster] = useState('')
    console.log(movie)
    const { classes } = props
    useEffect(()=>{
        Axios.get(`${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`)
        .then(res=>{
            setMovie(res)
            setBg(`${IMAGE_URL}/w500{movie.backdrop_path}`)
            fetch(`${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}`)
            .then(res=>res.json())
            .then(res=>{
                setActors(res.cast);
                console.log(res.cast)
            })
            .catch(err=>{
                console.log(err)
            })
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
    return (
        <>
        <div style={{width:"auto", margin:"2% 0px", overflow:"hidden"}}>
            <Grid container spacing={2}
                className={classes.movieContainer}
                direction="row"
                >
                <Grid container direction="row" className={classes.headerContainer}>
                        <div>
                            <Typography variant="h3" className={classes.text}>
                                {movie && movie.title}-(
                                {
                                    movie && movie.release_date.split("-")[0]
                                })
                            </Typography>
                            <Grid className={classes.smallInfo}
                                direction = "row"
                                justify="space-evenly"
                                alignContent="center"
                                container>
                                <Grid className={classes.smallInfoText} item>
                                    <Typography>
                                    Run time : {movie && movie.runtime} mins
                                    </Typography>
                                </Grid>
                                <Divider orientation="vertical" />
                                <Grid className={classes.genres} item>
                                    {
                                        movie && movie.genres.map((m,index)=>(
                                            <Typography key={index}>{m.name}</Typography>
                                        ))
                                    }
                                </Grid>
                                <Divider orientation="vertical" />
                            </Grid>
                        </div>
                    <Grid item xs={12} md={6}>
                                <div className={classes.buttonContainer}>
                                {
                                    movie && 
                                    <Favorite 
                                    movieId={movieId} 
                                    movieImage={`${IMAGE_URL}/w500${movie.poster_path}`}
                                    movieInfo={movie} 
                                />
                                }</div>
                        </Grid>
                </Grid>
            </Grid>
                <Grid>
                </Grid>
                <Grid item>
                    <Grid container
                    className={classes.movieInsideContainer}
                    direction="row">
                        <Grid item xs={6} className={classes.movieImageContainer}>
                            <MovieCard movieUrl={movie && `${IMAGE_URL}/w500${movie.poster_path}`} />
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container className={classes.detailedContainer}>
                                <Grid item xs={12}>
                                    <Paper className={classes.production} elevation={10}>
                                        <Typography>
                                            Overview
                                        </Typography>
                                    </Paper>
                                    {
                                        movie && 
                                        <Paper className={classes.description}>
                                            {movie.overview}
                                        </Paper>

                                    }
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper className={classes.production} elevation={10}>
                                        <Typography>
                                            Produced By
                                        </Typography>
                                    </Paper>
                                    <Paper className={classes.productionCompanies}>
                                        {
                                            movie && movie.production_companies.map((c,index)=>(
                                                c.logo_path &&                                             <img src={`${IMAGE_URL}/w45${c.logo_path}`} className={classes.pImg} />
                                            ))
                                        }
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            <Divider />
            <Comments  />
            <Divider />
            <ExpansionPanel  className={classes.expansionPanel}>
                <ExpansionPanelSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    <div className={classes.expansionButton}>
                        <Button variant="contained" color="primary">
                            Toggle Actors
                        </Button>
                    </div>

                </ExpansionPanelSummary>
                    {
                        actors && 
                            <ExpansionPanelDetails>
                                <Grid 
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                    spacing={1}
                                    className={classes.actorsContainer} 
                                >
                                {
                                    actors.map((actor,index)=>(
                                    actor.profile_path &&    
                                    <Grid item xs={6} md={3}>
                                        <MovieCard key={index}
                                        actorUrl={actor.profile_path && `${IMAGE_URL}/w500${actor.profile_path}`}
                                        />
                                    </Grid>
                                    ))
                                }
                                </Grid>
                            </ExpansionPanelDetails>
                    }
            </ExpansionPanel>
            </div>
        </>
    )
}



export default withStyles(styles)(MovieDetail)