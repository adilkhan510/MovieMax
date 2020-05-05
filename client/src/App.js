import React, {useEffect} from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Login from './components/Auth/Login';

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
      <Route>
        <Switch>
          <Login />
        </Switch>
      </Route>
    </div>
  );
}

export default App;
