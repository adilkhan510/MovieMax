import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import { makeStyles } from '@material-ui/styles'
import { MovieCard } from '../Home/MovieCard'
import { Paper, Grid } from '@material-ui/core'
import { fetchMoviesByGenre } from '../../actions/actions'
import { API_URL, API_KEY,IMAGE_BASE_URL, IMAGE_SIZE, IMAGE_URL } from '../../config'

const useStyles = makeStyles(theme=>({
    root : {
        padding: "2rem",
        marginTop: "2rem",
        width : "100%",
        marginLeft : "auto",
        marginRight : "2rem",
    },
    header : {
    },
    cardInfo : {
        display : "flex",
        flexDirection : "column",
        justifyContent : "space-between",
        maxWidth : "90%"
    }
}))

export const MovieList = ( props ) => {

    const id = props.match.params.name;
    const [page,setPage] = useState(1)
    const [movies, setMovies] = useState([])
    useEffect(()=>{
        renderMovies(id,page)
    },[id])
    const classes = useStyles()

    const renderMovies = async (id,page)=>{
        const movies = await fetchMoviesByGenre(id,page);
        setMovies(movies)
    }
    return (
        <Paper className={classes.root}>
            <div className={classes.header}>
            </div>
                <Grid container spacing={4}>

                    {
                        movies && movies.map((m,index)=>(
                            <Grid item xs={12} md={3} sm={6}>
                                <MovieCard movieUrl={`${IMAGE_URL}/w500${m.poster_path}`} id={m.id} />
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

