import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import PlayGame from './Pages/PlayGame';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/playgame" component={ PlayGame } />
      </Switch>
    </div>
  );
}
