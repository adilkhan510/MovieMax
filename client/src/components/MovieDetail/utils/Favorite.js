import React, { useEffect, useState } from 'react'
import { Button, Paper } from '@material-ui/core'
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
    const [favNum, setFavNum] = useState(0)
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const details = {
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
        axios.post('http://localhost:5000/api/movies/addtofavorites', details, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                token : userInfo.token
            }
            })
            .then(response => { 
                console.log(response)
                if(response.data.success){
                    setFavNum(favNum+1)
                }else if(response.data.deleted) {
                    setFavNum(favNum -1)
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
            Add To Favorites : {favNum}
            </Button>
        </div>
    )
}

export default Favorite
