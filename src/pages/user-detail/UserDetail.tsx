import './UserDetail.css';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import DetailTopSection from '../../components/detail-top-section/DetailTopSection';
import UserDTO from '../../dto/UserDTO';
import UserService from '../../services/user/UserService';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import GoalService from '../../services/goal/GoalService';
import GoalDTO from '../../dto/GoalDTO';

function UserDetail() {
  const [user, setUser] = useState({} as UserDTO);

  useEffect(() => {
    const userService = new UserService();
    userService.loadOne(id)
    .then(val => {
      setUser(val);
    })
  }, [])

  const params = useParams();

  if(params.id === undefined) {
    return <div></div>
  }

  const id: number = Number.parseInt(params.id);

  if(!user || !user.role) {
    return <div></div>
  }

  return (
    <div>
      <Breadcrumb lastItem={user.username}/>
      <DetailTopSection pageTitle={user.username} buttonTitle={'Wijzigen'} navigationLink={'/gebruikers/wijzigen/' + user.id} subheading={'Gebruiker'}/>
      <table className="user-detail-table">
        <tbody>
          <tr>
            <td className="table-min-width">Email:</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td className="table-min-width">Rol:</td>
            <td>{user.role.name}</td>
          </tr>
          <tr>
            <td className="table-min-width">Doelstelling:</td>
            <td>{user.linkedGoal.name}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default UserDetail;
