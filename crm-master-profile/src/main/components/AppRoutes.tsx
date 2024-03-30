import { Outlet, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import Registration from '../../pages/Auth/registration/components/Registration.tsx';
import Feed from '../../app/components/Feed.tsx';
import Dashboard from '../../pages/Dashboard/components/Dashboard.tsx';
import Login from '../../pages/Auth/login/Login.tsx';
import { useAuth } from '../hooks/useAuth.ts';

const AppRoutes = () => {
  useAuth();

  return (
    <Routes>
      <Route path="/">
        <Route
          element={
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
          }
        />
        <Route index element={<Dashboard />} />
        <Route path="dashboard/*" element={<Dashboard />} />
        <Route path="registration/*" element={<Registration />} />
        <Route path="login/*" element={<Login />} />
        <Route path="feed/*" element={<Feed />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
