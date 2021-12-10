import networkAdapter from "../../adapters/NetworkAdapterFactory";
import RoleDTO from "../../dto/RoleDTO";
import UserDTO from "../../dto/UserDTO";
import IService from "../IService";
import UserCreateRequestDTO from "./UserCreateRequestDTO";

class UserService implements IService<UserDTO> {
    async loadAll(): Promise<UserDTO[]> {
        return networkAdapter
        .get("users")
        .then(response => response.data)
        .then(data => {
            let toReturn = [] as UserDTO[];
            data.forEach((user: any) => {
                let userDto: UserDTO = new UserDTO();
                let roleDto: RoleDTO = new RoleDTO();
                roleDto.id = user.role.id;
                roleDto.name = user.role.name;

                userDto.role = roleDto;
                userDto.id = user.id;
                userDto.username = user.username;
                userDto.email = user.email;
                userDto.roleId = roleDto.id;

                toReturn.push(userDto);
            });
            return toReturn;
        });
    }
    async loadOne(id: number): Promise<UserDTO> {
        return networkAdapter
        .get("users/" + id)
        .then(response => response.data)
        .then(user => {
            let userDto: UserDTO = new UserDTO();
            let roleDto: RoleDTO = new RoleDTO();
            roleDto.id = user.role.id;
            roleDto.name = user.role.name;
            
            userDto.role = roleDto;
            userDto.id = user.id;
            userDto.username = user.username;
            userDto.email = user.email;
            userDto.roleId = roleDto.id;
        
            return userDto;
        });
    }
    async update(value: UserDTO): Promise<void> {
        return networkAdapter.put("users", new UserCreateRequestDTO(value));
    }
    async create(value: UserDTO): Promise<void> {
        return networkAdapter.post("users", new UserCreateRequestDTO(value));
    }
    async delete(id: number): Promise<void> {
        return networkAdapter.delete("users/" + id);
    }
}

export default UserService