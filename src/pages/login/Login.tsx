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
        if(err.response.status === 400) {
          //Errors from back-end are not empty, set them, else, it is an invalid login.
          if(Object.keys(err.response.data).length !== 0) {
            setErrors(err.response.data);
          } else {
            const newErrors = {} as any;
            newErrors.password = ["Deze combinatie van gebruikersnaam en wachtwoord is niet gevonden!"];
            setErrors(newErrors);
          }
        }
        return;
      })
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setLogin({...login, [e.target.id]: e.target.value})
  }

  return (
    <div className="login">
      <h1>Jitai</h1>
      <form className='login-form' onSubmit={onSubmit}>
        <Input placeholderText={'Gebruikersnaam'} inputName={'username'} inputType={'text'} inputLabel={'Gebruikersnaam'} onChange={handleChange} value={login.username} errors={errors.username}/>
        <br/>
        <div className='password-div'>
          <Input placeholderText={'Wachtwoord'} inputName={'password'} inputType={'password'} inputLabel={'Wachtwoord'} onChange={handleChange} value={login.password} errors={errors.password}/>
        </div>
        <div className="login-button">
          <SubmitButton value={"Login"}/>
        </div>
      </form>
    </div>
  );
}

export default Login;
