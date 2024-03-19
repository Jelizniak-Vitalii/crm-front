import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import AppMenu from './app/components/AppMenu.tsx';

function App() {
  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<AppMenu />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
