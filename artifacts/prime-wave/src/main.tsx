import { createRoot } from 'react-dom/client';

import App from './App';
import { setBaseUrl, setAuthTokenGetter } from '@workspace/api-client-react';

setBaseUrl(import.meta.env.VITE_API_URL || 'https://api.meetkishore.in/api/v1');
setAuthTokenGetter(() => localStorage.getItem('access_token'));

import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
