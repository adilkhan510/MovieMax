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
export const fetchMoviesByGenre = async (genre, page) => { 
    console.log(genre)
    const endpoint = `${API_URL}/discover/movie/?api_key=${API_KEY}&language=en-US&page=${page}&with_genres=${genre}`
    const movies = await fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
        console.log(res)
        return res.results
    })
    .catch(err=>{
        console.log(err)
    })
    return movies
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

export const fetchMovieInfo = async (id,page) => {
    const endpoint = `${API_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
    try{
        const movies = await Axios.get(endpoint);
        const cast = await Axios.get(`${API_URL}/movie/${id}/credits?api_key=${API_KEY}`)
        const recommended = await Axios.get(`${API_URL}/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=${page}`)
        console.log(recommended)
        return [movies.data, cast, recommended.data.results] 
    }catch(err){
        console.log(err)
    }
}

export const fetchDiscover = async(name,page)=>{
    const endpoint = `${API_URL}/movie/${name}?api_key=${API_KEY}&language=en-US&${page}=1`;
    try {
        const movies = await Axios.get(endpoint);
        return movies.data.results
    }catch(err){
        console.log(err)
    }
}
// init function : Runs before the main App runs :

export const init=()=>{
    fetchGenres();
    return true
}