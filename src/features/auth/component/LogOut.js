import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { SingOutAsync, selectUserId } from '../AuthSlice';
import { Navigate } from 'react-router-dom';

export default function LogOut() {
    const dispatch=useDispatch();
    const user=useSelector(selectUserId)

    useEffect(()=>{
       dispatch(SingOutAsync());
    })
  return (
     <>

     {!user && <Navigate to="/login" replace={true}></Navigate>}
              
    </>
  )
}
