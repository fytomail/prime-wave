import { createRoot } from 'react-dom/client';

import App from './App';
import { setBaseUrl, setAuthTokenGetter } from '@workspace/api-client-react';

setBaseUrl('https://api.meetkishore.in/api/v1');
setAuthTokenGetter(() => localStorage.getItem('access_token'));

import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
