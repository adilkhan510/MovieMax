import { createSlice } from '@reduxjs/toolkit';

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
        },
        getMoviesGenresSuccess: (state, { payload }) => {
            state.moviesGenres = payload
            state.moviesGenresLoading = false
        },
        getMovies: (state) => {
            state.moviesLoading = true
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


// export function init(projectId) {
//     return async dispatch => {
//         dispatch(getVmInstances())

//         try {
//             const response = await fetch("https://demo.cloudmatos.dev/gcp/vm-instances/")
//             const data = await response.json()
//             console.log(data)
//             dispatch(getVmInstancesSuccess(data))
//         } catch (error) {
//             const payload = {
//                 err: error
//             }
//             dispatch(getVmInstancesFailure(payload))
//         }
//     }
// }



export default moviesSlice.reducer


