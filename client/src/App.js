import React, {useEffect} from 'react';
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import './App.css';
import theme from "./components/styles/muiTheme"
import Login from './components/Auth/Login';
import NavBar from './components/Navigation/NavBar';
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'

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
    </div>
  );
}

export default App;
