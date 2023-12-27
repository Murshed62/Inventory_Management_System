import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast';
// Pages
import Dashboard from './Pages/Dashboard';
import Inventory from './Pages/Inventory';
import Requests from './Pages/Requests';
import ManageUser from './Pages/ManageUser';
import Profile from './Pages/Profile';
import Category from './Pages/Category';
import Settings from './Pages/Settings';
import Login from './Pages/Login';
import PageNotFound from './Pages/PageNotFound';
import ProtectedRoute from './UI/ProtectedRoute';
import AppLayout from './UI/AppLayout';
import { DarkModeProvider } from './context/DarkModeContext';

const client = new QueryClient();

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={client}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to='dashboard' />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='inventory' element={<Inventory />} />
              <Route path='requests' element={<Requests />} />
              <Route path='manage-user' element={<ManageUser />} />
              <Route path='profile' element={<Profile />} />
              <Route path='category' element={<Category />} />
              <Route path='settings' element={<Settings />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position='top-center'
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              zIndex: 10000000000,
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
