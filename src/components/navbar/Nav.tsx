import React from 'react';
import './Nav.css';
import { Link } from "react-router-dom";
import WURLogo from "../../assets/images/WUR_W_Logo.svg"
import Button from '../button/Button';
import jwt_decode from "jwt-decode";


function Nav() {

const logOut = () => {
  localStorage.removeItem("token");
}

const hasPermission = (permission:string) => {
  const token = localStorage.getItem("token");
  if(token === null) {
    return false;
  }

  const decodedToken:any = jwt_decode(token);
  const permissions :string[] = decodedToken.permissions;

  return permissions.find(x => x === permission) !== undefined
}

  return (
    <div className="navbar">
      <Link to="/">
        <span className="branding"><p className="branding-name">Jitai</p><img className="navbar-logo" src={WURLogo} alt="WUR-logo"/></span>
      </Link>
      <div className="nav-links">
        {
          hasPermission("GET_AREAS") && 
          <Link className="nav-link" to="/gebieden">
            <p>Gebieden</p>
          </Link>
        }
        {
          hasPermission("GET_LOCATIONS") &&
          <Link className="nav-link" to="/locaties">
            <p>Locaties</p>
          </Link>
        }
        {
          hasPermission("GET_FRANCHISES") &&
          <Link className="nav-link" to="/franchises">
            <p>Franchises</p>
          </Link>
        }
        {
          hasPermission("GET_GOALS") &&
          <Link className="nav-link" to="/doelstellingen">
            <p>Doelstellingen</p>
          </Link>  
        }
        {
          hasPermission("GET_USERS") &&
          <Link className="nav-link" to="/gebruikers">
            <p>Gebruikers</p>
          </Link>
        }
        {
          hasPermission("GET_ROLES") &&
          <Link className="nav-link" to="/rollen">
            <p>Rollen</p>
          </Link>
        }
      </div>
      <Button title="Log uit" disabled={false} onClick={logOut} />
    </div>
  );
}

export default Nav;
