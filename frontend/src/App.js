import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./App.css";
import Search from "./search";

export default function App() {
  return (
    <div className="centered">
      <header>
        <div className="header-top">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <h1>Piece of Mind</h1>
          </Link>

          <nav
            style={{
              alignSelf: "center",
            }}
          >
            <Link to="/login">Login</Link>
          </nav>
        </div>
      </header>
      <hr
        style={{
          border: "0",
          height: "1px",
          backgroundImage:
            "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))",
        }}
      />
      <Outlet />
      <Search />
    </div>
  );
}

//export default App;
