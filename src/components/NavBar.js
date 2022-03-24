import React, { useContext } from "react";
import { Link } from "react-router-dom";
import BookContext from "../pages/book-context";

const NavBar = () => {
  const bookCtx = useContext(BookContext);

  return (
    <>
      <nav className="navbar navbar-dark  justify-content-around position-sticky">
        <Link to="/home">
          <h1>Book Finder</h1>
        </Link>

        {/* <Link to="/my-list">
          MyList <strong>({bookCtx.mylist.length})</strong>
        </Link> */}

        <Link to="/my-list">
          <p className=" position-relative">
            MyList
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
              {bookCtx.mylist.length}
              <span className="visually-hidden">my list</span>
            </span>
          </p>
        </Link>
      </nav>
    </>
  );
};

export default NavBar;
