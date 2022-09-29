import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase.client";
function CreateEmployee() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({});
  const handleOnChangeForm = (key, value) => {
    let emp = { ...employee };
    emp[key] = value;
    emp["created_at"] = new Date();
    emp["updatedAt"] = new Date();
    setEmployee(emp);
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(employee);
    const { data, error } = await supabase.from("employees").insert([employee]);
    if (data) {
      alert("Added Successfully");
      navigate("/employee");
    } else {
      alert(error);
    }
  };
  return (
    <div>
      <h3 style={{ margin: "1em 40%", fontWeight: "bold" }}>Create Employee</h3>
      <form
        style={{ marginLeft: "2em" }}
        className="d-flex flex-column"
        onSubmit={(e) => handleOnSubmit(e)}
      >
        <div className="form-group row">
          <label htmlFor="email" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="test@gmail.com"
              value={employee.email}
              onChange={(e) => handleOnChangeForm("email", e.target.value)}
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="first_name" className="col-sm-2 col-form-label">
            First Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="first_name"
              placeholder="Mihir"
              value={employee.first_name}
              onChange={(e) => handleOnChangeForm("first_name", e.target.value)}
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="last_name" className="col-sm-2 col-form-label">
            Last Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="last_name"
              placeholder="Sidhdhapura"
              value={employee.last_name}
              onChange={(e) => handleOnChangeForm("last_name", e.target.value)}
            />
          </div>
        </div>
        <fieldset className="form-group">
          <div className="row">
            <legend className="col-form-label col-sm-2 pt-0">Sex</legend>
            <div className="col-sm-10">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="male"
                  value="male"
                  onChange={(e) => handleOnChangeForm("sex", "male")}
                />

                <label className="form-check-label" htmlFor="male">
                  Male
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="gridRadios2"
                  value="female"
                  onChange={(e) => handleOnChangeForm("sex", "female")}
                />
                <label className="form-check-label" htmlFor="gridRadios2">
                  Female
                </label>
              </div>
            </div>
          </div>
        </fieldset>

        <div className="form-group row">
          <label htmlFor="comp_name" className="col-sm-2 col-form-label">
            Company Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="comp_name"
              placeholder="ITCODEHELP"
              value={employee.company_name}
              onChange={(e) =>
                handleOnChangeForm("company_name", e.target.value)
              }
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="age" className="col-sm-2 col-form-label">
            Age
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="age"
              value={employee.age}
              onChange={(e) =>
                handleOnChangeForm("age", parseInt(e.target.value))
              }
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="cont_num" className="col-sm-2 col-form-label">
            Contact Number
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="cont_num"
              placeholder="90123654871"
              value={employee.contact_no}
              onChange={(e) => handleOnChangeForm("contact_no", e.target.value)}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="techlogy" className="col-sm-2 col-form-label">
            Technology
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="technology"
              placeholder="NodeJS"
              value={employee.technology}
              onChange={(e) => handleOnChangeForm("technology", e.target.value)}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="exp" className="col-sm-2 col-form-label">
            Experience
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="exp"
              placeholder="24"
              value={employee.experience}
              onChange={(e) => handleOnChangeForm("experience", e.target.value)}
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="salary" className="col-sm-2 col-form-label">
            Salary
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="salary"
              value={employee.salary}
              onChange={(e) =>
                handleOnChangeForm("salary", parseFloat(e.target.value))
              }
            />
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

export default CreateEmployee;
