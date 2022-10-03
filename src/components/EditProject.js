import React, { useState, useEffect } from "react";
import { ImUndo2 } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../supabase.client";

function EditProject() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [employeeList, setEmployeeList] = useState([]);
  const handleOnChangeForm = (key, value) => {
    let newProjectDetails = { ...project };
    newProjectDetails[key] = value;
    newProjectDetails["created_at"] = new Date();
    // newProjectDetails["updated_at"] = new Date();
    setProject(newProjectDetails);
  };

  const fetchEmployeeList = async () => {
    const { data, error } = await supabase
      .from("employees")
      .select(`id, first_name, last_name`);
    // console.log("data", data);
    if (data) {
      //   console.log("data", data);
      setProject({ ...project, employee_id: data[0].id });
      setEmployeeList(data);
    } else {
      alert("Not Able to fetch EMployee list");
    }
  };

  const fetchProject = async () => {
    console.log("id", id);
    let { data, error } = await supabase
      .from("projects")
      .select(
        `
        id,
        project_name,
        project_description,
        due_date,
        employees:employees (
            id,
            first_name,
            last_name)
        `
      )
      .eq("id", id);
    data = data[0];
    setProject({
      id: data.id,
      project_name: data.project_name,
      project_description: data.project_description,
      due_date: data.due_date,
      employee_id: data.employees.id,
    });

    await fetchEmployeeList();
    console.log("fetchProject, data", data);
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let { data, error } = await supabase
      .from("projects")
      .update(project)
      .match({ id });

    console.log(".. project", project);
    if (data) {
      alert("updated Successfully");
      navigate("/project");
    } else {
      console.log("error", error);
      alert(error);
    }
  };
  return (
    <div>
      <span>
        <ImUndo2
          style={{ fontSize: "2em" }}
          onClick={() => {
            navigate("/project");
          }}
        />
      </span>
      <h3 style={{ margin: "1em 40%", fontWeight: "bold" }}>Edit Project</h3>

      <form
        style={{ marginLeft: "2em" }}
        className="d-flex flex-column"
        onSubmit={(e) => handleOnSubmit(e)}
      >
        <div className="form-group row">
          <label htmlFor="project_name" className="col-sm-2 col-form-label">
            Title
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="project_name"
              placeholder="React Demo"
              value={project.project_name}
              onChange={(e) =>
                handleOnChangeForm("project_name", e.target.value)
              }
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="proejct_dec" className="col-sm-2 col-form-label">
            Description
          </label>
          <div className="col-sm-10">
            <textarea
              cols={20}
              rows={10}
              className="form-control"
              id="proejct_dec"
              placeholder="react demo is react CRUD basic operation"
              value={project.project_description}
              onChange={(e) =>
                handleOnChangeForm("project_description", e.target.value)
              }
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="due_date" className="col-sm-2 col-form-label">
            Due Date
          </label>
          <div className="col-sm-10">
            <input
              type="date"
              className="form-control"
              id="due_date"
              value={project.due_date}
              onChange={(e) => handleOnChangeForm("due_date", e.target.value)}
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="assign_by" className="col-sm-2 col-form-label">
            Assign To
          </label>
          <div className="col-sm-10">
            <select
              name="Assign By"
              id="assignBy"
              onChange={(e) =>
                handleOnChangeForm("employee_id", parseInt(e.target.value))
              }
              //   defaultValue={{ value: project.employee_id }}
            >
              {employeeList &&
                employeeList.map((employee) => {
                  let selected =
                    employee.id === project.employee_id ? "selected" : "";
                  return (
                    <option
                      key={employee.id}
                      value={employee.id}
                      selected={selected}
                    >
                      {employee.first_name} {employee.last_name}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>

        <div className="form-group row" style={{ marginTop: "1em" }}>
          <div className="col-sm-12">
            <button type="submit" className="btn btn-primary">
              ADD
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProject;
