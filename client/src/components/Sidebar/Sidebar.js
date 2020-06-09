import React, {useState} from 'react'
import StickyBox from 'react-sticky-box';
import { makeStyles } from '@material-ui/styles';
import { MenuItem, Typography, Paper } from '@material-ui/core';
import img from '../../Images/logo.png'


const useStyles = makeStyles(theme=>({
    root : {
        display: "flex",
        flexDirection: "column",
        maxWidth: "10rem",
        padding: "2rem",
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
    },
    links : {
        display: "flex",
        flexDirection: "column",
        maxWidth: "10rem",
        padding: "2rem",
    },
    header : {
        fontWeight: "700",
        fontSize: "1rem",
        textTransform: "uppercase",
        letterSpacing: "-0.5px",
        margin : "1rem"
    },
    browse : {
        
    },
    insideContainer : {
        display: "flex",
        flexDirection: "column",
    },
    headerContainer: {
        marginBottom : "2rem"
    },
    headerContainer2: {
        margin : "3rem 0 2rem 0"
    }
}))

export const Sidebar = (props) => {
    const classes = useStyles()
    const genres = JSON.parse(localStorage.getItem('genres'));
    const [id, setId] = useState(localStorage.getItem('gId') || 28);

    return (
        <StickyBox>
            <div className={classes.root}>
            <div>
                <Paper className={classes.headerContainer}>
                    <Typography className={classes.header}>
                        Discover
                    </Typography>
                </Paper>
                <div className={classes.insideContainer}>
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
                <Paper className={classes.headerContainer2}>
                    <Typography className={classes.header}>
                        Genres
                    </Typography>
                </Paper>
                <div className={classes.insideContainer}>
                {
                    genres &&
                    genres.map((g,index)=>(
                        <a href={`/discover/${g.id}`} className={classes.href}>
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
            </div>
            </div>
        </StickyBox>
    )
}
