import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import {PersistGate} from 'redux-persist/integration/react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {persistor, store} from './app/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App/>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
