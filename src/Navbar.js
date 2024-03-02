// NavBar.js
import React from "react";
import { Link } from "react-router-dom";


const NavBar = () => {
  const navStyle = {
    background: "linear-gradient(to right, #343a40, #6c757d)", // Bootstrap dark theme
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    color: "white",
  };

  const linkStyle = {
    textDecoration: "none",
    color:"white",
    fontSize: "18px",
    margin: "0 10px",
  };

  const logoStyle = {
    fontWeight: "bold",
    fontSize: "24px",
    textDecoration: "none",
    color: "white",
  };

  return (
    <nav className="navbar navbar-expand-lg" style={navStyle}>
      <Link to="/Dashboard" className="navbar-brand" style={logoStyle}>
        Employee Hub
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/Dashboard" className="nav-link" style={linkStyle}>
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/BrandList" className="nav-link" style={linkStyle}>
              Employees
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/roles" className="nav-link" style={linkStyle}>
              Roles
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link" style={linkStyle}>
              Department
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
