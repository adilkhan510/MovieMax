// Move All the functions here....
import { API_URL, API_KEY,IMAGE_BASE_URL, IMAGE_SIZE, IMAGE_URL } from '../config'
import Axios from 'axios'
import { useState } from 'react'

// Function that makes an API call to get back a list of genres.
export const fetchGenres= ()=> {
    Axios.get(`${API_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`)
    .then((res)=>{
        localStorage.setItem("genres", JSON.stringify(res.data.genres))
    }).catch(err=>{
        console.log(err)
    })
}

// Get movies
export const fetchMovies = async (genre, page) => { 
    console.log(genre)
    const endpoint = `${API_URL}/discover/movie/?api_key=${API_KEY}&language=en-US&page=${page}&with_genres=${genre}`
    try{
        const movies = await Axios.get(endpoint);
        return movies.data.results
    }catch(err){
        console.log(err)
    }
}

// Get the list of casts members
export const fetchCasts = (movieId) => { 
    const endpoint = `${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    fetch(endpoint)
    .then(res=>{
        console.log(res)
    })
    .catch(err=>{
        console.log(err)
    })
}

// init function : Runs before the main App runs :

export const init=()=>{
    fetchGenres();
    return true
}