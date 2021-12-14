import './UserList.css';
import { useState, useEffect } from 'react';
import TopSection from '../../components/list-top-section/ListTopSection';
import TableRow from '../../components/tablerow/TableRow';
import UserDTO from '../../dto/UserDTO';
import UserService from '../../services/user/UserService';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';

function UserList() {
  const [users, setUsers] = useState([] as UserDTO[]);
  const [userService, setUserService] = useState({} as UserService);

  useEffect(() => {
    const userService = new UserService();
    setUserService(userService)
    userService.loadAll()
    .then(val => {
      setUsers(val);
    })
  }, [])

  const deleteUser = (userId: number) => {

  }

  const search = () => {
    console.log("search")
  }

  return (
    <div>
      <Breadcrumb/>
      <TopSection pageTitle={'Gebruikers'} buttonTitle={'Toevoegen'} navigationLink={'/gebruikers/wijzigen/0'} onClick={search}/>
        {users.map(user => {
          return (
            <div key={user.id}>
              <TableRow title={user.username} subtitle={user.role.name} onEditLink={"/gebruikers/wijzigen/" + user.id} onDeleteClick={() => deleteUser(user.id)} navigationLink={ "/gebruikers/" + user.id }/>
            </div>
          )
        })}
    </div>
  );
}

export default UserList;
