import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Search from './components/Search';
import Results from './components/Results';
import Details from './components/Details';
import NavBar from './components/NavBar';

import './index.css';

const App = () => (
  <Router>
    <div>
    	<NavBar />
      <Route exact path="/" component={Search}/>
      <Route exact path="/items" component={Results}/>
      <Route path="/items/:id" component={Details}/>
    </div>
  </Router>
)

ReactDOM.render(
	<App />,
	document.getElementById('root')
);