import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import {
  Container,
  Navbar,
  NavbarBrand,
  NavLink,
  Button,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
import { authService } from "./util/auth";
import Search from "./search";

export default function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    let subscription = authService.currentUser.subscribe((user) => {
      setUser(user);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  const logout = () => {
    authService.logout();
    navigate("/", { replace: true });
  };

<<<<<<< HEAD
  return (
    <div className="centered">
      <header>
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
          light
        >
          <Container>
            <NavbarBrand to="/" className="header-top">
              <h1>Piece of Mind</h1>
            </NavbarBrand>
            <ul className="navbar-nav flex-grow">
              <LinkContainer to="/">
                <NavLink className="text-dark" to="/">
                  Home
                </NavLink>
              </LinkContainer>
              {!user && (
                // if we are not logged in
                <div>
                  <LinkContainer to="/login">
                    <NavLink className="text-dark" to="/login">
                      Login
                    </NavLink>
                  </LinkContainer>
                </div>
              )}
              {user && (
                // if we are logged in
                <div>
                  <LinkContainer to="/testAuth">
                    <NavLink className="text-dark" to="/testAuth">
                      VIP Page
                    </NavLink>
                  </LinkContainer>
                </div>
              )}
            </ul>
            {user && (
              // if we are logged in
              <div>
                <Button onClick={logout} style={{ float: "right" }}>
                  Logout
                </Button>
              </div>
            )}
          </Container>
        </Navbar>
      </header>
      <hr
        style={{
          border: "0",
          height: "1px",
          backgroundImage:
            "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))",
        }}
      />
      <Search />
      <Outlet />
    </div>
  );
=======
    return (
        <div className='centered'>
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand to="/" className="header-top">
                            <h1>Piece of Mind</h1>
                        </NavbarBrand>
                        <ul className="navbar-nav flex-grow">
                            <LinkContainer to="/">
                                <NavLink className="text-dark" to="/">Home</NavLink>
                            </LinkContainer>
                            {!user &&
                                // if we are not logged in
                                <div className="d-flex">
                                    <LinkContainer to="/login">
                                        <NavLink className="text-dark" to="/login">Login</NavLink>
                                    </LinkContainer>
                                    <LinkContainer to="/register">
                                        <NavLink className="text-dark" to="/register">Register</NavLink>
                                    </LinkContainer>
                                </div>
                            }
                            {user &&
                                // if we are logged in
                                <div>
                                    <LinkContainer to="/testAuth">
                                        <NavLink className="text-dark" to="/testAuth">VIP Page</NavLink>
                                    </LinkContainer>
                                </div>
                            }
                        </ul>
                        {user &&
                            // if we are logged in
                            <div>
                                <Button onClick={logout} style={{ float: "right" }}>Logout</Button>
                            </div>
                        }
                    </Container>
                </Navbar>
            </header>
            <hr
              style={{
                border: "0",
                height: "1px",
                backgroundImage:
                  "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))",
              }}
            />
            <Search />
            <Outlet />
        </div>
    }
>>>>>>> c01d2c0cdd45236839548db08302819f83484095
}
