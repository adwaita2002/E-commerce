import React from 'react'
import { selectUserId } from '../AuthSlice';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { Navigate } from 'react-router-dom';
export default function Protected({children}) {
    const user=useSelector(selectUserId);
     if(!user){
        return <Navigate to="/login"/>
     }
     return children;
}

