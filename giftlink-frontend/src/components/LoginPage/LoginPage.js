import React, { useState } from 'react';
import './LoginPage.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async () => {
        console.log("Inside handleLogin");
    }
    return (
        <div className="container mt-5">
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