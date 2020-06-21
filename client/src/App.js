import React, { useEffect, useState} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import theme from "./styles/muiTheme"
import Login from './Auth/Login';
import UserProvider from './Context/userContext'
import FavoritesPage from './components/FavoritesPage/FavoritesPage'
import { Sidebar } from './components/Sidebar/Sidebar';
import { init } from './actions/actions'
import { MovieDetails } from './components/MovieDetails/MovieDetails'
import { MovieList } from './components/Landing/MovieList';
import  MobileMenu  from './components/Mobile/MobileMenu'
import Register from './Auth/Register'


const useStyles= makeStyles((theme)=>({
  mainContainer : {
    display : "flex",
    direction : "row",
    justifyContent : "flex-start",
    height: "100%",
    maxWidth: "100vw"
  },
  main : {
    maxWidth : "93%",
    marginTop : "1rem"
  }
}))

function App() {
  const [isLoading, setLoading ] = useState(true)
  const classes = useStyles()
  useEffect(()=>{
    // init function returns true when it fetches
    const res = init();
    res ? setLoading(false) : setLoading(true)
  },[])


  return (
    <div className="App">
      <UserProvider>
        <ThemeProvider theme={theme}>
          <div className={classes.mainContainer}>
            <div className={classes.stickyBar}>
            {
              isLoading ? <div>Loading....</div> : <MobileMenu />
            }
            </div>
            <div className={classes.main}>
            <Switch>
              <Route exact path="/discover/:name" component={MovieList} />
              <Route exact path="/movie/:id" component={MovieDetails} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/">
                <Redirect to="/discover/popular" />
              </Route>
              <Route exact path="/favorites" component={FavoritesPage} />
            </Switch>
            </div>
            </div>
        </ThemeProvider>
      </UserProvider>
    </div>
  );
}

export default App;
