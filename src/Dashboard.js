import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roles, setRoles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
//-------------------------------------------------SEARCHING BAR  USING ROLES API----------------// 
  const fetchData = async () => {
    try {
      // Fetch data for roles
      const rolesResponse = await axios.get("https://localhost:7014/api/Roles");
      setRoles(rolesResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7014/api/Roles/RoleName?RoleName=${searchQuery}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-5">
        <i className="bi bi-bootstrap text-primary"></i> Dashboard
      </h1>

      <div className="row mb-3">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Display search results in a Bootstrap table */}
      <div>
        <h3>Search Results</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Role Name</th>
              <th>Name</th>
              <th>isActive</th>
              <th>Created At</th>
              <th>Updated At</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {searchResults.map((role) => (
              <tr key={role.roleId}>
                <td>{role.roleId}</td>
                <td>{role.roleName}</td>
                <td>{role.isActive ? "true" : "false"}</td>
                <td>{role.createdAt}</td>
                <td>{role.updatedAt}</td>
                {/* Add more columns as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dashboard Cards */}
      <div className="row">
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-bootstrap text-light"></i> Total Roles
              </h5>
              <p className="card-text">{roles.length}</p>
            </div>
          </div>
        </div>
        {/* Add more dashboard cards as needed */}
      </div>
    </div>
  );
};

export default Dashboard;
