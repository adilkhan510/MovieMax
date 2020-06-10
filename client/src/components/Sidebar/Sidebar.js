import React, {useState} from 'react'
import StickyBox from 'react-sticky-box';
import { makeStyles } from '@material-ui/styles';
import { MenuItem, Typography, Paper } from '@material-ui/core';
import img from '../../Images/logo.png'


const useStyles = makeStyles(theme=>({
    root : {
        display: "flex",
        flexDirection: "column",
        justifyContent : "flex-start",
        maxWidth: "10rem",
        padding: "2rem",
    },
    menuItem : {
        color : "black",
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        fontSize: "0.8rem",
        textTransform: "uppercase",
        letterSpacing: "-0.5px",
        color : "grey"
    },
    href : {
        textDecoration : "none",
    },
    selected : {
        border : "1px solid black"
    },
    links : {
        display: "flex",
        flexDirection: "column",
        maxWidth: "10rem",
        padding: "2rem",
    },
    header : {
        fontWeight: "400",
        fontSize: "1rem",
        textTransform: "uppercase",
        letterSpacing: "-0.5px",
        margin : "1rem",
        color : "grey"
    },
    browse : {
        
    },
    insideContainer : {
        display: "flex",
        flexDirection: "column",
        justifyContent : "flex-start",
        width : "100%"
    },
    headerContainer : {
        width : "fit-content",
        margin : '2rem 2rem 1rem 1rem',
    },
    hover : {
        border : "1px solid red "
    }
}))

export const Sidebar = (props) => {
    const classes = useStyles()
    const genres = JSON.parse(localStorage.getItem('genres'));
    const [id, setId] = useState(localStorage.getItem('gId') || 28);
    const location = parseInt(window.location.pathname.split('/')[2])

    return (
        <StickyBox>
            <div>
                <Paper className={classes.headerContainer}>
                    <Typography className={classes.header}>
                        Discover
                    </Typography>
                </Paper>
                <div className={classes.root}>
                <a href="/browse/popular" className={classes.href}>
                    <MenuItem
                    className={classes.menuItem}
                    >Popular</MenuItem>
                </a>
                <a href="/browse/trending" className={classes.href}>
                <MenuItem
                className={classes.menuItem}                
                >Trending</MenuItem>
                </a>
                <a href="/browse/upcoming" className={classes.href}>
                    <MenuItem
                    className={classes.menuItem}
                    >Upcoming</MenuItem>
                </a>
                </div>
            </div>
            <div>
                <Paper className={classes.headerContainer}>
                    <Typography className={classes.header}>
                        Genres
                    </Typography>
                </Paper>
                <div className={classes.root}>
                {
                    genres &&
                    genres.map((g,index)=>(
                        <a href={`/discover/${g.id}`} className={classes.href}>
                            <MenuItem
                            // Check to see if the location is the same as the category. If so highlight it.
                            className={location === g.id ? `${classes.menuItem} ${classes.hover}` : `${classes.menuItem}`}
                            disableGutters={true}
                            key={g.id}>
                            {g.name}
                            </MenuItem>
                        </a>
                    ))
                }
                </div>
            </div>
        </StickyBox>
    )
}
