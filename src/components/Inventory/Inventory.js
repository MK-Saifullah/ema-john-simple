import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/UserContext';

const Inventory = () => {
    const {user} = useContext(AuthContext);

    return (
        <div>
            <h3>This is inventory</h3>
            <p>{user?.email}</p>
        </div>
    );
};

export default Inventory;