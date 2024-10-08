import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NotFound from "./Component/NotFound";
import LoginPage from "./pages/LoginPage";
import AdminFerstPage from "./pages/AdminFerstPage";
import AddNewUserPage from "./pages/AddNewUserPage";
import ManageUserPage from "./pages/ManageUserPage";
import AddGroupPage from "./pages/AddGroupPage";
import AddPermission from "./Component/AddPermission";
import UserEditPage from "./pages/UserEditPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="Admin" element={<AdminFerstPage />} />
        <Route path="Admin/AddNewUser" element={<AddNewUserPage />} />
        <Route path="Admin/ManageUser" element={<ManageUserPage />} />
        <Route path="Admin/AddGroup" element={<AddGroupPage />} />
        <Route path="Admin/AddPermission" element={<AddPermission />} />
        <Route path="Admin/AddNewUser/edit/:userId" element={<UserEditPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
