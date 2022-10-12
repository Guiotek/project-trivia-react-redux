import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Settings from './Pages/Settings';
import Login from './Pages/Login';
import PlayGame from './Pages/PlayGame';
import Feedback from './Pages/Feedback';
import Ranking from './Pages/Ranking';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/playgame" component={ PlayGame } />
        <Route exact path="/settings" component={ Settings } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    </div>
  );
}
