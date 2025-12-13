import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n';
import { ErrorBoundary } from './components/ui/ErrorBoundary';

// Add loading state and error handling
const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element not found');
}

try {
  console.log('Starting app initialization...');
  const rootInstance = createRoot(root);
  rootInstance.render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
  console.log('App mounted successfully');
} catch (error) {
  console.error('Error mounting app:', error);
}
