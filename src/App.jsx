import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import Home from './pages/Home';
import Cities from './pages/Cities';
import CityDetail from './components/CityDetail';
import Header from './components/Header';
import MainLayout from './layouts/MainLayout';
import GoogleCallback from './components/GoogleCallback';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  return isAuthenticated ? children : <Navigate to="/signin" />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/auth/google/callback" element={<GoogleCallback />} />

      <Route
        path="/*"
        element={
          <>
            <Header />
            <MainLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cities" element={<Cities />} />
                <Route path="/cities/:id" element={<CityDetail />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </MainLayout>
          </>
        }
      />
    </Routes>
  );
};

export default App;