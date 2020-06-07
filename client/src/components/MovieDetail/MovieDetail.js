// Outside Imports
import React, { useEffect, useState } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Paper, Grid, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Button } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Inside Imports 
import { withStyles } from '@material-ui/styles'
import styles from '../../styles/movieDetail'
import { API_URL, API_KEY,IMAGE_BASE_URL, IMAGE_SIZE, IMAGE_URL } from '../../config'
import { MovieImage } from '../Home/MovieImage'
import {MovieCard} from '../Home/MovieCard';
import Favorite from './utils/Favorite'
import {Comments} from './Comments/Comments'

const MovieDetail = (props) => {
    // Get the movie ID from the URL.
    const [movie, setMovie] = useState(null)
    const [actors, setActors] = useState([])
    const movieId = props.match.params.id
    const [moviePoster, setMoviePoster] = useState('')
    console.log(movie)
    const { classes } = props
    useEffect(()=>{
        fetch(`${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`)
        .then(res=> res.json())
        .then(res=>{
            setMovie(res)
            console.log(res)
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
            <div style={{width: "100%"}}>
                <MovieImage image={movie && `${IMAGE_BASE_URL}${IMAGE_SIZE}${movie.backdrop_path}`} />
            </div>
            {
                movie && 
                <Favorite 
                movieId={movieId} 
                movieImage={`${IMAGE_URL}/w500${movie.poster_path}`}
                movieInfo={movie} 
            />
            }
 
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                <Paper className={classes.gridItem} elevation={4}>
                        <Typography>
                            Rating : { movie && movie.vote_average}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper className={classes.gridItem} elevation={4}>
                        <Grid item xs={12} style={{display: "flex", flexDirection:"row",justifyContent:"space-evenly"}}>
                            {movie && movie.genres.map((g)=>(
                                <>
                                <Typography>{g.name}</Typography>
                                <Divider orientation="vertical" flexItem  />
                                </>
                                ))}
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                <Paper className={classes.gridItem} elevation={4}>
                        <Typography>
                            Year released : {movie && movie.release_date}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Divider />
            <Comments />
            <Divider />
            <ExpansionPanel>
                <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    <Button variant="contained" color="primary" style={{display:"flex",justifyContent : "center", alignItems : "center", width :"50%", marginLeft:"25%"}}>
                        Toggle Actors
                    </Button>
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
        </>
    )
}



export default withStyles(styles)(MovieDetail)