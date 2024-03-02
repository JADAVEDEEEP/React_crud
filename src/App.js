// App.js

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./Navbar";
import Home from "./Home";
import Roles from "./Roles";
import BrandList from "./Employess";
import Dashboard from "./Dashboard";
import ContactUs from "./ContactUs";
import NoPageFound from "./NoPageFound";
 // Import the new SearchBar component

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/BrandList" element={<BrandList />} />
          <Route exact path="/roles" element={<Roles />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/contact" element={<ContactUs />} />
          <Route path="*" element={<NoPageFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
