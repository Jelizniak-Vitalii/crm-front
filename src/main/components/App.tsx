import { Suspense } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '../../app/theme-provider.tsx';
import AppNewMenu from '../../app/components/AppNewMenu.tsx';

function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={null}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<AppNewMenu />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
