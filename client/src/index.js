import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {HashRouter} from "react-router-dom";


ReactDOM.render(
				<>
				
				<HashRouter>
				  <App/>
				</HashRouter>
				</>, 
	document.getElementById("root") ); // this is always fixed and it points to the index.html file