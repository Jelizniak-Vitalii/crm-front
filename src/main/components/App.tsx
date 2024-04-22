import { Suspense } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '../../app/theme-provider.tsx';
import AppMenu from '../../app/components/AppMenu.tsx';

function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={null}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<AppMenu />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
