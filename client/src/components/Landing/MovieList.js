import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { MovieCard } from '../Home/MovieCard'
import { Paper, Grid, Button } from '@material-ui/core'
import { fetchMoviesByGenre, fetchDiscover } from '../../actions/actions'
import { IMAGE_URL } from '../../config'
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles(theme => ({
    root: {
        padding: "2rem",
        marginTop: "2rem",
        width: "100%",
        marginLeft: "auto",
        marginRight: "2rem",
        [theme.breakpoints.up('sm')]: {
            width: "100%"
        }
    },
    cardInfo: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        margin: "auto",
        [theme.breakpoints.up('sm')]: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            maxWidth: "80%",
        }
    },
    page: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "1rem",
    },
    prev: {
        position: "relative",
        left: "0"
    },
    next: {
        position: "relative",
        marginLeft: "auto"
    }
}))

export const MovieList = (props) => {

    const id = props.match.params.name;
    const [page, setPage] = useState(2)
    const [movies, setMovies] = useState(null)
    useEffect(() => {
        renderMovies(id, page)
    }, [id, page])
    const classes = useStyles()

    const handleNext = () => {
        setPage(page + 1);
    }
    const handlePrev = () => {
        if (page === 1) {
            setPage(1)
        } else {
            setPage(page - 1)
        }
    }

    const renderMovies = async (id, page) => {
        console.log(page)
        if (id === "popular" || id === "now_playing" || id === "upcoming") {
            const data = await fetchDiscover(id, page)
            console.log(data)
            setMovies(data)
        } else {
            const movies = await fetchMoviesByGenre(id, page);
            setMovies(movies)
        }
    }
    if (movies) {
        return (
            <div className={classes.root}>
                <div className={classes.header}>
                </div>
                <Grid container spacing={1}>

                    {
                        movies && movies.map((m, index) => (
                            <Grid item xs={12} sm={12} md={4} lg={2} key={m.id}  >
                                <MovieCard movieUrl={`${IMAGE_URL}/w500${m.poster_path}`} id={m.id} mainPage={true} />
                                <div className={classes.cardInfo}>
                                    <div>{m.title}</div>
                                    <div><Rating name="read-only" value={m.vote_average / 2} readOnly /></div>
                                </div>
                            </Grid>
                        ))
                    }
                </Grid>

                <div className={classes.page}>
                    {
                        page === 1 ? (
                            <Button onClick={handleNext} className={classes.next}>Next</Button>
                        ) : (
                                <>
                                    <Button onClick={handlePrev} className={classes.prev}>Prev</Button>
                                    <Button onClick={handleNext} className={classes.next}>Next</Button>
                                </>
                            )
                    }
                </div>
            </div>
        )
    } else {
        return <div>Loading</div>
    }
}
