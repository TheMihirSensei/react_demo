import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Employee from "./components/Employee";
import EditEmployee from "./components/EditEmployee";
import CreateEmployee from "./components/CreateEmployee";
import Project from "./components/Project";
import CreateProject from "./components/CreateProject";
import EditProject from "./components/EditProject";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/employee/:id" element={<EditEmployee />} />
        <Route path="/employee/add" element={<CreateEmployee />} />
        <Route path="/project" element={<Project />} />
        <Route path="/project/add" element={<CreateProject />} />
        <Route path="/project/:id" element={<EditProject />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
