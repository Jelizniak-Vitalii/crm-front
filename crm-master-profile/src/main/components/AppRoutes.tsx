import { Outlet, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import Registration from '../../pages/auth/registration/components/Registration.tsx';
import Feed from '../../app/components/Feed.tsx';
import Dashboard from '../../pages/Dashboard/components/Dashboard.tsx';

const AppRoutes = () => {
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
        <Route path="feed/*" element={<Feed />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
