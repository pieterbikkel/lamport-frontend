import './RoleEdit.css';
import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Input from '../../components/input/Input';
import SubmitButton from '../../components/submit-button/SubmitButton';
import RoleDTO from '../../dto/RoleDTO';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import RoleService from '../../services/role/RoleService';
import PermissionDTO from '../../dto/PermissionDTO';

const RoleEdit : React.FC = () => {
  const [role, setRole] = useState({} as RoleDTO);
  const [permissions, setPermissions] = useState([] as PermissionDTO[]);
  const [service, setService] = useState({} as RoleService);
  const [errors, setErrors] = useState({} as any);
  const params = useParams();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if(!isEdit) {
      await service.create(role)
        .then(() => {
          toast.success("Rol aangemaakt!");
          navigate("/rollen");
        }).catch(err => {
          setErrors(err.response.data);
          return;
        });
    } else {
      await service.update(role)
        .then(response => {
          toast.success("Rol bijgewerkt!");
          navigate("/rollen");
        }).catch(err => {
          setErrors(err.response.data);
          return;
        });
    }
  }

  useEffect(() => {
    const roleService = new RoleService();
    setService(roleService);
    roleService.loadPermissions().then(data => {
      setPermissions(data);
    });
    if(!isEdit) {
      setRole(new RoleDTO())
    } else {
      roleService.loadOne(id)
      .then(val => {
        setRole(val);
      })
    }
  }, [])

  const id: number = Number.parseInt(params.id === undefined ? "0" : params!.id);
  const isEdit: boolean = id !== 0;

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setRole({...role, [e.target.id]: e.target.value})
  }

  const changePermission = (key:string) => {
    if(role.allowedPermissions.find(x => x.key === key) === undefined) {
      role.allowedPermissions.push(permissions.find(x => x.key === key)!);
    } else {
      role.allowedPermissions = role.allowedPermissions.filter(x => x.key !== key);
    }

    setRole(Object.assign({}, role));
  }

  if(!role || !role.allowedPermissions || !permissions) {
    return <div></div>
  }

  return (
    <div>
      <Breadcrumb lastItem={role.name}/>
      <h2>{isEdit ? role.name + " Wijzigen" : "Rol aanmaken"}</h2>
      <form onSubmit={onSubmit}>
        <Input placeholderText={'Naam'} inputName={'name'} inputType={'text'} inputLabel={'Naam'} onChange={handleChange} value={role.name} errors={errors.name}/>
        <br/>
        <h4 className="input-label">Permissies</h4>
        {permissions.map(x => {
          return <div key={x.key} className="permission">
            <input 
              key={x.key} 
              type="checkbox" 
              onChange={() => changePermission(x.key)} 
              checked={role.allowedPermissions.find(y => y.key === x.key) !== undefined}
            />
            <p>{x.display}</p>
          </div>
        })}
        <SubmitButton value={isEdit ? "Opslaan" : "Voeg toe"}/>
      </form>
    </div>
  );
}

export default RoleEdit
