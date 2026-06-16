import "./App.css";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Home from "./pages/Home";
import UserList from "./pages/UserList";
import User from "./pages/User";
import NewUser from "./pages/NewUser";
import Product from "./pages/Product";
import NewProduct from "./pages/NewProduct";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductList from "./pages/ProductList";
import { useSelector } from "react-redux";
import Transactions from "./pages/Transactions";
import CategoryList from "./pages/CategoryList";
import Category from "./pages/Category";
import NewCategory from "./pages/NewCategory";
import { ToastContainer } from "react-toastify";

function App() {
  const { isAdmin: admin } = useSelector((state) => state.user.currentUser);

  // const admin = false
  const currentPath = window.location.pathname;
  return (
    <BrowserRouter>
      {currentPath !== "/login" && <Topbar />}
      <div className="container">
        {currentPath !== "/login" && <Sidebar />}
        <Routes>
          <>
              <Route
                path="/"
                element={admin ? <Home /> : <Navigate to="/login" />}
              />
            
            <Route
              path="/users"
              element={admin ? <UserList /> : <Navigate to="/login" />}
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/user/:userId"
              element={admin ? <User /> : <Navigate to="/login" />}
            />
            <Route
              path="/NewUser"
              element={admin ? <NewUser /> : <Navigate to="/login" />}
            />
            <Route
              path="/products"
              element={admin ? <ProductList /> : <Navigate to="/login" />}
            />
            <Route
              path="/product/:productId"
              element={admin ? <Product /> : <Navigate to="/login" />}
            />
            <Route
              path="/newProduct"
              element={admin ? <NewProduct /> : <Navigate to="/login" />}
            />
            <Route
              path="/transactions"
              element={admin ? <Transactions /> : <Navigate to="/login" />}
            />
            <Route
              path="/categories"
              element={admin ? <CategoryList /> : <Navigate to="/login" />}
            />
            <Route
              path="/category/:catId"
              element={admin ? <Category /> : <Navigate to="/login" />}
            />
            <Route
              path="/NewCategory"
              element={admin ? <NewCategory /> : <Navigate to="/login" />}
            />
          </>
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
