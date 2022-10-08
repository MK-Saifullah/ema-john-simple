import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
// import Shop from '../Shop/Shop';

const Main = () => {
    return (
        <div>
            <Header></Header>
            {/* <Shop></Shop> */}
            <Outlet></Outlet>
        </div>
    );
};

export default Main;