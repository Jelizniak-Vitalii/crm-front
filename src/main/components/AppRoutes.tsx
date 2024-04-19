import { Outlet, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import Registration from '../../pages/Auth/registration/components/Registration.tsx';
import Feed from '../../app/components/Feed.tsx';
import Dashboard from '../../pages/Dashboard/Dashboard.tsx';
import Login from '../../pages/Auth/login/Login.tsx';
import { useAuth } from '../hooks/useAuth.ts';
import Profile from '../../pages/Profile/Profile.tsx';
import Settings from '../../pages/Settings/Settings.tsx';

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
        <Route path="profile/*" element={<Profile />} />
        <Route path="settings/*" element={<Settings />} />
        <Route path="registration/*" element={<Registration />} />
        <Route path="login/*" element={<Login />} />
        <Route path="feed/*" element={<Feed />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
