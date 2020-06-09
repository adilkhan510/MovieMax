import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import { makeStyles } from '@material-ui/styles'
import { MovieCard } from '../Home/MovieCard'
import { Paper, Grid } from '@material-ui/core'
import { fetchMovies } from '../../actions/actions'
import { API_URL, API_KEY,IMAGE_BASE_URL, IMAGE_SIZE, IMAGE_URL } from '../../config'

const useStyles = makeStyles(theme=>({
    root : {
        padding: "2rem",
        marginTop: "2rem",
        width : "80%",
        marginLeft : "auto",
        marginRight : "2rem"
    },
    header : {
    },
    movieCard : {

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
        const movies = await fetchMovies(id,page);
        setMovies(movies)
    }
    return (
        <Paper className={classes.root}>
            <div className={classes.header}>
            </div>
                <Grid container spacing={4}>

                    {
                        movies && movies.map((m,index)=>(
                            <Grid item xs={3}>
                                <MovieCard movieUrl={`${IMAGE_URL}/w500${m.poster_path}`} />
                            </Grid>
                        ))
                    }
                </Grid>
        </Paper>
    )
}

