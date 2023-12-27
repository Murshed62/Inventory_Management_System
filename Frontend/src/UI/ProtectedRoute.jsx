import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';

const deptAdminRoutes = ['/dashboard', '/inventory', '/requests', '/profile'];

const ProtectedRoute = ({ children }) => {
  const { pathname } = useLocation();
  const jwt = localStorage.getItem('jwt');

  const { isAuthenticated, isLoading, isDeptAdmin } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);
  if (!jwt) return <Navigate to='/login' />;
  // check if dept admin trying to use super-admin routes
  if (!isLoading && isDeptAdmin && !deptAdminRoutes.includes(pathname))
    return <Navigate to='/dashboard' />;
  if (isLoading) {
    return (
      <div className='flex w-screen h-screen bg-base-100 justify-center items-center'>
        <span
          className='loading loading-infinity 
        loading-lg text-4xl'
        ></span>
      </div>
    );
  }
  return children;
};

export default ProtectedRoute;
