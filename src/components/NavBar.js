import React, { useContext } from "react";
import { Link } from "react-router-dom";
import BookContext from "../pages/book-context";

const NavBar = () => {
  const bookCtx = useContext(BookContext);

  return (
    <>
      <nav className="navbar navbar-dark  justify-content-around">
        <Link to="/home">
          <h1>Book Finder</h1>
        </Link>

        <Link to="/my-list">
          MyList <strong>({bookCtx.mylist.length})</strong>
        </Link>
      </nav>
    </>
  );
};

export default NavBar;
