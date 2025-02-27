import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, CreateCampaign, Profile, CampaignDetails } from './pages';
import { Sidebar, Navbar } from './components';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Protected route component
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

// Import useAuth hook
import { useAuth } from './context/AuthContext';
import { Navigate } from 'react-router-dom';

const App = () => {
  return (
    <AuthProvider>
      <div className='relative sm:p-8 p-4 bg-[#13131a] min-h-screen flex flex-row'>
        <div className='sm:flex hidden mr-10 relative'>
          <Sidebar />
        </div>
        <div className='flex-1 max-sm:w-full max-w-[1220px] mx-auto sm:pr-5'>
          <Navbar />
          
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
            <Route path='/create-campaign' element={
              <PrivateRoute>
                <CreateCampaign />
              </PrivateRoute>
            } />
            <Route path='/campaign-details/:id' element={<CampaignDetails />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
};

export default App;