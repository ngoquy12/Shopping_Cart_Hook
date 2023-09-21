import React, { useEffect, useState } from "react";
import Navbar from "../../../components/user/navbar";
import { Button } from "antd";
import { formatCurrencyVND } from "./../../../utils/formatData";
import instance from "../../../api/axios";

export default function Cart() {
  const [carts, setCarts] = useState([]);

  // Tính tổng số tiền
  const totalAmount = () => {
    return carts.reduce((prev, curent) => {
      return prev + curent.datas.price * curent.quantity;
    }, 0);
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const handleDeleteCart = async (id) => {
    try {
      // Lấy ra tất cả giỏ hàng trong db
      const response = await instance.get("carts");

      const userCart = response.data.find((user) => user.userId === 13);
      if (userCart) {
        // Tìm kiếm giỏ hàng của user đang đăng nhập
        const cartIndex = userCart.cartDetails.filter(
          (cart) => cart.productId !== id
        );
        // Cập nhật giỏ hàng của người dùng với danh sách sản phẩm đã lọc
        userCart.cartDetails = cartIndex;

        // Cập nhật giỏ hàng trên server
        await instance.put(`carts/${userCart.id}`, userCart);

        // Cập nhật lại state với danh sách sản phẩm sau khi xóa
        getAllCart();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Lấy thông tin tất cả giỏ hàng
  const getAllCart = async () => {
    try {
      // Lấy ra tất cả giỏ hàng trong db
      const response = await instance.get("carts");
      // Tìm kiếm giỏ hàng của user đang đăng nhập
      const cartUser = await response.data.find((cart) => cart.userId === 13);

      if (cartUser) {
        const updatedCarts = await Promise.all(
          cartUser.cartDetails.map(async (cartItem) => {
            // Lấy thông tin sản phẩm dựa trên productId
            const product = await instance.get(
              `products/${cartItem.productId}`
            );
            const datas = product.data;
            return { ...cartItem, datas };
          })
        );

        setCarts(updatedCarts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCart();
  }, []);

  // Hàm xử lý tăng
  const handleIncrease = async (id) => {
    try {
      // Lấy ra tất cả giỏ hàng trong db
      const response = await instance.get("carts");

      const userCart = response.data.find((user) => user.userId === 13);
      if (userCart) {
        // Tìm kiếm giỏ hàng của user đang đăng nhập
        const cartIndex = userCart.cartDetails.findIndex(
          (cart) => cart.productId === id
        );
        if (cartIndex !== -1) {
          // Tăng số lượng sản phẩm trong giỏ hàng
          userCart.cartDetails[cartIndex].quantity += 1;

          // Cập nhật giỏ hàng trên server
          await instance.put(`carts/${userCart.id}`, userCart);

          getAllCart(); // Load lại dữ liệu
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Hàm xử lý giảm
  const handleDecrease = async (id) => {
    try {
      // Lấy ra tất cả giỏ hàng trong db
      const response = await instance.get("carts");

      const userCart = response.data.find((user) => user.userId === 13);
      if (userCart) {
        // Tìm kiếm giỏ hàng của user đang đăng nhập
        const cartIndex = userCart.cartDetails.findIndex(
          (cart) => cart.productId === id
        );
        if (cartIndex !== -1) {
          if (userCart.cartDetails[cartIndex].quantity > 1) {
            // Giảm số lượng sản phẩm trong giỏ hàng
            userCart.cartDetails[cartIndex].quantity -= 1;

            // Cập nhật giỏ hàng trên server
            await instance.put(`carts/${userCart.id}`, userCart);

            getAllCart(); // Load lại dữ liệu
          } else {
            handleDeleteCart(id);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="m-7 flex flex-wrap flex-col gap-3 items-center">
        {carts.map((cart, index) => (
          <div
            key={index}
            className="flex items-center justify-between w-2/3 bg-slate-100 p-2"
          >
            <img
              height={100}
              width={100}
              className="rounded"
              src={cart.datas.image}
              alt=""
            />
            <span>{cart.datas.productName}</span>
            <div className="flex gap-16">
              <div className="flex gap-3 items-center">
                <button
                  onClick={() => handleIncrease(cart.datas.id)}
                  className="border px-3 text-2xl"
                >
                  +
                </button>
                <span>{cart.quantity}</span>
                <button
                  onClick={() => handleDecrease(cart.datas.id)}
                  className="border px-3 text-2xl"
                >
                  -
                </button>
              </div>
              <div>
                <h2 className="font-bold text-xl">
                  {formatCurrencyVND(cart.datas.price * cart.quantity)}
                </h2>
              </div>
            </div>
            <div>
              <Button
                onClick={() => handleDeleteCart(cart.datas.id)}
                type="primary"
                className="bg-blue-600"
              >
                Xóa
              </Button>
            </div>
          </div>
        ))}
        <div className="w-2/3 bg-slate-300 p-3">
          Tổng tiền: {formatCurrencyVND(totalAmount())}
        </div>
      </div>
    </div>
  );
}
