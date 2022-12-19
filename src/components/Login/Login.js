import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import './Login.css'

const Login = () => {

    const navigate = useNavigate();
    
    const {signIn} = useContext(AuthContext);
    const [error, setError] = useState(null)
    // const [signIn, setSignIn] = useState(null)
    
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    
    const handleSignIn = (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            console.log(user);
            // setSignIn(user)
            form.reset();
            navigate(from, { replace: true })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage)
            setError(error)
          });
    }

    return (
        <div className='form-container'>
            <h2 className='form-title'>Log in</h2>
            {/* <p>You are logged in by this {signIn?.email} address</p> */}
            
            <form onSubmit={handleSignIn}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" required/>
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" required />
                </div>
                <input className="btn-submit" type="submit" name="" value="Log in" />
            </form>
            <p>New to ema john, create a <Link to="/signup">New Account</Link></p>
            <p>{error?.errorMessage}</p>
        </div>
    );
};

export default Login;