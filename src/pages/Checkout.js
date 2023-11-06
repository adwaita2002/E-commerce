import React from 'react'
import CartPage from './CartPage'

import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { updateCartAsync,deleteCartAsync } from '../features/cart/CartSlice';
import { useState } from 'react';
import { selectItems } from '../features/cart/CartSlice';
import { Navigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { addAdressAsync, selectUserId } from '../features/auth/AuthSlice';
import { addOrderAsync, currentOdereItem } from '../features/order/OrderSlice';
import { selectUserInfo } from '../features/user/userSlice';
import { useAlert } from "react-alert";







export default function Checkout() {

  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const productss=useSelector(selectItems); 
  const alert = useAlert();


   const totalPrice = productss.reduce((amount,productss)=>productss.price*productss.quantity+amount,0);
   const totalItem = productss.reduce((item,productss)=>productss.quantity+item,0);

   const handleQuan=(e,product)=>{
      dispatch(updateCartAsync({...product,quantity:+e.target.value}))
   }
  
   const handleRemove =(e, id)=>{
    dispatch(deleteCartAsync(id));
   }

   const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  }  = useForm();

  const user=useSelector(selectUserInfo);
  

  const [address,setAddress]=useState(null);

  console.log(address);

  const handleAdd=(e)=>{
    // console.log(e.target.value);
   
    setAddress(user.address[e.target.value]);
  }

  const [payment,setPayment]=useState('cash');

  const handlePay =(e)=>{
      setPayment(e.target.value);
  }

  const handleOrder=()=>{
    const order={productss,totalPrice,totalItem,user,payment,address,status:'pending'};
    dispatch(addOrderAsync(order));
    alert.success("order succesfully done");

  }

  const currentOrder=useSelector(currentOdereItem);
  
  
    

  return (
    <>
     
     {!productss.length && <Navigate to="/" replace={true}></Navigate>}
    { currentOrder && <Navigate to={`/order-success/${currentOrder.id}`} replace={true}></Navigate>}
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
     <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-5 ">
     <div className='lg:col-span-3'>
         <form className='bg-white px-5 mt-12 pt-3 mb-12'  noValidate onSubmit={handleSubmit((data)=>{
          dispatch(addAdressAsync({...user,address:[...user.address,data]}));
          reset();
          })}>
      <div className="space-y-12">
         <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900 text-start">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600 text-start">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 text-start">
                Full name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("name",{required : "name is required"})}
                  id="name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

           

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 text-start">
                Email address
              </label>
              <div className="mt-2">
              <input
                  id="email"
                  {...register("email",{required : "email id requird" , pattern : { value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, message: 'email not valid' },})}
                  type="email"
                  
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 text-start">
                Phone no.
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  {...register("phone",{required : "phone no is required"})}
                  type="tel"
                  
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900 text-start">
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
              
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>United States</option>
                  <option>India</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900 text-start">
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("street",{required : "street is required"})}
                  id="street-address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900 text-start">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("city",{required : "city is required"})}
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900 text-start">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("state",{required : "state is requiredS"})}
                  id="region"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900 text-start">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("pincode",{required : "pincode is required"})}
                  id="postal-code"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Reset
        </button>
        <button
          type="submit"
         
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Address
        </button>
      </div>        


        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900 text-start">Address</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600 text-start">
            Choose address from exicting addrese
          </p>

          <ul role="list" className="divide-y divide-gray-100">
      {user.address.map((person,index) => (
        <li key={person.email} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
          <input
                    id="address"
                    name="address"
                    type="radio"
                    onChange={handleAdd}
                    value={index}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900 text-start">{person.name}</p>
              <p className="mt-1 truncate text-sm leading-5 text-black-500 text-start">{person.state}</p>
              <p className="mt-1 truncate text-sm leading-5 text-black-500 text-start">{person.city}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">Mob-{person.phone}</p>
            <p className="text-sm leading-6 text-gray-900">{person.email}</p>
            <p className="text-sm leading-6 text-gray-900">Pin-{person.pincode}</p>
            
          </div>
        </li>
      ))}
    </ul>

          <div className="mt-10 space-y-10">
            
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900 text-start">Payment Method</legend>
              <p className="mt-1 text-sm leading-6 text-gray-600 text-start">Choose One</p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="payment"
                    name="push-notifications"
                    onChange={handlePay}
                    checked={payment==='cash'}
                    type="radio"
                    value={'cash'}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                  Cash on delivery
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="payment"
                    name="push-notifications"
                    onChange={handlePay}
                    value={'card'}
                    type="radio"
                    checked={payment==='card'}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                    Card Payment
                  </label>
                </div>
            
              </div>
            </fieldset>
          </div>
        </div>
    </div>

     
    </form>
    </div>
    <div className='lg:col-span-2'>

    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white mt-12">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 py-3">My Carts</h1>
        <hr />
        <div className="border-t border-gray-200 px-4 py-6 sm:px-2">
          <div className="flow-root">
            <ul role="list" className="-my-4 divide-y divide-gray-200">
              {productss.map((product) => (
                <li key={product.id} className="flex py-3">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={product.thumbnail}
                      alt={product.thumbnail}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <div>{product.title}</div>
                          <div className="text-start">{product.brand}</div>
                        </h3>
                        <p className="ml-4"> $ {product.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.color}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500 font-bold text-[20px]">Qty - 
                      <select className="ml-2" onChange={(e)=>handleQuan(e,product)} value={product.quantity}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      </select>
                      </div>

                      <div className="flex">
                        <button
                        onClick={(e)=>handleRemove(e,product.id)}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
               
              ))}
            </ul>
          
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-2">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p> <span className="mr-1">$</span>{totalPrice}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total item</p>
            <p> <span className="mr-1"></span>{totalItem} items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <div
              onClick={handleOrder}
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
             Order Now
            </div>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <Link to="/">
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={() => setOpen(false)}
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    </>
  )
}
