import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import Learn from './learnHere'
import notFound from './notFound'
import * as serviceWorker from './serviceWorker';

const routing = (
    <BrowserRouter>
    {/* <div> */}
    <Switch> {/* Switch component helps render the component if exatch path is found,
    otherwise it falls to not found component*/}
        <Route exact path="/" component={App} /> {/* add 'exact' attribute  to avoid loading app all the time*/}
        <Route path="/learn" component={Learn} />
        <Route component={notFound} />
    </Switch>
    {/* </div> */}
    </BrowserRouter>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
