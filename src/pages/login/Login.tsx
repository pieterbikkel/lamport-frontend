import Input from '../../components/input/Input';
import { useState, FormEvent } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import SubmitButton from '../../components/submit-button/SubmitButton';
import './Login.css';
import LoginDTO from '../../dto/LoginDTO';
import LoginService from '../../services/login/LoginService';

function Login() {

  const [login, setLogin] = useState({} as LoginDTO);
  const [errors, setErrors] = useState({} as any);

  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    await new LoginService().login(login)
      .then((request:any) => request.data)
      .then((data:any) => {
        toast.success("U bent succesvol ingelogd");
        localStorage.setItem("token", data.token)
        navigate("/");
      }).catch(err => {
        setErrors(err.response.data);
        return;
      })
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setLogin({...login, [e.target.id]: e.target.value})
  }

  return (
    <div className="login">
      <h1>Jitai</h1>
      <form onSubmit={onSubmit}>
        <Input placeholderText={'Gebruikersnaam'} inputName={'username'} inputType={'text'} inputLabel={'Gebruikersnaam'} onChange={handleChange} value={login.username} errors={[]}/>
        <br/>
        <Input placeholderText={'Wachtwoord'} inputName={'password'} inputType={'password'} inputLabel={'Wachtwoord'} onChange={handleChange} value={login.password} errors={[]}/>
        <div className="login-button">
          <SubmitButton value={"Login"}/>
        </div>
      </form>
    </div>
  );
}

export default Login;
