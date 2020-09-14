import { createSlice } from '@reduxjs/toolkit';
import api from '../axios/index'

const initialState = {
    movies: [],
    moviesGenres: [],
    moviesLoading: false,
    moviesGenresLoading: false,
    hasErrors: false,
    errorMsg: ""
}


const moviesSlice = createSlice({
    name: "movieSlice",
    initialState,
    reducers: {
        getMoviesGenres: (state) => {
            state.moviesGenresLoading = true;
            console.log("I am fetching movies")
        },
        getMoviesGenresSuccess: (state, { payload }) => {
            state.moviesGenres = payload
            state.moviesGenresLoading = false
        },
        getMovies: (state) => {
            state.moviesLoading = true
            console.log("I am fetching movies")
        },
        getMoviesSuccess: (state, { payload }) => {
            state.moviesData = payload
            state.dataLoading = false;
            console.log(state.moviesData)
        },
        getMoviesFailure: (state, { payload }) => {
            state.hasErrors = true;
            state.errorMsg = payload
        }
    }
})


export const moviesSelector = state => state.movieSlice

// exporting actions 
export const { getMovies, getMoviesGenres, getMoviesSuccess, getMoviesGenresSuccess, getMoviesFailure } = moviesSlice.actions


export function init2() {
    return async dispatch => {
        dispatch(getMoviesGenres())

        try {
            const res = await api.get('/configuration');
            console.log(res, ".......config")
            dispatch(getMoviesGenresSuccess(res))

        } catch (error) {
            const payload = {
                err: error
            }
            dispatch(getMoviesFailure(payload))
        }
    }
}



export default moviesSlice.reducer


