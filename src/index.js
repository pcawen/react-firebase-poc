//import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MainApp from './mainApp';
import * as firebase from 'firebase';

const rootEl = document.getElementById('root');

injectTapEventPlugin();

var config = {
	apiKey: "AIzaSyBl2AjIAEI9ksaKBJH1Kk_E3DMguGoPU6g",
	authDomain: "marcosapp-f54c7.firebaseapp.com",
	databaseURL: "https://marcosapp-f54c7.firebaseio.com",
	storageBucket: "marcosapp-f54c7.appspot.com",
};
firebase.initializeApp(config);

ReactDOM.render(
  <MainApp/>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./mainApp', () => {
    const NextApp = require('./mainApp').default;
    ReactDOM.render(
      <NextApp />,
      rootEl
    );
  });
}
