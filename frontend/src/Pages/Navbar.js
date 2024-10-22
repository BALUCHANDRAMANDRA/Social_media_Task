import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/Navbar.css'

export const Navbar = () => {
    const [name, setName] = useState('');
    const [role, setRole] = useState(''); 
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            navigate('/');
            return;
        }
        
        axios.get('https://task-rms2.onrender.com/get-user', {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => {
            setName(res.data.data.username);
            setRole(res.data.data.role); 
        })
        .catch(err => {
            console.error(err);
            navigate('/');
        });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/');
    };

    return (
        <div className="Nav-container">
            <header className="header">
                <div className="navbar">
                    <Link to="/home" className="nav-link">Home</Link>
                    {role === 'admin' && (
                        <>
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                        </>
                    )}
                </div>
                <div className="header-right">
                    {name && <span className="username">Welcome, {name}</span>}
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </header>
            <main className="main-content">
                <Outlet context={{ name, role }} /> 
            </main>
        </div>
    );
};



