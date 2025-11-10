import React from 'react'
 import{
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
 } from "react-router-dom";
 import Login from "./pages/auth/login.jsx";
//  import Authlayout from "./layouts/Authlayout"; 
 import SignUp from "./pages/auth/SignUp";
 import Home from "./pages/auth/Dashboard/Home";
 import Income from "./pages/auth/Dashboard/Income";
 import Expense from "./pages/auth/Dashboard/Expense";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signUp" exact element={<SignUp />} />
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/income" exact element={<Income />} />
          <Route path="/expense" exact element={<Expense />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

const Root = ()=>{
  //check if token exists in localstorage
  const isAuthenticated =!!localStorage.getItem("token");
  //redirect to dashboard if authenticated, otherwise to login
  return isAuthenticated  ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};