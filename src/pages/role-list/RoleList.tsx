import './RoleList.css';
import { useState, useEffect } from 'react';
import TopSection from '../../components/list-top-section/ListTopSection';
import TableRow from '../../components/tablerow/TableRow';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import RoleService from '../../services/role/RoleService';
import RoleDTO from '../../dto/RoleDTO';
import { toast } from 'react-toastify';

function RoleList() {
  const [roles, setRoles] = useState([] as RoleDTO[]);
  const [roleService, setRoleService] = useState({} as RoleService);

  useEffect(() => {
    const userService = new RoleService();
    setRoleService(userService)
    userService.loadAll()
    .then(val => {
      setRoles(val);
    })
  }, [])

  const deleteRole = (roleId: number) => {
      roleService.delete(roleId).then(() => {
        setRoles(roles.filter(x => x.id !== roleId))
      }).catch(() => {
        toast.error("Er zitten gebruikers aan deze rol en kan daarom niet verwijderd worden!");
      });
    }
  
  const search = () => {
    console.log("search")
  }

  return (
    <div>
      <Breadcrumb/>
      <TopSection pageTitle={'Rollen'} buttonTitle={'Toevoegen'} navigationLink={'/rollen/wijzigen/0'} onClick={search}/>
        {roles.map(role => {
          return (
            <div key={role.id}>
              <TableRow title={role.name} subtitle="" onEditLink={"/rollen/wijzigen/" + role.id} onDeleteClick={() => deleteRole(role.id)} navigationLink={ "/rollen/" + role.id }/>
            </div>
          )
        })}
    </div>
  );
}

export default RoleList;
