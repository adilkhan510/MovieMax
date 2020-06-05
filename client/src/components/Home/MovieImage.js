import React from 'react'
import { Typography  } from '@material-ui/core'

export const MovieImage = (props) => {
    return (
        <div
        style={{
            background:
                `linear-gradient(to bottom, rgba(0,0,0,0)
                39%,rgba(0,0,0,0)
                41%,rgba(0,0,0,0.65)
                100%),
            url(${props.image}), #1c1c1c`,
            height: '450px',
            backgroundSize: '100%, cover',
            padding: "20px",
            backgroundPosition: 'center, center',
            width: '100%',
            position: 'relative'
        }}
    >
        <div>
            <div style={{ position: 'absolute', maxWidth: '500px', bottom: '2rem', marginLeft: '2rem' }} >
                <Typography variant="h1" style={{ color: 'white' }} level={2} > {props.title} </Typography>
                <p style={{ color: 'white', fontSize: '1rem' }}  >{props.text} </p>
            </div>
        </div>
    </div>
    )
}
