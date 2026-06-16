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
import ProductList from "./pages/ProductList";
import Transactions from "./pages/Transactions";
import CategoryList from "./pages/CategoryList";
import Category from "./pages/Category";
import NewCategory from "./pages/NewCategory";
import { ToastContainer } from "react-toastify";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function AppContent() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const admin = currentUser?.isAdmin;

  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  useEffect(() => {
    if (isLoginPage && admin) {
      // If the user is already logged in and tries to access the login page, redirect to home
      <Navigate to="/" replace />;
    } else if (!isLoginPage && !admin) {
      // If the user is not logged in and tries to access any page other than login, redirect to login
      <Navigate to="/login" replace />;
    }
  }, [isLoginPage, admin]);

  return (
    <>
      {!isLoginPage && <Topbar />}

      <div className="container">
        {!isLoginPage && <Sidebar />}

        <Routes>
          <Route
            path="/"
            element={admin ? <Home /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/users"
            element={admin ? <UserList /> : <Navigate to="/login" replace />}
          />

          <Route path="/login" element={<Login />} />

          <Route
            path="/user/:userId"
            element={admin ? <User /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/newUser"
            element={admin ? <NewUser /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/products"
            element={admin ? <ProductList /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/product/:productId"
            element={admin ? <Product /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/newProduct"
            element={admin ? <NewProduct /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/transactions"
            element={
              admin ? <Transactions /> : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/categories"
            element={
              admin ? <CategoryList /> : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/category/:catId"
            element={admin ? <Category /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/newCategory"
            element={admin ? <NewCategory /> : <Navigate to="/login" replace />}
          />
        </Routes>

        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          closeOnClick={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
