import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import SubmitButton from '../../components/submit-button/SubmitButton';
import './Login.css';
import LoginDTO from '../../dto/LoginDTO';
import LoginService from '../../services/login/LoginService';

function Login() {

  const [login, setLogin] = useState({} as LoginDTO);
  const [service, setService] = useState({} as LoginService);
  const [errors, setErrors] = useState({} as any);

  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    await service.login(login)
      .then(() => {
        toast.success("Ingelogd");
        navigate("/");
      }).catch(err => {
        setErrors(err.response.data);
        return;
      });
    
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setLogin({...login, [e.target.id]: e.target.value})
  }

  return (
    <div className="login">
      <h1>Jitai</h1>
      <form onSubmit={onSubmit}>
        <Input placeholderText={'Gebruikersnaam'} inputName={'username'} inputType={'text'} inputLabel={'Gebruikersnaam'} onChange={handleChange} errors={errors.username}/>
        <br/>
        <Input placeholderText={'Wachtwoord'} inputName={'password'} inputType={'password'} inputLabel={'Wachtwoord'} onChange={handleChange} errors={errors.password}/>
        <div className="login-button">
          <SubmitButton value={"Login"}/>
        </div>
      </form>
    </div>
  );
}

export default Login;
