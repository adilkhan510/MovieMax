import React, { useEffect, useState } from 'react'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { fetchMoviesByGenre } from '../../actions/actions'
import { API_URL, API_KEY,IMAGE_BASE_URL, IMAGE_SIZE, IMAGE_URL } from '../../config'
import {MovieCard} from '../Home/MovieCard'


const useStyles = makeStyles((theme)=>({
    root : {
        display : "flex",
        flexDirection : "row",
        justifyContent: "space-between",
        overflow : "scroll",
        maxWidth : "65rem",
        position : "relative",
    },
    img : {
        maxHeight : "500px",
        minWidth : "300px",
        marginBottom : "2rem"
    }
}))

export const SimilarMovies = ( props ) => {
    const data = props.data
    const classes = useStyles()
    const [movies, setMovies] = useState([])

    const renderMovies = async (id, page)=>{
        console.log("id.....", id)
        const res = await fetchMoviesByGenre(id, page)
        setMovies(res)
    }
    useEffect(() => {
        renderMovies(props.id, 1);

    }, [])
    return (
        <Grid container
        direction = "row"
        spacing={1}
        justify = "space-evenly"
        >
            {
                data && data.map((m,index)=>(
                    <Grid item xs={12} sm={8} md={4} lg={3}>
                        <div className={classes.img}>
                            <MovieCard movieUrl={`${IMAGE_URL}/w500${m.poster_path}`} id={m.id} />
                        </div>
                    </Grid>
                ))
            }
        </Grid>
    )
}
