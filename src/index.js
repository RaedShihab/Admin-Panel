import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from "react-i18next";

import i18n from "./i18n";
import { store } from './auth/Helpers/store';
import './index.css';
import {App} from './App';
import * as serviceWorker from './serviceWorker';

// setup fake backend
import { configureFakeBackend } from './auth/Helpers/fakeBackend';
configureFakeBackend();

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
// ReactDOM.render(<I18nextProvider i18n={i18n}><Provider store={store}><App /></Provider></I18nextProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
