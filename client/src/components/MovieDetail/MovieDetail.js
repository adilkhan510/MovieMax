// Outside Imports
import React, { useEffect, useState } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Paper, Grid, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Inside Imports 
import { withStyles } from '@material-ui/styles'
import styles from '../../styles/movieDetail'
import { API_URL, API_KEY,IMAGE_BASE_URL, IMAGE_SIZE, IMAGE_URL } from '../../config'
import { MovieImage } from '../Home/MovieImage'

const MovieDetail = (props) => {
    // Get the movie ID from the URL.
    const [movie, setMovie] = useState(null)
    const movieId = props.match.params.id
    const { classes } = props
    console.log(movieId)
    useEffect(()=>{
        fetch(`${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`)
        .then(res=> res.json())
        .then(res=>{
            console.log(res)
            setMovie(res)
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
            <ExpansionPanel>
                <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    <Typography style={{display:"flex",justifyContent : "center", alignItems : "center", width :"100%"}}>
                        More Info
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </>
    )
}



export default withStyles(styles)(MovieDetail)