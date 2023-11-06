import React, { useEffect} from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { deleteItemByIdAsync } from '../features/cart/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../features/auth/AuthSlice';
import { deleteOrder } from '../features/order/OrderSlice';
import { Square3Stack3DIcon } from '@heroicons/react/24/solid';


export default function OrderSuccess() {
  const param =useParams();
  const user=useSelector(selectUserId);
  const dispatch=useDispatch();


  useEffect(()=>{
    dispatch(deleteItemByIdAsync(user.id));
    dispatch(deleteOrder());
  },[dispatch,user]);



  return (
    <div>
          { !param.id && <Navigate to="/" />}
         <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-center font-semibold text-indigo-600"> <Square3Stack3DIcon className='w-16 h-16 ml-56'></Square3Stack3DIcon></p>
         
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-green-600 sm:text-5xl">Order Successfully Done</h1>
          <p className="mt-6 text-[40px] font-semibold leading-7 text-black-600">Order id #{param.id}</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
           
          </div>
        </div>
      </main>
    </div>
  )
}

