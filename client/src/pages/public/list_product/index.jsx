import React, { useEffect, useState } from "react";
import { Input } from "antd";
const { Search } = Input;
import { Button, Select } from "antd";
import Navbar from "../../../components/user/navbar";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instance from "../../../api/axios";

export default function List_Product() {
  const [carts, setCarts] = useState([]);
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("esc");
  const [search, setSearch] = useState("");

  // Nội dung của toast message
  const notify = () =>
    toast.warning("Đã thêm sản phẩm vào giỏ hàng.", {
      position: "top-center",
    });

  const handleChange = (value) => {
    setSort(value);
  };

  const onSearch = (value) => setSearch(value);

  // Lấy thông tin tất cả cart trong database
  const getAllCart = async () => {
    try {
      const response = await instance.get("carts");
      setCarts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Lấy thông tin tất cả sản phẩm trong database
  const getAllProduct = async () => {
    try {
      const response = await instance.get(
        `products?_sort=${sort}&_order=desc&productName_like=${search}&_page=1&_limit=5`
      );
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCart();
  }, []);

  useEffect(() => {
    getAllProduct();
  }, [sort, search]);

  // Xử lý chức năng thêm sản phẩm vào giỏ hàng
  const handleAddToCart = async (id) => {
    try {
      // Tìm giỏ hàng của người dùng, bạn cần thay đổi userId tương ứng với người dùng hiện tại
      const userId = 13; // Mặc định user đang đăng nhập có id = 13

      const userCart = carts.find((cart) => cart.userId === userId); // Tìm kiếm id của user trong giỏ hang

      if (userCart) {
        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        const existingProduct = userCart.cartDetails.find(
          (item) => item.productId === id
        );

        if (existingProduct) {
          // Nếu sản phẩm đã tồn tại, tăng số lượng
          existingProduct.quantity += 1;
        } else {
          // Nếu sản phẩm chưa tồn tại, thêm sản phẩm vào giỏ hàng
          userCart.cartDetails.push({
            productId: id,
            quantity: 1,
          });
        }

        // Cập nhật giỏ hàng trên server
        await instance.put(`carts/${userCart.id}`, userCart);
        notify();
      } else {
        // Nếu người dùng chưa có giỏ hàng, tạo giỏ hàng mới.
        const newCart = {
          userId: userId,
          cartDetails: [],
        };

        // Gửi yêu cầu POST để tạo giỏ hàng mới
        const response = await instance.post("carts", newCart);

        // Cập nhật danh sách giỏ hàng trên client
        setCarts([...carts, response.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <h1 className="text-center p-4 text-2xl font-bold">List product</h1>
      <div className="flex justify-center gap-3">
        <Select
          defaultValue="esc"
          style={{
            width: 150,
          }}
          onChange={handleChange}
          options={[
            {
              value: "esc",
              label: "Giá tăng dần",
            },
            {
              value: "desc",
              label: "Giá giảm dần",
            },
          ]}
        />
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{
            width: 200,
          }}
        />
      </div>
      <div className="flex gap-3 m-6 justify-center items-center flex-wrap">
        {products.map((pro) => (
          <div className="flex flex-col w-64 border" key={pro.id}>
            <Link to={`/description/${pro.id}`}>
              <img className="w-64 h-60" src={pro.image} alt="" />
            </Link>
            <div className="text-center p-3">
              <h2 className="p-2 font-bold">{pro.productName}</h2>
              <div className="p-2">{pro.price}</div>
              <Button
                onClick={() => handleAddToCart(pro.id)}
                type="primary"
                className="bg-blue-500"
              >
                Add to cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
