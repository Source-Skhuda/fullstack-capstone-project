import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './LoginPage.css';
import {urlConfig} from '../../config';
import { useAppContext } from '../../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setIsLoggedIn, setUserName } = useAppContext();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('auth-token')) {
            navigate("/app");
        }
    }, [navigate])

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await fetch(`${urlConfig.backendUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || "Failed to login");
                return;
            }
            const json = await response.json();
            if (json.authtoken) {
                sessionStorage.setItem("auth-token", json.authtoken);
                sessionStorage.setItem("email", json.email);
                sessionStorage.setItem("name", json.name);
                setIsLoggedIn(true);
                setUserName(json.name);
                navigate("/app");
            }
        } catch (error) {
            setError("An error occurred while logging in. Please try again.");
        }
    }
    return (
        <div className="container mt-5">
            {error ? <div className="alert alert-danger">{error}</div> : ""}
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-6">
                    <div className="login-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Login</h2>
                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label"> Email</label><br/>
                                <input id="email" type="email" className="form-control" placeholder="Enter your email" value={email} 
                                onChange={(e) => setEmail(e.target.value) } required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label"> Password</label><br/>
                                <input id="password" type="password" className="form-control" placeholder="Enter your password" value={password} 
                                onChange={(e) => setPassword(e.target.value) } required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
                        </form>
                        <p className="mt-4 text-center">
                            New here? <a href="/app/register" className="text-primary">Register Here</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;