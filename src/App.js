import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import MaterialTable from "material-table";
import { CsvBuilder } from "filefy";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import EditClass from "./EditClass";
import ApproveClass from "./ApproveClass";
const empList = [
  {
    id: 1,
    name: "Neeraj",
    email: "neeraj@gmail.com",
    phone: 9876543210,
    age: 23,
    year: 2019,
  },
  {
    id: 2,
    name: "Raj",
    email: "raj@gmail.com",
    phone: 6678901234,
    age: 17,
    year: 2020,
  },
  {
    id: 3,
    name: "David",
    email: "david342@gmail.com",
    phone: 6312345678,
    age: 34,
    year: 2019,
  },
  {
    id: 4,
    name: "Vikas",
    email: "vikas75@gmail.com",
    phone: 9787654321,
    age: 20,
    year: 2021,
  },
  {
    id: 1,
    name: "Neeraj",
    email: "neeraj@gmail.com",
    phone: 9876543210,
    age: 23,
    year: 2019,
  },
  {
    id: 2,
    name: "Raj",
    email: "raj@gmail.com",
    phone: 6678901234,
    age: 17,
    year: 2020,
  },
  {
    id: 3,
    name: "David",
    email: "david342@gmail.com",
    phone: 6312345678,
    age: 34,
    year: 2019,
  },
  {
    id: 4,
    name: "Vikas",
    email: "vikas75@gmail.com",
    phone: 9787654321,
    age: 20,
    year: 2021,
  },
  {
    id: 1,
    name: "Neeraj",
    email: "neeraj@gmail.com",
    phone: 9876543210,
    age: 23,
    year: 2019,
  },
  {
    id: 2,
    name: "Raj",
    email: "raj@gmail.com",
    phone: 6678901234,
    age: 17,
    year: 2020,
  },
  {
    id: 3,
    name: "David",
    email: "david342@gmail.com",
    phone: 6312345678,
    age: 34,
    year: 2019,
  },
  {
    id: 4,
    name: "Vikas",
    email: "vikas75@gmail.com",
    phone: 9787654321,
    age: 20,
    year: 2021,
  },
];

function App() {
  return (
    <div className="App">
      <div>Demo for Edit class and Approveclass</div>
      <Router>
        <Switch>
          <Route path="/editClass">
            <EditClass></EditClass>
          </Route>
          <Route path="/approveClass">
            <ApproveClass />
          </Route>
          {/* <Route path="/">
          <Home />
        </Route> */}
        </Switch>

        <ul>
          <li>
            {" "}
            <Link to="/editClass">Edit Class</Link>{" "}
          </li>
          <li>
            {" "}
            <Link to="/approveClass">Approve class</Link>{" "}
          </li>
        </ul>
      </Router>
      {/* <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => EditClass} />
          <Route exact path="/" render={() => ApproveClass} />
        </Switch>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
