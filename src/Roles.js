import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Roles() {
  const [roles, setRoles] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [editRolesId, setEditRolesId] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  //------------------------------------------------ROLES GET API-----------------------------------------------------
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7014/api/Roles/pagination?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      setRoles(response.data);
      setFilteredRoles(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePreviousPage = () => {
    setPageNumber(pageNumber - 1);
  };

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  useEffect(() => {
    fetchData();
  }, [pageNumber, pageSize]);
  //------------------------------------------------ROLES POST API-----------------------------------------------------
  const handleAddRoles = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://localhost:7014/api/Roles", {
        roleName: roleName,
      });
      fetchData();
      setRoleName("");
      console.log("Role added successfully:", response.data);
    } catch (error) {
      console.error("Error at adding Role:", error);
    }
  };

  const handleEdit = (id) => {
    const roleToEdit = roles.find((role) => role.roleId === id);
    setRoleName(roleToEdit.roleName);
    setEditRolesId(id);
  };
  //------------------------------------------------ROLES PUT API-----------------------------------------------------
  const handleUpdateRoles = async () => {
    try {
      const response = await axios.put(
        `https://localhost:7014/api/Roles/${editRolesId}`,
        {
          roleName: roleName,
           
        }
      );
      fetchData();
      console.log("Role updated successfully:", response.data);
      setRoleName("");
      setEditRolesId(null);
    } catch (error) {
      console.error("Error at updating role:", error);
    }
  };
  //------------------------------------------------ROLES DELETE API-----------------------------------------------------
  const handleDelete = async (roleId) => {
    try {
      const confirmDeletion = window.confirm(
        "Are you sure you want to delete this role?"
      );
      if (!confirmDeletion) {
        return;
      }

      const response = await axios.delete(
        `https://localhost:7014/api/Roles/${roleId}`
      );
      fetchData();
      console.log("Role deleted successfully:", response.data);
    } catch (error) {
      console.error("Error at deleting role:", error);
    }
  };

  return (
    <div className="container my-5 mx-auto">
      <h1 className="text-center">Roles</h1>
      <form onSubmit={handleAddRoles}>
        <div className="mb-3">
          <label htmlFor="roleName" className="form-label">
            Role Name
          </label>
          <input
            type="text"
            className="form-control"
            id="roleName"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Role
        </button>
      </form>

      <table className="table table-bordered table-responsive-md table-dark text-center m-2">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>

            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredRoles.map((role) => (
            <tr key={role.roleId}>
              <td>{role.roleId}</td>
              <td>{role.roleName}</td>

              <td>
                <button
                  className="btn btn-info m-1"
                  onClick={() => handleEdit(role.roleId)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger m-1"
                  onClick={() => handleDelete(role.roleId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="btn btn-success"
        onClick={handlePreviousPage}
        disabled={pageNumber === 1}
      >
        Previous
      </button>
      <button className="btn btn-success">{pageNumber}</button>
      <button className="btn btn-success" onClick={handleNextPage}>
        Next
      </button>
      {/* Edit form */}
      {editRolesId && (
        <div className="mb-3">
          <form onSubmit={handleUpdateRoles}>
            <div className="mb-3">
              <label htmlFor="editRoleName" className="form-label">
                Edit Role Name
              </label>
              <input
                type="text"
                className="form-control"
                id="editRoleName"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update Role
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Roles;
