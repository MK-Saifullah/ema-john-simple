import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
// import {logo} from '../../images/Logo.svg';
import logo from '../../images/Logo.svg';
import './Header.css';

const Header = () => {
    const {user, logOut} = useContext(AuthContext);
    return (
        <div className='header'>
            <NavLink to='/'><img src={logo} alt=""/></NavLink>
            <div>
                <NavLink to="/">Shop</NavLink>
                <NavLink to="/orders">Orders</NavLink>
                <NavLink to="/inventory">Manage Inventory</NavLink>
                {
                    user?.uid ? 
                    <button onClick = {logOut}>Log out</button>
                    :
                        <>
                            <NavLink to="/login">Login</NavLink>
                            <NavLink to="/signup">Register</NavLink>
                        </>
                }
                <span style={{paddingLeft: '10px', color: 'white'}}>{user?.email}</span>
            </div>
        </div>
    );
};

export default Header;