import React from 'react'
import { selectUserId } from '../AuthSlice';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { Navigate } from 'react-router-dom';
export default function AdminProtected({children}) {
    const user=useSelector(selectUserId);
    console.log(user.log);
     if(!user){
        return <Navigate to="/login"/>
     }
     if(!user && user.role != "admin"){
        return <Navigate to="/"/>
     }
     return children;
}

