import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NotFound from "./Component/NotFound";
import LoginPage from "./pages/LoginPage";
import AdminFerstPage from "./pages/AdminFerstPage";
import AddNewUserPage from "./pages/AddNewUserPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="Admin" element={<AdminFerstPage />} />
        <Route path="Admin/AddNewUser" element={<AddNewUserPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
