import './UserEdit.css';
import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Input from '../../components/input/Input';
import SubmitButton from '../../components/submit-button/SubmitButton';
import UserDTO from '../../dto/UserDTO';
import UserService from '../../services/user/UserService';
import Select from '../../components/select/Select';
import Option from '../../components/select/Option';
import RoleDTO from '../../dto/RoleDTO';
import RoleService from '../../services/role/RoleService';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';

const UserEdit : React.FC = () => {
  const [user, setUser] = useState({} as UserDTO);
  const [service, setService] = useState({} as UserService);
  const [errors, setErrors] = useState({} as any);
  const [allRoles, setAllRoles] = useState([] as RoleDTO[]);
  const params = useParams();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if(!isEdit) {
      await service.create(user)
        .then(() => {
          toast.success("Gebruiker aangemaakt!");
          navigate("/gebruikers");
        }).catch(err => {
          setErrors(err.response.data);
          return;
        });
    } else {
      await service.update(user)
        .then(response => {
          toast.success("Gebruiker bijgewerkt!");
          navigate("/gebruikers");
        }).catch(err => {
          setErrors(err.response.data);
          return;
        });
    }
  }

  useEffect(() => {
    const roleService = new RoleService();
    const userService = new UserService();
    setService(userService);
    roleService
    .loadAll()
    .then(roles => {
      setAllRoles(roles);
    })
    if(!isEdit) {
      setUser(new UserDTO())
    } else {
      userService.loadOne(id)
      .then(val => {
        setUser(val);
      })
    }
  }, [])

  const id: number = Number.parseInt(params.id === undefined ? "0" : params!.id);
  const isEdit: boolean = id !== 0;

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [e.target.id]: e.target.value})
  }

  const updateRole = (id:string) => {
   setUser({...user, "roleId": Number(id)});
  }

  if(!user || !user.role) {
    return <div></div>
  }

  return (
    <div>
      <Breadcrumb lastItem={user.username}/>
      <h2>{isEdit ? user.username + " Wijzigen" : "Gebruiker aanmaken"}</h2>
      <form onSubmit={onSubmit}>
        <Input placeholderText={'Naam'} inputName={'username'} inputType={'text'} inputLabel={'Naam'} onChange={handleChange} value={user.username} errors={errors.name}/>
        <br/>
        <Input placeholderText={'Email'} inputName={'email'} inputType={'text'} inputLabel={'Email'} onChange={handleChange} value={user.email} errors={errors.name}/>
        <br/>
        <Input placeholderText={'Wachtwoord'} inputName={'password'} inputType={'password'} inputLabel={'Wachtwoord'} onChange={handleChange} value={user.password} errors={errors.name}/>
        <br/>
        <Select placeholderText={'Kies een rol'} value={user.roleId.toString()} selectName={'id'} selectLabel={'Rol'} onChange={updateRole} options={allRoles.map(x => {
            let option = new Option();
            option.id = x.id.toString();
            option.name = x.name;

            return option;
          })} />
        <SubmitButton value={isEdit ? "Opslaan" : "Voeg toe"}/>
      </form>
    </div>
  );
}

export default UserEdit
