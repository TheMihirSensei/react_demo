import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase.client";
import { IoAddSharp } from "react-icons/io5";

function Project() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const deleteProjectById = async (id) => {
    const { data } = await supabase.from("projects").delete().match({ id });
    console.log("data", data);
  };
  const fetchProjectList = async () => {
    let { data } = await supabase.from("projects").select(`
    id,
    project_name,
    project_description,
    due_date,
    employees:employees (
        first_name,
        last_name
    )
    `);
    setProjects(data);
  };
  useEffect(() => {
    fetchProjectList();
  }, []);

  return (
    <div>
      <div
        style={{
          width: "80%",
          display: "flex",

          margin: "1em auto",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: "2em" }}>Projects: </div>
        <span>
          <IoAddSharp
            style={{ fontSize: "2em" }}
            onClick={(e) => navigate("/project/add")}
          />
        </span>
      </div>

      <div className="container">
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Assign By</th>
              <th scope="col">Due Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {projects &&
              projects.map((project) => {
                return (
                  <tr>
                    <td>{project.id}</td>
                    <td>{project.project_name}</td>
                    <td>{project.project_description}</td>
                    <td>
                      {project.employees.first_name}{" "}
                      {project.employees.last_name}
                    </td>
                    <td>{project.due_date}</td>
                    <td className="d-flex justify-content-around">
                      {/* <button className="btn btn-success" >View</button> */}
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          navigate(`/project/${project.id}`);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          deleteProjectById(project.id);
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
    </div>
  );
}

export default Project;
