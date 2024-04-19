import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../pages/Auth/slice/userSlice.ts';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const useAuth = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.removeItem('token');
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated]);
};
