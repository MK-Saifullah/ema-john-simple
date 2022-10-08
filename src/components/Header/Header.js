import React from 'react';
import { NavLink } from 'react-router-dom';
// import {logo} from '../../images/Logo.svg';
import logo from '../../images/Logo.svg';
import './Header.css';

const Header = () => {
    return (
        <div className='header'>
            <NavLink to='/'><img src={logo} alt=""/></NavLink>
            <div>
                <NavLink to="/">Shop</NavLink>
                <NavLink to="/orders">Orders</NavLink>
                <NavLink to="/inventory">Manage Inventory</NavLink>
                <NavLink to="/login">Login</NavLink>
            </div>
        </div>
    );
};

export default Header;