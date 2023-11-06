import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  incrementAsync,
  selectCount,
  updateCartAsync,
} from "./CartSlice";
import { Link, Navigate } from "react-router-dom";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { selectItems } from "./CartSlice";
import { deleteCartAsync } from "./CartSlice";
import { useAlert } from "react-alert";
import Modal from "../common/Modal";

export default function Cart() {
  // const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [showModal, setShowModal] = useState(null);
  const productss = useSelector(selectItems);

  const totalPrice = productss.reduce(
    (amount, productss) => productss.price * productss.quantity + amount,
    0
  );
  const totalItem = productss.reduce(
    (item, productss) => productss.quantity + item,
    0
  );

  const handleQuan = (e, product) => {
    dispatch(updateCartAsync({ ...product, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteCartAsync(id));
    alert.success("Done");
  };
  const alert = useAlert();
  return (
    <>
      {!productss.length && <Navigate to="/" replace={true}></Navigate>}

   
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white mt-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 py-3">
          My Carts
        </h1>
        <hr />
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
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
                      <div className="text-gray-500 font-bold text-[20px]">
                        Qty -
                        <select
                          className="ml-2"
                          onChange={(e) => handleQuan(e, product)}
                          value={product.quantity}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>

                      <div className="flex">
                        <Modal
                          title={`Delete ${product.title}`}
                          Messege="Are you sure! you want to delete your Cart?"
                          DengerOption="Delete"
                          CancelOption="Cancel"
                          DengarAction={(e)=>handleRemove(e,product.id)}
                          CancelAction={(e)=>setShowModal(-1)}
                          handleShow={showModal===product.id}
                        ></Modal>
                        <button
                          onClick={()=>setShowModal(product.id)}
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

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>
              {" "}
              <span className="mr-1">$</span>
              {totalPrice}
            </p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total item</p>
            <p>
              {" "}
              <span className="mr-1"></span>
              {totalItem} items
            </p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
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
    </>
  );
}
