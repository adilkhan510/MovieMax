import React, { useEffect, useState } from 'react'
import { Button, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { API_URL, API_KEY,IMAGE_BASE_URL, IMAGE_SIZE, IMAGE_URL } from '../../../config'
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
    const [favNum, setFavNum] = useState(0)
    const [favorited, setFavorited] = useState('Add to Favorites')
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const details = {
        id : userInfo.id,
        movieId : movieId,
        movieTitle : movieInfo.title,
        movieImage : movieImage,
    }
    useEffect(()=>{
        axios.post('http://localhost:5000/api/movies/favorites', details, {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        }
        })
        .then(response => { 
            console.log(response.data.length)
            setFavNum(response.data.length)
        })
        .catch(error => {
            console.log(error.response)
        });
    },[])

    const addToFavorites=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:5000/api/movies/togglefavorites', details, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                token : userInfo.token
            }
            })
            .then(response => { 
                console.log(response)
                if(response.data.success){
                    setFavNum(favNum+1)
                    setFavorited("Remove From Favorites")
                }else if(response.data.deleted) {
                    setFavNum(favNum -1)
                    setFavorited("Add to Favorites")
                }
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
             {favorited }: {favNum}
            </Button>
        </div>
    )
}

export default Favorite
