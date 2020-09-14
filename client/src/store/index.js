import { compose, createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import movieReducer from './movieSlice'


const store = createStore(
    movieReducer,
    // composeEnhancers(applyMiddleware(reduxThunk))
);

export default store;