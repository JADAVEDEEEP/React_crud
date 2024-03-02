import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BrandList.css";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [borderColors, setBorderColors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("https://localhost:7014/api/Employees")
      .then((response) => {
        setEmployees(response.data);
        const employeeBorderColors = response.data.map(() => getRandomColor());
        setBorderColors((prevColors) => [
          ...prevColors,
          ...employeeBorderColors,
        ]);
      })
      .catch((error) => {
        console.error("Error fetching employees data:", error);
      });
  }, []);

  useEffect(() => {
    //---------------------------------------FRONTEND SEARCH USING EMPLOYEES GET API---------------------------------//
    const filtered = employees.filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.id.toString().includes(searchTerm) ||
        employee.salary.toString().includes(searchTerm)
    );
    setFilteredEmployees(filtered);
  }, [searchTerm, employees]);

  const getRandomColor = () => {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;
  };

  return (
    <div className="container mt-4">
      <h2>Employees</h2>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by Name, ID, or Salary"
          className="form-control"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Salary</th>
            <th>Department ID</th>
            <th>Role ID</th>
            <th>Department Name</th>
            <th>Role Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee, index) => (
            <tr key={employee.id}>
              <td
                className="role-cell"
                style={{ borderColor: borderColors[index] }}
              >
                {employee.id}
              </td>
              <td
                className="role-cell"
                style={{ borderColor: borderColors[index] }}
              >
                {employee.firstName}
              </td>
              <td
                className="role-cell"
                style={{ borderColor: borderColors[index] }}
              >
                {employee.lastName}
              </td>
              <td
                className="role-cell"
                style={{ borderColor: borderColors[index] }}
              >
                {employee.salary}
              </td>
              <td
                className="role-cell"
                style={{ borderColor: borderColors[index] }}
              >
                {employee.departmentId}
              </td>
              <td
                className="role-cell"
                style={{ borderColor: borderColors[index] }}
              >
                {employee.roleId}
              </td>
              <td
                className="role-cell"
                style={{ borderColor: borderColors[index] }}
              >
                {employee.departmentName}
              </td>
              <td
                className="role-cell"
                style={{ borderColor: borderColors[index] }}
              >
                {employee.roleName}
              </td>
             

              {/* Action buttons */}
              <td>
                <button className="btn btn-primary mx-2">Edit</button>
                <button className="btn btn-danger mx-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;
