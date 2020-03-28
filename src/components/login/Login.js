import React, {  Fragment } from "react";
import { Navbar, Button } from "react-bootstrap";

const Login = ({ handleAuth, handleLogOut, user }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Mapa del coronavirus</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          {user ? (
            <Fragment>
              {" "}
              <span>Welcome {user.displayName} </span>{" "}
              <Button variant="secondary" onClick={handleLogOut}>
                Sign out
              </Button>{" "}
            </Fragment>
          ) : (
            <Fragment>
              {" "}
              <Button variant="secondary" onClick={handleAuth}>
                {" "}
                Log in{" "}
              </Button>{" "}
            </Fragment>
          )}
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Login;
