import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Register } from './Auth/Register';
import { Login } from './Auth/Login';
import { Navbar } from './Pages/Navbar';
import { Dashboard } from './Pages/Dashboard';
import { Home } from './Pages/Home';

function App() {
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchUserData = async () => {
            if (token) {
                try {
                    const response = await axios.get('https://task-rms2.onrender.com/get-user', {
                        headers: { Authorization: `Bearer ${token}` },
                        timeout: 10000,
                    });
                    setRole(response.data.data.role);
                    console.log(response.data.data);
                } catch (err) {
                    console.error("Error fetching user data:", err);
                    setRole(null);
                }
            }
            setLoading(false);
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path='/register' element={<Register />} />
                    <Route path="/" element={<Login />} />
                    <Route element={<Navbar role={role} />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/dashboard" element={
                            <ProtectedRoute role={role} requiredRole="admin">
                                <Dashboard />
                            </ProtectedRoute>
                        } />
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

const ProtectedRoute = ({ role, requiredRole, children }) => {
    if (role === null) {
        return <div>Loading...</div>; 
    }
    if (role !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default App;
