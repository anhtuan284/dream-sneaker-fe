import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Nav } from "../components";

const Cart = () => {
  const [cookies, setCookie] = useCookies(["cart"]);
  const [cart, setCart] = useState(cookies.cart || {});

  useEffect(() => {
    setCookie("cart", cart, { path: "/" });
  }, [cart, setCookie]);

  const handleRemove = (id) => {
    const updatedCart = { ...cart };
    delete updatedCart[id];
    setCart(updatedCart);
  };

  const handleQuantityChange = (id, quantity) => {
    const updatedCart = { ...cart };
    if (quantity <= 0) {
      delete updatedCart[id];
    } else {
      updatedCart[id].quantity = quantity;
    }
    setCart(updatedCart);
  };

  const getTotal = () => {
    return Object.values(cart).reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <>
      <Nav />
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
          <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
            Shopping Cart
          </h2>
          <div className="hidden lg:grid grid-cols-2 py-6">
            <div className="font-normal text-xl leading-8 text-gray-500">
              Product
            </div>
            <p className="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between">
              <span className="w-full max-w-[200px] text-center">
                Delivery Charge
              </span>
              <span className="w-full max-w-[260px] text-center">Quantity</span>
              <span className="w-full max-w-[200px] text-center">Total</span>
            </p>
          </div>
          {Object.keys(cart).length === 0 ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <span>Không có sản phẩm nào trong giỏ!</span>
            </div>
          ) : (
            Object.values(cart).map((item, index) => (
              <div
                key={item.id}
                className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 p-6 shadow hover:shadow-lg mb-2"
              >
                <div className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                  <div className="img-box">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="xl:w-[140px] object-cover rounded-md shadow-md"
                    />
                  </div>
                  <div className="pro-data w-full max-w-sm ">
                    <h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center">
                      {item.name}
                    </h5>
                    <p className="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
                      Perfumes
                    </p>
                    <h6 className="font-medium text-lg leading-8 text-indigo-600 max-[550px]:text-center">
                      ${item.price.toFixed(2)}
                    </h6>
                  </div>
                </div>
                <div className="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
                  <h6 className="font-manrope font-bold text-2xl leading-9 text-black w-full max-w-[176px] text-center">
                    $15.00{" "}
                    <span className="text-sm text-gray-300 ml-3 lg:hidden whitespace-nowrap">
                      (Delivery Charge)
                    </span>
                  </h6>
                  <div className="flex items-center w-full mx-auto justify-center">
                    <button
                      className="group rounded-l-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                    >
                      <svg
                        className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                      >
                        <path
                          d="M16.5 11H5.5"
                          stroke=""
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                    <input
                      type="number"
                      min="1"
                      className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                    />
                    <button
                      className="group rounded-r-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      <svg
                        className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                      >
                        <path
                          d="M11 5.5V16.5M16.5 11H5.5"
                          stroke=""
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
                    ${(item.price * item.quantity).toFixed(2)}
                  </h6>
                </div>
              </div>
            ))
          )}
          <div className="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
            <div className="flex items-center justify-between w-full mb-6">
              <p className="font-normal text-xl leading-8 text-gray-400">
                Sub Total
              </p>
              <h6 className="font-semibold text-xl leading-8 text-gray-900">
                ${getTotal().toFixed(2)}
              </h6>
            </div>
            <div className="flex items-center justify-between w-full pb-6 border-b border-gray-200">
              <p className="font-normal text-xl leading-8 text-gray-400">
                Delivery Charge
              </p>
              <h6 className="font-semibold text-xl leading-8 text-gray-900">
                $45.00
              </h6>
            </div>
            <div className="flex items-center justify-between w-full py-6">
              <p className="font-manrope font-medium text-2xl leading-9 text-gray-900">
                Total
              </p>
              <h6 className="font-manrope font-medium text-2xl leading-9 text-indigo-500">
                ${(getTotal() + 45).toFixed(2)}
              </h6>
            </div>
          </div>
          <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
            <button className="rounded-full py-4 w-full max-w-[280px] flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100">
              <span className="px-2 font-semibold text-lg leading-8 text-indigo-600">
                Add Coupon Code
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
              >
                <path
                  d="M8.25324 5.49609L13.7535 10.9963L8.25 16.4998"
                  stroke="#4F46E5"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700">
              Continue to Payment
              <svg
                className="ml-2"
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="22"
                viewBox="0 0 23 22"
                fill="none"
              >
                <path
                  d="M8.25324 5.49609L13.7535 10.9963L8.25 16.4998"
                  stroke="white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
