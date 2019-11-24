import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import { Results, Video } from './pages';
import * as serviceWorker from './serviceWorker';

const routing = (
  <Router>
    <Route exact path="/" component={App} />
    <Route path="/results" component={Results}/>
    <Route path="/video/:id" component={Video}/>
    <Redirect  to="/" />
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
