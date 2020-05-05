import React from 'react';
import styles from '../styles/navbar';
import { Container, withStyles, Box, Tabs, Tab } from '@material-ui/core';

const NavBar = ( props ) => {
    const { classes } = props
    return (
        <Box className={classes.root}>
            <Container>
                <div classname={classes.logo}>logo goes here</div>
            </Container>
            <Tabs>
                <Tab label="hello">
                </Tab>
                <Tab label="hello">
                </Tab>
                <Tab label="hello">
                </Tab>
            </Tabs>
        </Box>
    )
}

export default withStyles(styles)(NavBar)
