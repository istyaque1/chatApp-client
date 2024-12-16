import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { token } from "./utils/getLocalStorage";
import ForgetPassword from "./pages/ForgetPassword";

function App() {
  const AuthRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  const ProtectedRoute = ({ children }) => {
    return token ? <Navigate to="/chat" /> : children;
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
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
