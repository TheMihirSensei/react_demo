import React, { useEffect, useState } from "react";
import { ImUndo2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase.client";
function CreateProject() {
  const navigate = useNavigate();
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
    console.log("data", data);
    if (data) {
      console.log("data", data);
      setProject({ ...project, employee_id: data[0].id });
      setEmployeeList(data);
    } else {
      alert("Not Able to fetch EMployee list");
    }
  };

  useEffect(() => {
    fetchEmployeeList();
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from("projects").insert([project]);
    console.log(".. project", project);
    if (data) {
      alert("Added Successfully");
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
      <h3 style={{ margin: "1em 40%", fontWeight: "bold" }}>Create Project</h3>

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
            >
              {employeeList &&
                employeeList.map((employee) => {
                  return (
                    <option key={employee.id} value={employee.id}>
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

export default CreateProject;
