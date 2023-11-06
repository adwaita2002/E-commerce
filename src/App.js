import React, { useEffect } from 'react';
import logo from './logo.svg';
import  Counter  from './features/counter/Counter';
import './App.css';

import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SingUpPage from './pages/SingUpPage';
import Cart from './features/cart/Cart';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import Protected from './features/auth/component/Protected';
import OrderSuccess from './pages/Order-Sucess';
import { fetchUserInfosAsync } from './features/user/userSlice';

import UserOrderPage from './pages/UserOrderPage';

import ProductDetailsPage from './pages/ProductDetailsPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemByIdAsync } from './features/cart/CartSlice';
import { selectUserId } from './features/auth/AuthSlice';
import PageNotFound from './pages/PageNotFound';
import UserProfile from './features/user/component/UserProfile';
import UserProfilePage from './pages/UserProfilePage';
import LogOut from './features/auth/component/LogOut';
import AdminHome from './pages/AdminHome';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminProtected from './features/auth/component/AdminProtected';
import AdminProductDetailsPage from './pages/AdminProductDetailsPage';
import AdminFormPage from './pages/AdminFormPage';
import AdminOrderPage from './pages/AdminOrderPage';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";


const options = {
  timeout: 5000,
  position: positions.BOTTOM_RIGHT
};

const router=createBrowserRouter([
  {
    path:'/',
    element: <Protected><Home/></Protected> 
  },
  {
    path:'/login',
    element:<LoginPage/>
  },
  {
    path:'/singup',
    element:<SingUpPage/>
  },
  {
    path:'/cart',
    element:<Protected><CartPage></CartPage></Protected>
  },
  {
    path:'/checkout',
    element:<Protected><Checkout></Checkout></Protected>
  },
  {
    path:'/productdetails/:id',
    element:<Protected><ProductDetailsPage></ProductDetailsPage></Protected>
  },
  {
    path:'*',
    element:<PageNotFound></PageNotFound>
  },
  {
    path:'/order-success/:id',
    element:<OrderSuccess></OrderSuccess>
  },
  {
    path:'/order',
    element:<UserOrderPage></UserOrderPage>
  },
  {
    path:'/profile',
    element:<UserProfilePage></UserProfilePage>
  },
  {
    path:'/logout',
    element:<LogOut></LogOut>
  },
  {
    path:'/forgotpassword',
    element:<ForgotPasswordPage></ForgotPasswordPage>
  },
  {
    path:'/admin',
    element: <AdminProtected><AdminHome></AdminHome></AdminProtected> 
  },
  {
    path:'/admin/productdetails/:id',
    element: <AdminProtected><AdminProductDetailsPage></AdminProductDetailsPage></AdminProtected> 
  },
  {
    path:'/admin/adminform',
    element: <AdminProtected><AdminFormPage></AdminFormPage></AdminProtected> 
  },
  {
    path:'/admin/adminform/edit/:id',
    element: <AdminProtected><AdminFormPage></AdminFormPage></AdminProtected> 
  },
  {
    path:'/admin/order',
    element: <AdminProtected><AdminOrderPage></AdminOrderPage></AdminProtected> 
  },

])



function App() {
  const dispatch=useDispatch();
  const user=useSelector(selectUserId);
  // console.log(user.id);
  useEffect(()=>{
    if(user){
     dispatch(fetchItemByIdAsync(user.id));
     dispatch(fetchUserInfosAsync(user.id));
    }
  },[dispatch,user])

  return (
    <div className="App">

<Provider template={AlertTemplate} {...options}>
<RouterProvider router={router}/>
  </Provider>
 
   
    </div>
  );
}

export default App;
