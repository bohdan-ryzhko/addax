import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from './redux';
import App from './App.tsx';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter basename={import.meta.env.VITE_API_BASE_NAME}>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);
