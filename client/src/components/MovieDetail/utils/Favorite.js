import React, { useEffect, useState } from 'react'
import { Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import axios from 'axios';

const useStyles = makeStyles((theme)=>({
    button: {
        fontSize : "0.5rem",
        width : "100%",
        [theme.breakpoints.up('sm')]:{
            fontSize : "1rem",
        },
        ...theme.typography,
    },
    icon : {
        fontSize : "1.5rem",
        color : "red",
    },
    notFavorited : {
        fontSize : "0.7rem",
        color : "grey",
    },
    favoritedBy : {
        padding : "0.5rem",
        marginTop : "0.5rem"
    }
}));

export const Favorite = (props) => {
    const classes = useStyles();
    const {movieId, movieInfo, movieImage} = props;
    const [favNum, setFavNum] = useState(0)
    const [favorited, setFavorited] = useState('Favorite')
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const details = {
        id : userInfo.id,
        movieId : movieId,
        movieTitle : movieInfo.title,
        movieImage : movieImage,
    }
    useEffect(()=>{
        axios.post('/api/movies/favorites', details, {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        }
        })
        .then(response => { 
            setFavNum(response.data.length)
        })
        .catch(error => {
            console.log(error.response)
        });
    },[])

    const addToFavorites=(e)=>{
        e.preventDefault();
        axios.post('/api/movies/togglefavorites', details, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                token : userInfo.token
            }
            })
            .then(response => { 
                console.log(response)
                if(response.data.success){
                    setFavNum(favNum+1)
                    setFavorited("Unfavorite")
                }else if(response.data.deleted) {
                    setFavNum(favNum -1)
                    setFavorited("Favorite")
                }
            })
            .catch(error => {
                console.log(error.response)
            });
    }

    return (
        <div>
            <Button 
            onClick={addToFavorites}
            variant="outlined"  
            className={classes.button}>
                <Typography className={classes.notFavorited}>
                {favorited} : {favNum}
                </Typography>
            </Button>
        </div>
    )
}

export default Favorite
