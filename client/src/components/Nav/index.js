import React from "react";

function Nav(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top mb-5" >
      <a className="navbar-brand ml-5" href="/">
        React-Multiverse
      </a>
      <div className="d-flex justify-content-end p-2 w-100 mr-5">
        <span className="navbar-text text-light" >
          Life Planets Discovered: {props.points}
        </span>
      </div>
    </nav>
  );
}

export default Nav;
