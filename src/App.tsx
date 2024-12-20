import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NotFound from "./Component/NotFound";
import LoginPage from "./pages/LoginPage";
import AdminFerstPage from "./pages/AdminFerstPage";
import AddNewUserPage from "./pages/AddNewUserPage";
import ManageUserPage from "./pages/ManageUserPage";
import AddGroupPage from "./pages/AddGroupPage";
import UserEditPage from "./pages/UserEditPage";
import SearchPage from "./pages/SearchPage";
import AddPermissionPage from "./pages/AddPermissionPage";
import Loader from "./Component/Loader";
import EditPermissionPage from "./pages/EditPermissionPage";
import EditGroupPage from "./pages/EditGroupPage";
import EditPermissionUserPage from "./pages/EditPermissionUserPage";
import JoinGroupList from "./pages/JoinGroupList";

function App() {
  const LoginPage = lazy(() => import("./pages/LoginPage"));
  const AdminFerstPage = lazy(() => import("./pages/AdminFerstPage"));
  const AddNewUserPage = lazy(() => import("./pages/AddNewUserPage"));
  const ManageUserPage = lazy(() => import("./pages/ManageUserPage"));
  const AddGroupPage = lazy(() => import("./pages/AddGroupPage"));
  const UserEditPage = lazy(() => import("./pages/UserEditPage"));
  const SearchPage = lazy(() => import("./pages/SearchPage"));
  const AddPermissionPage = lazy(() => import("./pages/AddPermissionPage"));

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="Admin" element={<AdminFerstPage />} />
          <Route path="Admin/AddNewUser" element={<AddNewUserPage />} />
          <Route path="Admin/ManageUser" element={<ManageUserPage />} />
          <Route path="Admin/AddGroup" element={<AddGroupPage />} />
          <Route path="Admin/AddPermission" element={<AddPermissionPage />} />
          <Route
            path="Admin/ManageUser/edit/:userIds"
            element={<UserEditPage />}
          />
           <Route
            path="Admin/editPermission/:Id"
            element={<EditPermissionPage />}
          />
          <Route path="Admin/EditPermissionUser/:Id" element={<EditPermissionUserPage />}/>
          <Route path="/Admin/Search" element={<SearchPage />}/>
          <Route path="/Admin/editGroup/:GroupId" element={<EditGroupPage />}/>
          <Route path="/Admin/JoinGroup/:Id" element={<JoinGroupList/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
