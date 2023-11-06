import React, { useEffect, useState } from "react";
import { LIMIT_PER_PAGE } from "../../../app/constant";
import {
  AllOrders,
  fetchAllOrderAsync,
  totalOrder,
  updateOrderAsync,
} from "../../order/OrderSlice";
import { useDispatch, useSelector } from "react-redux";
import { XMarkIcon, EyeIcon, PencilIcon } from "@heroicons/react/24/outline";
import Paginations from "../../common/Paginations";

export default function AdminOrder() {
  const dispatch = useDispatch();

  const order = useSelector(AllOrders);

  const totalorder = useSelector(totalOrder);

  const [page, setPage] = useState(1);

  const handlePage=(page)=>{
      setPage(page);
      const pagination = { _page: page, _limit: LIMIT_PER_PAGE };
      dispatch(fetchAllOrderAsync(pagination));
  }

  useEffect(() => {
     handlePage(page);
  }, [page]);

  const [orderid, setOrderid] = useState(-1);

  const handleEdit = (items) => {
    setOrderid(items.id);
  };

  const handleShow = (items) => {
    console.log("show");
  };

  const handleUpdate = (e, items) => {
    console.log(e.target.value);
    const newOrder = { ...items, status: e.target.value };
    dispatch(updateOrderAsync(newOrder));
    setOrderid(-1);
  };

  const choseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-300 text-purple-600";
      case "dispatched":
        return "bg-green-300 text-purple-600";
      case "delivered":
        return "bg-yellow-200 text-purple-600";
      case "cencelled":
        return "bg-red-500 text-black-600";
    }
  };

  return (
    <>
      <>
        {/* component */}
        <div className="overflow-x-auto">
          <div className=" bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
            <div className="w-full ">
              <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Order id</th>
                      <th className="py-3 px-6 text-left">Product</th>
                      <th className="py-3 px-6 text-center">Total Amount</th>
                      <th className="py-3 px-6 text-center">
                        Shipping Address
                      </th>
                      <th className="py-3 px-6 text-center">Status</th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {order.map((items) => (
                      <tr className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="mr-2"></div>
                            <span className="font-medium text-lg">
                              {items.id}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          {items.productss.map((item) => (
                            <div className="flex items-center">
                              <div className="mr-2">
                                <img
                                  className="w-6 h-6 rounded-full"
                                  src={item.thumbnail}
                                />
                              </div>
                              <span className="text-lg">
                                {item.title} - #{item.quantity} - ${item.price}
                              </span>
                            </div>
                          ))}
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center font-bold">
                            ${items.totalPrice}
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className=" ">
                            <strong>{items.address.name}</strong>
                            <div>{items.address.city}</div>
                            <div>{items.address.state}</div>
                            <div>{items.address.phone}</div>
                            <div>{items.address.pincode}</div>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          {orderid === items.id ? (
                            <select onChange={(e) => handleUpdate(e, items)}>
                              <option value="pending">Pending</option>
                              <option value="delivered">Delivered</option>
                              <option value="cencelled">Cancelled</option>
                              <option value="dispatched">Dispatched</option>
                            </select>
                          ) : (
                            <span
                              className={`${choseColor(
                                items.status
                              )} py-1 px-3 rounded-full text-xs font-semibold`}
                            >
                              {items.status}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex item-center justify-center">
                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                              <EyeIcon
                                className="w-6 h-6"
                                onClick={(e) => handleShow(items)}
                              ></EyeIcon>
                            </div>
                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                              <PencilIcon
                                className="w-6 h-6 ml-2"
                                onClick={(e) => handleEdit(items)}
                              ></PencilIcon>
                            </div>
                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <Paginations
          handlePage={handlePage}
          page={page}
          setPage={setPage}
          totalItems={totalorder}
          
        ></Paginations>
      </>
    </>
  );
}
