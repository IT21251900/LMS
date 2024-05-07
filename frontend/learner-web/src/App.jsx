import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './auth/LoginPage';
import SignUpPage from './auth/SignUpPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          {/* Add more routes for other pages */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
