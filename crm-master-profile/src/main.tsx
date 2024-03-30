import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from 'react-error-boundary';
import AppFallback from './errors/components/AppFallback.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary FallbackComponent={AppFallback}>
    <App />
  </ErrorBoundary>,
);
