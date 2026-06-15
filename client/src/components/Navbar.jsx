import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";


function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link className="link" to={"/doramas"}>
                  <h6>Doramas</h6>
                </Link>
              </li>
              <li>
                <Link className="link" to={"/movies"}>
                  <h6>Movies</h6>
                </Link>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Reseñas</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
                <Link className="link" to={"/doramas"}>
                  <h6>Doramas</h6>
                </Link>
            </li>
            <li>
                <Link className="link" to={"/movies"}>
                  <h6>Movies</h6>
                </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <h3>{currentUser?.username}</h3>
          <a className="btn" onClick={logout}>Logout</a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
