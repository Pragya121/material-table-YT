import React from "react";
import { Nav } from "react-bootstrap";

import { withRouter } from "react-router";
import "./App.css";

const Side = (props) => {
  return (
    <>
      <Nav className="col-md-12  .d-block bg-light sidebar">
        <div className="offcanvas" align="left"></div>

        <Nav.Item>
          <Nav.Link href="/editClass">Edit classes</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/approveClass">Approve classes</Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};
const Sidebar = withRouter(Side);
export default Sidebar;
