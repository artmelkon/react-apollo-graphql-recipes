import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

import SignOut from "../Auth/SignOut";
// import { auth } from '../../FireBase/FireBase.utils'; // temporary off for google OAouth
import Logo from "../../assets/img/gp-color-logo.png";

const Navbar = ({ session }) => (
  <nav className="header">
    {session && session.getCurrentUser ? (
      <NavbarAuth session={session} />
    ) : (
      <NavbarUnAuth />
    )}
  </nav>
);

const NavbarAuth = ({ session }) => (
  <Fragment>
    <ul>
      <li>
        <NavLink className="container__logo" to="/" exact>
          <img src={Logo} className="container__logo logo" alt="GP Color" />
        </NavLink>
      </li>
      <li>
        <NavLink className="nav__link" to="/search">
          Search
        </NavLink>
      </li>
      <li>
        <NavLink className="nav__link" to="/recipe/add">
          Add Recipe
        </NavLink>
      </li>
      <li>
        <NavLink className="nav__link" to="/profile">
          Profile
        </NavLink>
      </li>
      <li>
        <SignOut />
      </li>
    </ul>
    <h4>
      Welcome,&nbsp;
      <b>
        {session.getCurrentUser.username.replace(/\b\w/g, (l) =>
          l.toUpperCase()
        )}
      </b>
    </h4>
  </Fragment>
);

const NavbarUnAuth = () => (
  <ul>
    <li>
      <NavLink className="container__logo" to="/" exact>
        <img src={Logo} className="container__logo logo" alt="GP Color" />
      </NavLink>
    </li>
    <li>
      <NavLink className="nav__link" to="/search">
        Seaerch
      </NavLink>
    </li>
    <li>
      <NavLink className="nav__link" to="/signin">
        Sign In
      </NavLink>
    </li>
    <li>
      <NavLink className="nav__link" to="/signup">
        Sign Up
      </NavLink>
    </li>
  </ul>
);

export default Navbar;
