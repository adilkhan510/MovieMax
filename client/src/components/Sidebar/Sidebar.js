import React from 'react'
import StickyBox from 'react-sticky-box';
import { makeStyles } from '@material-ui/styles';
import { MenuItem } from '@material-ui/core';


const useStyles = makeStyles(theme=>({
    root : {
        display: "flex",
        flexDirection: "column",
        maxWidth: "10rem",
        padding: "2rem",
        marginTop: "2rem",
        borderRight: `1px solid ${theme.palette.primary.main}`,
    },
    menuItem : {
        color : "black",
        display : "flex",
        justifyContent : "center",
        alignItems : "center"
    },
    href : {
        textDecoration : "none",
    },
    selected : {
        border : "1px solid black"
    }
}))

export const Sidebar = (props) => {
    const classes = useStyles()
    const genres = JSON.parse(localStorage.getItem('genres'));
    console.log("genres....",genres)
    return (
        <StickyBox>
            <div className={classes.root}>
                {
                    genres &&
                    genres.map((g,index)=>(
                        <a href={`/movies/${g.name.toLowerCase()}`} className={classes.href}>
                            <MenuItem
                            className={classes.menuItem}
                            disableGutters={true}
                            key={index}>
                            {g.name}
                            </MenuItem>
                        </a>
                    ))
                }
            </div>
        </StickyBox>
    )
}
