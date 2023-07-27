import React from 'react';
import {
  Box,
  Text,
} from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Dashboard from './Pages/Dashboard';
import { useSelector } from 'react-redux';
import NotFound from './Pages/NotFound';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Navbar from './components/Navbar';

function App() {
  const auth = useSelector(state => state.auth.auth);
  console.log(auth);
  return (
    <>
      <Router>
        {auth && <Navbar />}
        {/* <Navbar /> */}
        <Routes>
          {/* <Route path='/dashboard' element={<Dashboard />} /> */}
          <Route path="/" element={auth ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          {
            auth ? <>
              <Route path='/dashboard' element={<Dashboard />} />
            </> : <>
              <Route path='/login' element={<Login />} />
            </>
          }
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;