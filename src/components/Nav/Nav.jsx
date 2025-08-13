import React from "react";
import { Link } from "react-router-dom";

import "./Nav.css";

export function Nav() {
  return (
    <nav className="nav-tabs">
      <Link to="/" className="nav-tab">
        <h3>now</h3>
      </Link>
      <Link to="/favs" className="nav-tab">
        <h3>favs</h3>
      </Link>
      <Link to="/schedule" className="nav-tab">
        <h3>schedule</h3>
      </Link>
      <Link to="/events" className="nav-tab">
        <h3>events</h3>
      </Link>
    </nav>
  );
}
