import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../../auth/AuthSlice";
import { selectUserInfo } from "../userSlice";
import { addAdressAsync } from "../userSlice";
import { useForm } from "react-hook-form";

import { PencilIcon } from "@heroicons/react/24/outline";

export default function UserProfile() {
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [addressindex, setAddressIndex] = useState(-1);
  const [showAdd, setshowAdd] = useState(false);

  const handleEdit = (addAddress, index) => {
    const newUser = { ...user, address: [...user.address] };
    newUser.address.splice(index, 1, addAddress);
    dispatch(addAdressAsync(newUser));
    setAddressIndex(-1);
  };

  const handleRemove = (e, index) => {
    const newUser = { ...user, address: [...user.address] };
    newUser.address.splice(index, 1);
    dispatch(addAdressAsync(newUser));
    setshowAdd(false);
  };

  const handleAdd=(address)=>{
    const newUser = { ...user, address: [...user.address,address] };
    dispatch(addAdressAsync(newUser));
    setshowAdd(false);
  }

  const handleForm = (index) => {
    setAddressIndex(index);
    setshowAdd(false);
    const add = user.address[index];
    setValue("name", add.name);
    setValue("email", add.email);
    setValue("phone", add.phone);
    setValue("street", add.street);
    setValue("city", add.city);
    setValue("state", add.state);
    setValue("pincode", add.pincode);
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white mt-12 pb-10">
        <hr />
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          {/* { user.address ? <h1 className="text-2xl font-bold"> Name : {user.address[0].name}</h1> : null} */}
          <div className="flow-root">Email : {user.email}</div>
           <div className="flow-root"> Role : {user.role}</div> 
        </div>

        <div>
                   <div className="text-start">
                   <button
                      type="button"
                      onClick={(e) =>{setshowAdd(true);setAddressIndex(-1)}}
                      className=" mb-3 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add New Address
                    </button>
                    </div>

              
                    {showAdd ? (
                  <form
                    className="bg-white px-0 mt-0 pt-0 mb-12"
                    noValidate
                    onSubmit={handleSubmit((data) => {
                      handleAdd(data);
                      reset();
                    })}
                  >
                    <div className="space-y-2">
                      <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-4 grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium leading-6 text-gray-900 text-start"
                            >
                              Full name
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("name", {
                                  required: "name is required",
                                })}
                                id="name"
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-4">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium leading-6 text-gray-900 text-start"
                            >
                              Email address
                            </label>
                            <div className="mt-2">
                              <input
                                id="email"
                                {...register("email", {
                                  required: "email id requird",
                                  pattern: {
                                    value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                                    message: "email not valid",
                                  },
                                })}
                                type="email"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-4">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium leading-6 text-gray-900 text-start"
                            >
                              Phone no.
                            </label>
                            <div className="mt-2">
                              <input
                                id="phone"
                                {...register("phone", {
                                  required: "phone no is required",
                                })}
                                type="tel"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="col-span-full">
                            <label
                              htmlFor="street-address"
                              className="block text-sm font-medium leading-6 text-gray-900 text-start"
                            >
                              Street address
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("street", {
                                  required: "street is required",
                                })}
                                id="street-address"
                                name="street"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2 sm:col-start-1">
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium leading-6 text-gray-900 text-start"
                            >
                              City
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("city", {
                                  required: "city is required",
                                })}
                                id="city"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="region"
                              className="block text-sm font-medium leading-6 text-gray-900 text-start"
                            >
                              State / Province
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("state", {
                                  required: "state is requiredS",
                                })}
                                id="region"
                                autoComplete="address-level1"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="postal-code"
                              className="block text-sm font-medium leading-6 text-gray-900 text-start"
                            >
                              ZIP / Postal code
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("pincode", {
                                  required: "pincode is required",
                                })}
                                id="postal-code"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                          type="submit"
                          onClick={() => setshowAdd(false)}
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          cencel
                        </button>
                        <button
                          type="submit"
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Add Address
                        </button>
                      </div>
                    </div>
                  </form>
                ) : null}
                

          <h1 className="text-start font-bold">Your Address:</h1>

          {user.address.map((ele, index) => (
            <>
              <div className="lg:col-span-3">
                {addressindex === index ? (
                  <form
                    className="bg-white px-0 mt-0 pt-0 mb-12"
                    noValidate
                    onSubmit={handleSubmit((data) => {
                      handleEdit(data, index);
                      reset();
                    })}
                  >
                    <div className="space-y-2">
                      <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-4 grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium leading-6 text-gray-900 text-start"
                            >
                              Full name
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("name", {
                                  required: "name is required",
                                })}
                                id="name"
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-4">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium leading-6 text-gray-900 text-start"
                            >
                              Email address
                            </label>
                            <div className="mt-2">
                              <input
                                id="email"
                                {...register("email", {
                                  required: "email id requird",
                                  pattern: {
                                    value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                                    message: "email not valid",
                                  },
                                })}
                                type="email"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-4">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium leading-6 text-gray-900 text-start"
                            >
                              Phone no.
                            </label>
                            <div className="mt-2">
                              <input
                                id="phone"
                                {...register("phone", {
                                  required: "phone no is required",
                                })}
                                type="tel"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="col-span-full">
                            <label
                              htmlFor="street-address"
                              className="block text-sm font-medium leading-6 text-gray-900 text-start"
                            >
                              Street address
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("street", {
                                  required: "street is required",
                                })}
                                id="street-address"
                                name="street"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2 sm:col-start-1">
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium leading-6 text-gray-900 text-start"
                            >
                              City
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("city", {
                                  required: "city is required",
                                })}
                                id="city"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="region"
                              className="block text-sm font-medium leading-6 text-gray-900 text-start"
                            >
                              State / Province
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("state", {
                                  required: "state is requiredS",
                                })}
                                id="region"
                                autoComplete="address-level1"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="postal-code"
                              className="block text-sm font-medium leading-6 text-gray-900 text-start"
                            >
                              ZIP / Postal code
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("pincode", {
                                  required: "pincode is required",
                                })}
                                id="postal-code"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                          type="submit"
                          onClick={() => setAddressIndex(-1)}
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          cencel
                        </button>
                        <button
                          type="submit"
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Edit Address
                        </button>
                      </div>
                    </div>
                  </form>
                ) : null}
              </div>

              <div className="flex justify-between gap-x-6 py-1">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <h1 className="text-start font- font-semibold">
                      Address : {index + 1}
                    </h1>
                    <p className="text-sm   text-gray-900 text-start">
                      {" "}
                      Name :{ele.name}
                    </p>
                    <p className="mt-1 truncate text-sm leading-5 text-black-500 text-start">
                      {ele.state}
                    </p>
                    <p className="mt-1 truncate text-sm leading-5 text-black-500 text-start">
                      {ele.city}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    Mob-{ele.phone}
                  </p>
                  <p className="text-sm leading-6 text-gray-900">{ele.email}</p>
                  <p className="text-sm leading-6 text-gray-900">
                    Pin-{ele.pincode}
                  </p>
                </div>

                <div>
                  <div>
                    {" "}
                    <button
                      type="button"
                      onClick={(e) => handleForm(index)}
                      className="text-sm font-semibold leading-6 text-blue-600"
                    >
                   
                      Edit
                    </button>
                  </div>
                  <div>
                    {" "}
                    <button
                      onClick={(e) => handleRemove(e, index)}
                      type="button"
                      className="text-sm font-semibold leading-6 text-red-600"
                    >
                   
                      Remove 
                    </button>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
