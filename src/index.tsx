import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {store} from './State/store';
import AppWithRedux from './Components/AppWithRedux/AppWithRedux';
import {BrowserRouter} from "react-router-dom";
import Initialized from "./features/Initialized/Initialized";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Initialized/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
