import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Settings from './Pages/Settings';
import Login from './Pages/Login';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Settings } />
      </Switch>
    </div>
  );
}
