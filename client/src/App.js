import React, { useEffect, useState} from 'react';
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import theme from "./styles/muiTheme"
import Login from './Auth/Login';
import NavBar from './components/Navigation/NavBar';
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import UserProvider from './Context/userContext'
import  MovieDetail from './components/MovieDetail/MovieDetail'
import FavoritesPage from './components/FavoritesPage/FavoritesPage'
import { Sidebar } from './components/Sidebar/Sidebar';
import { init } from './actions/actions'
import { MovieList } from './components/Landing/MovieList';


const useStyles= makeStyles((theme)=>({
  mainContainer : {
    display : "flex",
    direction : "row",
    justifyContent : "flex-start",
    height: "100%",
    width: "100"
  }
}))

function App() {
  const [isLoading, setLoading ] = useState(true)
  const classes = useStyles()
  useEffect(async ()=>{
    // init function returns true when it fetches
    const res = await init();
    res ? setLoading(false) : setLoading(true)
  },[])


  return (
    <div className="App">
      <UserProvider>
        <ThemeProvider theme={theme}>
          <NavBar />
          <div className={classes.mainContainer}>
            {/* <NavBar /> */}
            {
              isLoading ? <div>Loading....</div> : <Sidebar />
            }
            <Switch>
              <Route exact path="/discover/:name" component={MovieList} />
            </Switch>
            </div>
        </ThemeProvider>
      </UserProvider>
    </div>
  );
}

export default App;
