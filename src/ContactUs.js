import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function ContactUs() {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [editingDepartmentId, setEditingDepartmentId] = useState(null);
  const [editDepartmentName, setEditDepartmentName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchData = async () => {
    try {
      const departmentsResponse = await axios.get(
        "https://localhost:7014/api/emp1"
      );
      setDepartments(departmentsResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddDepartments = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://localhost:7014/api/emp1", {
        departmentName: name,
      });

      fetchData();
      setName("");
      console.log("Department added successfully:", response.data);
    } catch (error) {
      console.error("Error at adding department:", error);
    }
  };

  const handleEditDepartment = (departmentId, departmentName) => {
    setEditingDepartmentId(departmentId);
    setEditDepartmentName(departmentName);
    setIsEditing(true);
    
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(
        `https://localhost:7014/api/emp1/${editingDepartmentId}`,
        {
          departmentName: editDepartmentName,
          departmentId:editingDepartmentId,
        }
      );

      fetchData();
      setEditingDepartmentId(null);
      setEditDepartmentName("");
      setIsEditing(false);
      isEditing(false);
      console.log("Department edited successfully:", response.data);
    } catch (error) {
      console.error("Error at saving edit:", error);
      console.log("Detailed error response:", error.response); // Log detailed error response
    }
  };

  const handleDelete = async (departmentId) => {
    try {
      const confirmDeletion = window.confirm(
        "Are you sure you want to delete this department?"
      );

      if (!confirmDeletion) {
        return;
      }

      const response = await axios.delete(
        `https://localhost:7014/api/emp1/${departmentId}`
      );

      fetchData();
      console.log("Department deleted successfully:", response.data);
    } catch (error) {
      console.error("Error at deleting department:", error);
    }
  };

  const handleSort = (order) => {
    setSortOrder(order);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sortedDepartments = [...departments].sort((a, b) => {
    const nameA = a.departmentName.toUpperCase();
    const nameB = b.departmentName.toUpperCase();

    if (nameA < nameB) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (nameA > nameB) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6 border">
          <div className="mb-3">
            <label htmlFor="sortOrder" className="form-label">
              Sort Order:
            </label>
            <div className="btn-group" role="group" aria-label="Sort buttons">
              <button
                type="button"
                className={`btn btn-link ${
                  sortOrder === "asc" ? "active" : ""
                }`}
                onClick={() => handleSort("asc")}
              >
                Asc
              </button>
              <button
                type="button"
                className={`btn btn-link ${
                  sortOrder === "desc" ? "active" : ""
                }`}
                onClick={() => handleSort("desc")}
              >
                Desc
              </button>
            </div>
          </div>

          <table className="table table-bordered border-primary text-center my-2">
            <thead className="table-dark">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedDepartments.map((department) => (
                <tr key={department.departmentId}>
                  <td>{department.departmentId}</td>
                  <td>
                    {editingDepartmentId === department.departmentId ? (
                      <input
                        type="text"
                        value={editDepartmentName}
                        onChange={(e) => setEditDepartmentName(e.target.value)}
                      />
                    ) : (
                      department.departmentName
              
                    )}
                  </td>
                  <td>
                    {editingDepartmentId === department.departmentId ? (
                      <button
                        className="btn btn-success m-1"
                        onClick={handleSaveEdit}
                        disabled={!editDepartmentName.trim()}
                      >
                        Save
                      </button>
                    ) : (
                      <>
                        <button
                          className="btn btn-info m-1"
                          onClick={() =>
                            handleEditDepartment(
                              department.departmentId,
                              department.departmentName
                            )
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger m-1"
                          onClick={() => handleDelete(department.departmentId)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-md-6 border">
          <h2>Add Department</h2>
          <form onSubmit={handleAddDepartments}>
            <div className="mb-3">
              <label htmlFor="departmentName" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="departmentName"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary ">
              Add Department
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
