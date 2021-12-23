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
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const userService = new UserService();
    setUserService(userService)
    userService.loadAll()
    .then(val => {
      setUsers(val);
    })
  }, [])

  const deleteUser = (userId: number) => {
      setUsers(users.filter(x => x.id !== userId))
      userService.delete(userId);
    }
  
    const onSubmit = async (e: any) => {
      e.preventDefault()
  
      setSearchTerm(e.target[0].value)
    }
  
    const handleSearchChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value)
    }

  return (
    <div>
      <Breadcrumb/>
      <TopSection pageTitle={'Gebruikers'} buttonTitle={'Toevoegen'} navigationLink={'/gebruikers/wijzigen/0'} onSearchChange={handleSearchChange} onSubmit={onSubmit}/>
        {users.filter((user) => {
          if(searchTerm === "") return user
          if(user.username.toLowerCase().includes(searchTerm.toLowerCase())) return user
        }).map(user => {
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
