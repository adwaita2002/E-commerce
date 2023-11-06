import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, incrementAsync, selectOrder } from "../userSlice";
import { selectUserId } from "../../auth/AuthSlice";
import { UserOrdersAsync } from "../userSlice";

export default function UserOrder() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserId);
  console.log(user.id);

  useEffect(() => {
    dispatch(UserOrdersAsync(user.id));
  }, [dispatch, user]);

  const order = useSelector(selectOrder);
  

  return (
    <div>
      <>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 py-1 mt-4 text-start">
          My Orders
        </h1>
        {order.map((ele, ind) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white mt-12">
              <hr />
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <h1 className="text-2xl font-bold">Order id # {ele.id}</h1>
                <div className="flow-root">
                  <ul role="list" className="-my-4 divide-y divide-gray-200">
                    {ele.productss.map((product) => (
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
                                <div className="text-start">
                                  {product.brand}
                                </div>
                              </h3>
                              <p className="ml-4"> $ {product.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.color}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500 font-bold text-[20px]">
                              Qty - {product.quantity}
                            </div>

                            {/* <h1>Address : {ele.address}</h1> */}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>
                    {" "}
                    <span className="mr-1">$</span>
                    {ele.totalPrice}
                  </p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total item</p>
                  <p>
                    {" "}
                    <span className="mr-1"></span>
                    {ele.totalItem} items
                  </p>
                </div>

                <div>
                <h1 className="text-start mt-3 font-bold">Shipping Address:</h1>
                  <div className="flex justify-between gap-x-6 py-1">
                  
                    <div className="flex min-w-0 gap-x-4">
                    
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm  leading-6 text-gray-900 text-start">
                          {ele.address.name}
                        </p>
                        <p className="mt-1 truncate text-sm leading-5 text-black-500 text-start">
                          {ele.address.state}
                        </p>
                        <p className="mt-1 truncate text-sm leading-5 text-black-500 text-start">
                          {ele.address.city}
                        </p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        Mob-{ele.address.phone}
                      </p>
                      <p className="text-sm leading-6 text-gray-900">
                        {ele.address.email}
                      </p>
                      <p className="text-sm leading-6 text-gray-900">
                        Pin-{ele.address.pincode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </>
    </div>
  );
}
