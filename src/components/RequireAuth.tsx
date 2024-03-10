import React, { FC } from 'react'
import { getUserStorage } from '../common/PersistanceManager';
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth: FC = () => {
    const user = getUserStorage();
    if(!user){
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}

export default RequireAuth