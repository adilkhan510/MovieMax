import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, MenuItem, Tabs, Tab, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/userContext'
import img from '../../Images/logo.png'
const drawerWidth = 160;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: "column",
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    background: theme.palette.yellow.main
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    color: "black"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  stickyBox: {
    margin: "2rem"
  },
  menuItem: {
    color: "grey",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "0.5rem",
    textTransform: "uppercase",
    letterSpacing: "-0.5px",
    [theme.breakpoints.up('md')]: {
      fontSize: "0.67rem",
      minHeight: 'auto',
    }
  },
  href: {
    textDecoration: "none",
  },
  links: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "10rem",
    [theme.breakpoints.up('md')]: {
      padding: "0rem 1rem"
    }
  },
  header: {
    fontWeight: "800",
    fontSize: "1rem",
    textTransform: "uppercase",
    letterSpacing: "-0.5px",
    color: "grey"
  },
  insideContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%"
  },
  headerContainer: {
    width: "fit-content",
    margin: '2rem 2rem 1rem 1rem',
  },
  hover: {
    border: "1px solid red ",
    borderRadius: "1rem",
    padding: "0 0.5rem",
    position: "relative",
    top: 0
  },
  typography: {
    textTransform: "none",
    letterSpacing: "0.5px",
    fontWeight: "400",
    color: "grey",
    fontSize: "0.8rem",
    [theme.breakpoints.up('md')]: {
      fontSize: "0.8rem"
    }
  },
  menuDirectory: {
    marginLeft: "auto"
  }
}));

function MobileMenu(props) {
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory()
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = parseInt(window.location.pathname.split('/')[2])
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [value, setValue] = useState(0)
  const handleChange = (event, value) => {
    setValue(value)
  }

  const genres = JSON.parse(localStorage.getItem('genres'));
  const handleLogout = () => {
    setCurrentUser('');
    localStorage.setItem('user', '')
    history.push('/discover/popular')
  }


  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List className={classes.links}>
        <div className={classes.root}>
          <Typography className={classes.header}>
            Discover
            </Typography>
          <div className={classes.root}>
            <a href="/discover/popular" className={classes.href}>
              <MenuItem
                disableGutters={true}
                className={classes.menuItem}
              >
                <i className="fas fa-star" style={{ marginRight: "0.2rem" }}></i>
                  Popular</MenuItem>
            </a>
            <a href="/discover/now_playing" className={classes.href}>
              <MenuItem
                disableGutters={true}
                className={classes.menuItem}
              >
                <i className="fas fa-star" style={{ marginRight: "0.2rem" }}></i>
              Trending</MenuItem>
            </a>
            <a href="/discover/upcoming" className={classes.href}>
              <MenuItem
                disableGutters={true}
                className={classes.menuItem}
              >
                <i className="fas fa-star" style={{ marginRight: "0.2rem" }}></i>
                  Upcoming</MenuItem>
            </a>
          </div>
        </div>
      </List>
      <Divider />
      <List className={classes.links}>
        <Typography className={classes.header}>Genres</Typography>
        {genres && genres.map((g, index) => (
          <a href={`/discover/${g.id}`} className={classes.href} key={g.id}>
            <MenuItem
              // Check to see if the location is the same as the category. If so highlight it.
              className={location === g.id ? `${classes.menuItem} ${classes.hover}` : `${classes.menuItem}`}
              disableGutters={true}
              key={g.id}>
              <i className="fas fa-video" style={{ marginRight: "0.2rem" }}></i>
              {g.name}
            </MenuItem>
          </a>
        ))}
      </List>
    </div>
  );


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <img src={img} style={{ width: "3rem", height: "3rem", borderRadius: "10px" }} />
          <div className={classes.menuDirectory}>
            {
              currentUser ? (
                <div className={classes.tabsContainer}>
                  <Button className={classes.typography} onClick={() => { history.push('/favorites') }}>
                    Favorites
                  </Button>
                  {/* <Tab className={classes.typography} label="Favorites" component={Link} to="/favorites" style={{color : "black"}} /> */}
                  <Button onClick={handleLogout} className={classes.typography}>Logout</Button>
                </div>
              ) :
                (
                  <div className={classes.tabsContainer}>
                    <Button className={classes.typography} onClick={() => { history.push('/login') }}>
                      Login
                    </Button>
                  </div>
                )
            }
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}


export default MobileMenu;