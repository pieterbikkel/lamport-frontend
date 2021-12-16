import './RoleDetail.css';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import DetailTopSection from '../../components/detail-top-section/DetailTopSection';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import RoleDTO from '../../dto/RoleDTO';
import RoleService from '../../services/role/RoleService';

function RoleDetail() {
  const [role, setRole] = useState({} as RoleDTO);

  useEffect(() => {
    new RoleService().loadOne(id)
    .then(val => {
      setRole(val);
    })
  }, [])

  const params = useParams();

  if(params.id === undefined) {
    return <div></div>
  }

  const id: number = Number.parseInt(params.id);

  if(!role || !role.allowedPermissions) {
    return <div></div>
  }

  return (
    <div>
      <Breadcrumb lastItem={role.name}/>
      <DetailTopSection pageTitle={role.name} buttonTitle={'Wijzigen'} navigationLink={'/rollen/wijzigen/' + role.id} subheading={'Rol'}/>
      <div className="permissions">
        <h4>Permissies</h4>
        {
        role.allowedPermissions.length !== 0  ? 
        role.allowedPermissions.map(permission => {
          return <p id={permission}>{permission}</p>
        }) : 
        <p>Er zijn nog geen gekoppelde permissies!</p>
        }
      </div>
    </div>
  );
}

export default RoleDetail;
