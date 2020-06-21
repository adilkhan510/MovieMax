import React, { useEffect, useState } from 'react'
import Rating from '@material-ui/lab/Rating';
import { Grid, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Avatar from '@material-ui/core/Avatar';

import { fetchMovieInfo } from '../../actions/actions'
import { MovieCard } from '../Home/MovieCard'
import { API_URL, API_KEY,IMAGE_BASE_URL, IMAGE_SIZE, IMAGE_URL } from '../../config'
import Favorite from '../MovieDetail/utils/Favorite';
import { SimilarMovies } from '../SimilarMovies/SimilarMovies'
const useStyles = makeStyles(theme=>({
    main : {
        padding: "1rem",
        marginTop: "3rem",
        width : "90%",
        marginleft: "4rem",
        [theme.breakpoints.up('sm')]: {
            marginTop: "3rem",
            width : "100%",
            marginleft: "4rem",
            marginRight : "1rem",
        }
    },
    mainMovieInfo : {
        display : "flex",
        alignContent : "flex-start",
        justifyContent : "center",
        [theme.breakpoints.up('sm')] : {
            width : "auto"
        },
        width : "20rem"
    },
    imageContainer : {
        display : "flex",
        flexDirection : "row",
        justifyContent : "center",
        minHeight : "500px"
    },
    movieImg : {
        maxWidth : "350px",
    },
    infoContainer : {
        [theme.breakpoints.up('sm')] : {
            display : "flex",
            flexDirection : "column",
            justifyContent : "center",
            alignSelf : "baseline",
            width : "auto"
        },
        width : "20rem"
    },
    movieTitle : {
        [theme.breakpoints.up('md')] : {
            fontSize : "2rem"
        },
        position : "relative",
        left : "0",
        margin : "0rem auto 2rem 0",
        fontWeight: "200",
        fontSize : "1rem"
    },
    typography : {
        textTransform: "uppercase",
        letterSpacing: "-0.5px",
        color : "grey",

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
    },
    runTime : {
        fontSize : "0.8rem",
        width : "fit-content",
        padding : "0.2rem",
        ...theme.typography,
        margin : "2rem 2rem",
    },
    castContainer : {
        display : "flex",
        flexDirection : "row",
        maxWidth : "30rem",
        overflow : "scroll",
        justifyContent : "space-between",
        margin : "1rem 0"
    },
    actors : {
        display : "flex",
        flexDirection : "column",
        maxWidth : "30rem",
        overflow : "scroll",
        margin : "1rem 0"
    },
    img : {
        width : "70px",
        height : "70px",
        margin : "0.5rem"
    },
    subMovieInfo : {
        display : "flex",
        flexDirection : "row",
        justifyContent : "left",
        alignItems : "baseline"
    },
    header : {
        display : "flex",
        justifyContent : "left",
    },
    favoriteButton : {
        position : "relative",
    },
    similarMovie : {
        position : "relative",
        left : "0"
    },
    typography1 : {
        [theme.breakpoints.up('md')] : {
            fontSize : "1rem"
        },
        fontSize : "0.8rem"
    },
    similarMovieContainer : {
        padding: "1rem",
        marginTop: "3rem",
        marginleft: "4rem",
        [theme.breakpoints.up('sm')]: {
            padding: "2rem",
            marginTop: "2rem",
            width : "100%",
            marginleft: "4rem",
            marginRight : "1rem",
        }
    }

}))

export const MovieDetails = (props) => {

    const classes = useStyles();
    const user = localStorage.getItem('user');
    const movieId = props.match.params.id
    const [ movieInfo, setMovieInfo ] = useState([]);
    const [recommendations, setR] = useState([])
    const [cast , setCast] = useState([]);
    const renderMovieInfo = async (id,page)=>{
        const [movies, cast, recommended ] = await fetchMovieInfo(id,1)
        console.log(movies.genres[0].id)
        console.log(cast.data.cast);
        setCast(cast.data.cast);
        setMovieInfo(movies);
        setR(recommended);
    }

    useEffect(()=>{
        renderMovieInfo(movieId)
        },[movieId])

    if(movieInfo){
    return (
        
        <Grid 
        container 
        direction="column"
        justify="space-evenly"
        className={classes.main}
        >
            {
                movieInfo && 
            <Grid item xs={10} md={12}
            >
                <Grid container
                className={classes.mainMovieInfo}
                >
                    <Grid item xs={10} md={6} >
                        <div className={classes.imageContainer}>
                            <div className={classes.movieImg}>
                            <MovieCard movieUrl={`${IMAGE_URL}/w500${movieInfo.poster_path}`} />
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={10} md={6}
                    className={classes.infoContainer}
                    >
                        <div className={classes.header}>
                            <Typography className={`${classes.typography} ${classes.movieTitle}`}>
                                {movieInfo.title}
                            </Typography>
                            {
                                user ? (<Favorite className={classes.favoriteButton} movieId={movieId} movieInfo={movieInfo} movieImage={`${IMAGE_URL}/w500${movieInfo.poster_path}`} />) : null
                            }
                        </div>
                        <div>
                            <Typography className={classes.typography1}>
                            {movieInfo.overview}
                            </Typography>
                        </div>
                        <div className={classes.subMovieInfo}>
                            <div className={classes.rating}>
                                <Rating name="read-only" value={movieInfo.vote_average/2} readOnly />
                                <Typography className={classes.ratingText}>
                                    Vote Count : {movieInfo.vote_count}
                                </Typography>
                            </div>
                            <div className={classes.runTime}>
                                Run Time : {movieInfo.runtime} mins
                            </div>
                        </div>
                        <div className={classes.actors}>
                            <Typography className={classes.typography}>
                                Actors
                            </Typography>
                            <div className={classes.castContainer}>
                                {
                                    cast && cast.map((c,index)=>(
                                            c.profile_path &&
                                            <Avatar 
                                            className={classes.img}
                                            src={c.profile_path && `${IMAGE_URL}/w500${c.profile_path}` } />
                                    ))
                                }
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <Grid item className={classes.similarMovieContainer} xs={12}> 
                    <Typography className={classes.typography}>Similar Movies</Typography>
                {
                    recommendations && 
                    <SimilarMovies data={recommendations} />
                }
                </Grid>
            </Grid>
            }
        </Grid>
    )
    }else{
        return(<div></div>)
    }
}
