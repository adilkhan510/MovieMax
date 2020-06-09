// Move All the functions here....
import { API_URL, API_KEY,IMAGE_BASE_URL, IMAGE_SIZE, IMAGE_URL } from '../config'
import Axios from 'axios'

// Function that makes an API call to get back a list of genres.
export const fetchGenres= ()=> {
    Axios.get(`${API_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`)
    .then((res)=>{
        console.log("fetching genres....",res)
        localStorage.setItem("genres", JSON.stringify(res.data.genres))
    }).catch(err=>{
        console.log(err)
    })
}

// Get movies
export const fetchMovies = (genre) => { 
    const endpoint = `${API_URL}/movie/${genre}?api_key=${API_KEY}&language=en-US&page=1`
    fetch(endpoint)
    .then(
        res=> {
            console.log(res)
        })
    .catch(err=>{
        console.log(err)
    })
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