import React from 'react'
import { Paper } from '@material-ui/core'

export const MovieCard = (props) => {
    if (props.mainPage) {
        return (
            <a href={`/movie/${props.id}`}>
                <img src={props.movieUrl} style={{ width: "80%", height: "400px" }} alt="movie" />
            </a>
        )
    } else {
        return (
            <a href={`/movie/${props.id}`}>
                <img src={props.movieUrl} style={{ width: "100%", height: "400px" }} alt="movie" />
            </a>
        )
    }
}
