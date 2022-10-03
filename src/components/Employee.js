import React, { useEffect, useState } from "react";
import supabase from "../supabase.client";
import { useNavigate } from "react-router-dom";
import { IoAddSharp } from "react-icons/io5";

function Employee() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  async function fetchEmployee() {
    const { data } = await supabase.from("employees").select();
    setEmployees(data);
    console.log("data", data);
  }

  async function deleteEmployeeById(id) {
    const { data } = await supabase.from("employees").delete().match({ id });
    setEmployees(data);
    console.log("data", data);
  }
  useEffect(() => {
    fetchEmployee();
  }, []);
  return (
    <div className="container">
      <div
        style={{
          width: "80%",
          display: "flex",

          margin: "1em auto",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: "2em" }}>Employees: </div>
        <IoAddSharp
          style={{ fontSize: "2em" }}
          onClick={() => navigate("/employee/add")}
        />
      </div>
      <table className="table table-striped table-dark">
        <thead className="thead-dark">
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Technology</th>
            <th scope="col">Age</th>
            <th scope="col">Company Name</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {employees &&
            employees.map((employee, index) => {
              return (
                <tr key={employee.id}>
                  <td>{employee.first_name}</td>
                  <td>{employee.last_name}</td>
                  <td>{employee.technology}</td>
                  <td>{employee.age}</td>
                  <td>{employee.company_name}</td>
                  <td className="d-flex justify-content-around">
                    {/* <button className="btn btn-success" >View</button> */}
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        navigate(`/employee/${employee.id}`);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteEmployeeById(employee.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Employee;
