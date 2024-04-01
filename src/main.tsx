import ReactDOM from 'react-dom/client';
import App from './main/components/App.tsx';
import './index.css';
import { ErrorBoundary } from 'react-error-boundary';
import AppFallback from './errors/components/AppFallback.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary FallbackComponent={AppFallback}>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>,
);
