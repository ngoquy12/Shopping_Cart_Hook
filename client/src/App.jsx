import { Route, Routes } from "react-router-dom";
import Home_Admin from "./pages/private/home-admin";
import Manager_Product from "./pages/private/manager-product/index";
import Manager_User from "./pages/private/manager-user";
import Manager_Category from "./pages/private/manager-category/index";
import PrivateRouter from "./pages/private/private-router/PrivateRouter";
import Home_User from "./pages/public/home";
import About from "./pages/public/about/index";
import Contact from "./pages/public/contact";
import Login from "./pages/public/login/index";
import Register from "./pages/public/register/index";
import List_Product from "./pages/public/list_product/index";
import Cart from "./pages/public/cart";
import Description from "./pages/public/description";

function App() {
  return (
    <>
      <Routes>
        {/* Public Router */}
        <Route path="/" element={<Home_User />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/list-product" element={<List_Product />} />
        <Route path="/description/:id" element={<Description />} />
        {/* Private router */}
        <Route path="/admin" element={<PrivateRouter />}>
          <Route index element={<Home_Admin />} />
          <Route path="manager-product" element={<Manager_Product />} />
          <Route path="manager-user" element={<Manager_User />} />
          <Route path="manager-category" element={<Manager_Category />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
