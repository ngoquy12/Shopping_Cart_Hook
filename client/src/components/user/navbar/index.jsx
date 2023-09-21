import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
// import { getAllCart } from "../../../redux/useSlice/cartSlice";
// import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  // const dispatch = useDispatch();
  // const listCart = useSelector((pro) => pro.cart.carts);

  // useEffect(() => {
  //   dispatch(getAllCart());
  // }, []);
  return (
    <div>
      <div className="w-full sticky top-0 z-50 px-6 h-16 bg-black text-white flex justify-between items-center">
        <ul className="flex gap-5">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/list-product">Product</NavLink>
        </ul>
        <ul className="flex gap-5">
          <NavLink to="/about">About</NavLink>
          <NavLink tp="/contact">Contact</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/cart">
            <div className="relative">
              <ShoppingCartOutlined className="text-2xl" />
              <span
                className="border absolute bg-red-600 text-xs rounded-2xl px-2 right-1"
                style={{ top: "-10px" }}
              >
                {/* {listCart.length} */}
              </span>
            </div>
          </NavLink>
        </ul>
      </div>
    </div>
  );
}
