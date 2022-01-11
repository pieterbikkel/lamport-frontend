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
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import RoleService from '../../services/role/RoleService';
import GoalDTO from '../../dto/GoalDTO';
import GoalService from '../../services/goal/GoalService';

const UserEdit : React.FC = () => {
  const [user, setUser] = useState({} as UserDTO);
  const [service, setService] = useState({} as UserService);
  const [errors, setErrors] = useState({} as any);
  const [allRoles, setAllRoles] = useState([] as RoleDTO[]);
  const [goals, setGoals] = useState([] as GoalDTO[]);
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

  useEffect(() => {
    const goalService = new GoalService();

    goalService
      .loadAll()
      .then(goals => {
        setGoals(goals);
      })
  }, [])

  const id: number = Number.parseInt(params.id === undefined ? "0" : params!.id);
  const isEdit: boolean = id !== 0;

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [e.target.id]: e.target.value})
  }

  const changeSelectedGoal = (id:string) => {
    setUser({...user, "goalId": Number(id)});
  }

  if(!goals || !user || !user.linkedGoal) {
    return null;
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
      <form className='user-edit-form' onSubmit={onSubmit}>
        <Input placeholderText={'Naam'} inputName={'username'} inputType={'text'} inputLabel={'Naam'} onChange={handleChange} value={user.username} errors={errors.username}/>
        <br/>
        <Input placeholderText={'Email'} inputName={'email'} inputType={'text'} inputLabel={'Email'} onChange={handleChange} value={user.email} errors={errors.email}/>
        <br/>
        <Input placeholderText={'Wachtwoord'} inputName={'password'} inputType={'password'} inputLabel={'Wachtwoord'} onChange={handleChange} value={user.password} errors={errors.password}/>
        <br/>
        <Select placeholderText={'Kies een rol'} value={user.roleId.toString()} selectName={'id'} selectLabel={'Rol'} onChange={updateRole} options={allRoles.map(x => {
          let option = new Option();
          option.id = x.id.toString();
          option.name = x.name;

          return option;
        })} />
        <br/>
        <Select 
          placeholderText={'Kies een Doelstelling'} 
          selectName={'new-goal'} 
          onChange={changeSelectedGoal} 
          selectLabel={'Voeg doelstelling toe'} 
          value={user.goalId.toString()}
          options={goals.map(goal => {
            let option = new Option();
            option.id = goal.id.toString();
            option.name = goal.name;

            return option;
          })
          }
        />
        <br/>
        <SubmitButton value={isEdit ? "Opslaan" : "Voeg toe"}/>
      </form>
    </div>
  );
}

export default UserEdit
