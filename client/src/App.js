import React, {useEffect} from 'react';
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import './App.css';
import theme from "./styles/muiTheme"
import Login from './Auth/Login';
import NavBar from './components/Navigation/NavBar';
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import UserProvider from './Context/userContext'

function App() {
  // useEffect(()=>{
  //   fetch("/api/users",
  //   {
  //     headers:{
  //         "accepts" : "application/json"
  //     }
  //   })
  //   .then(res => {
  //       console.log(res);
  //       return res.json();
  //   })
  //   .then(json => console.log(json))
  //   .catch( a => { console.log(a)})
  // },[])
  return (
    <div className="App">
      <UserProvider>
        <ThemeProvider theme={theme}>
          <NavBar />
          <Route>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </Route>
        </ThemeProvider>
      </UserProvider>
    </div>
  );
}

export default App;
