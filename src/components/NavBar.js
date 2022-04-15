import React, { useContext } from "react";
// import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import BookContext from "../pages/book-context";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const bookCtx = useContext(BookContext);

  return (
    <>
      <nav
        className={`navbar navbar-dark  justify-content-around position-sticky ${styles.navbar}`}
      >
        <NavLink
          className={(navData) => (navData.isActive ? styles.active : "")}
          to="/home"
        >
          <p>
            <strong>Book Finder</strong>
          </p>
        </NavLink>

        {/* <Link to="/my-list">
          MyList <strong>({bookCtx.mylist.length})</strong>
        </Link> */}

        <NavLink
          className={(navData) => (navData.isActive ? styles.active : "")}
          to="/my-list"
        >
          <p className="position-relative">
            MyList
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
              {bookCtx.mylist.length}
              <span className="visually-hidden">my list</span>
            </span>
          </p>
        </NavLink>
      </nav>
    </>
  );
};

export default NavBar;
