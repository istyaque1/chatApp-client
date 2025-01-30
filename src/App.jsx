import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import { Routes, Route, Navigate, replace } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import ForgetPassword from "./pages/ForgetPassword";
import Reset from "./pages/Reset";

function App() {
  const { token } = useSelector((state) => state?.user);

  const AuthRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" replace:true />;
  };

  const ProtectedRoute = ({ children }) => {
    return token ? <Navigate to="/chat" replace:true /> : children;
  };

  return (
    <>
      <Routes>
        <Route
          path="/chat"
          element={
            <AuthRoute>
              <Home />
            </AuthRoute>
          }
        />

        <Route
          path="/register"
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<HomePage />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
