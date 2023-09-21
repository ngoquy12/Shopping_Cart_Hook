import { Navigate, Outlet } from "react-router-dom";
import Header from "../../../components/admin/header/Header";
import Sidebar from "../../../components/admin/sidebar/Sidebar";

// Sử dụng function expression để định nghĩa hàm
const PrivateRouter = () => {
  const isLogin = true; // Dữ liệu láy từ local về để kiểm tra - Sau này dùng token
  return (
    <>
      {isLogin ? (
        <div className="flex">
          <Sidebar />
          <div className="flex flex-col w-full">
            <Header />
            <Outlet />
          </div>
        </div>
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  );
};

export default PrivateRouter;
