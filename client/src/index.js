import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import MaterialUIPickers from './components/pt/AddAppt'
import SignInSide from './components/users/Login'

ReactDOM.render(

<BrowserRouter>
<Switch>
    <Route exact path="/" component={App}/>
    <Route path="/schedule" component={App}/>
    <Route path="/addappt" component={MaterialUIPickers}/>
    <Route path="/login" component={SignInSide}/>

    </Switch>
</BrowserRouter>

, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
