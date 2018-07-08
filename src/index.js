import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios'

axios.defaults.baseUrl = 'https://content.guardianapis.com/search?api-key=90d49681-1cb7-4c04-b0f6-067da9d6e6cb'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
