import { useState } from 'react';
import './Nav.css';
import { Link, useNavigate } from "react-router-dom";
import WURLogo from "../../assets/images/WUR_W_Logo.svg"
import Button from '../button/Button';
import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify';

function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}


function Nav() {

  const logOut = () => {
    localStorage.removeItem("token");
  }

  const forceUpdate = useForceUpdate();

  const navigate = useNavigate()

  const token = localStorage.getItem("token");

  const hasPermission = (permission: string) => {
    
    if(token === null) {
      return false;
    }

    const decodedToken:any = jwt_decode(token);
    const permissions :string[] = decodedToken.permissions;

    return permissions.find(x => x === permission) !== undefined
  }

  const [value, setValue] = useState("Username");

  const handleChange = (value: string) => {
    if (value === "account") {
      navigate("/gebruikers/1") // Todo: naar de juiste gebruiker pointen
    } else if (value === "uitloggen") {
      logOut()
      forceUpdate()
      navigate("/")
      toast.success("U bent succesvol uitgelogd");
    }
    setValue("username")
  }



  return (
    <div className="navbar">
      <Link to="/">
        <img className="navbar-logo" src={WURLogo} alt="WUR-logo"/>
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
        {
          hasPermission("GET_INTERVENTIONS") &&
          <Link className="nav-link" to="/interventies">
            <p>Interventies</p>
          </Link>
        }
      </div>
      {
        token &&
        <div className='nav-account-button'>
        <svg className='nav-person-icon' width="20" height="20" viewBox="0 0 32 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path className="person-icon" d="M3.77344 33.5156H28.6562C29.6068 33.5156 30.3555 33.3008 30.9023 32.8711C31.4492 32.4544 31.7227 31.875 31.7227 31.1328C31.7227 29.9349 31.3646 28.6849 30.6484 27.3828C29.9323 26.0677 28.8971 24.8372 27.543 23.6914C26.1888 22.5456 24.5547 21.6146 22.6406 20.8984C20.7396 20.1693 18.5977 19.8047 16.2148 19.8047C13.819 19.8047 11.6641 20.1693 9.75 20.8984C7.84896 21.6146 6.22135 22.5456 4.86719 23.6914C3.52604 24.8372 2.4974 26.0677 1.78125 27.3828C1.0651 28.6849 0.707031 29.9349 0.707031 31.1328C0.707031 31.875 0.980469 32.4544 1.52734 32.8711C2.07422 33.3008 2.82292 33.5156 3.77344 33.5156ZM16.2344 16.5039C17.5495 16.5039 18.7604 16.1458 19.8672 15.4297C20.987 14.7135 21.8854 13.7435 22.5625 12.5195C23.2396 11.2826 23.5781 9.89583 23.5781 8.35938C23.5781 6.86198 23.2396 5.52083 22.5625 4.33594C21.8854 3.13802 20.987 2.19401 19.8672 1.50391C18.7604 0.800781 17.5495 0.449219 16.2344 0.449219C14.9193 0.449219 13.7018 0.800781 12.582 1.50391C11.4622 2.20703 10.5638 3.16406 9.88672 4.375C9.20964 5.57292 8.8776 6.91406 8.89062 8.39844C8.89062 9.90885 9.22266 11.2826 9.88672 12.5195C10.5638 13.7435 11.4557 14.7135 12.5625 15.4297C13.6823 16.1458 14.9062 16.5039 16.2344 16.5039Z" fill="black"/>
        </svg>
        <select className='nav-dropdown' onChange={(e) => handleChange(e.target.value)} value={value} >
          <option value="username">Username</option> {/*Todo: username dynamisch maken */}
          <option value="account">Account</option>
          <option value="uitloggen">Uitloggen</option>
        </select>
      </div>
      }
      {
        token === null &&
        <Button title={"login"} onClick={() => navigate("/login")}/>
      }
    </div>
  );
}

export default Nav;
