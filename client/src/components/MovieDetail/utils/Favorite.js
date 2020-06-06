import React, { useEffect } from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import axios from 'axios';

const useStyles = makeStyles({
    button: {
        marginLeft : "auto",
        marginTop : "10px"
    }
});

export const Favorite = (props) => {
    const classes = useStyles();
    const {movieId, movieInfo, movieImage} = props;

    const details = {
        movieId : movieId,
        movieTitle : movieInfo.title,
        movieImage : movieImage,
    }
    useEffect(()=>{
        axios.post('http://localhost:5000/api/movies/favorites', details, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
        })
        .then(response => { 
            console.log(response)
        })
        .catch(error => {
            console.log(error.response)
        });
    },[])

    const addToFavorites=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:5000/api/movies/addtofavorites', details, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
            })
            .then(response => { 
                console.log(response)
            })
            .catch(error => {
                console.log(error.response)
            });
    }

    return (
        <div style={{width:"95vw", display:"flex"}}>
            <Button 
            onClick={addToFavorites}
            variant="contained" 
            color="primary" 
            className={classes.button}>
            Add To Favorites
            </Button>
        </div>
    )
}

export default Favorite
