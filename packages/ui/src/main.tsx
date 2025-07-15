import { createRoot } from 'react-dom/client';

import './App.scss';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router';
import App from './App';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>,
);
