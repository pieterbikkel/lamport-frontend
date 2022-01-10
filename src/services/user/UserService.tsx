import networkAdapter from "../../adapters/network/NetworkAdapterFactory";
import GoalDTO from "../../dto/GoalDTO";
import RoleDTO from "../../dto/RoleDTO";
import UserDTO from "../../dto/UserDTO";
import IService from "../IService";
import UserCreateRequestDTO from "./UserCreateRequestDTO";
import UserUpdateRequestDTO from "./UserUpdateRequestDTO";

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
                let goalDto: GoalDTO = new GoalDTO();
                roleDto.id = user.role.id;
                roleDto.name = user.role.name;

                goalDto.id = user.goal.id;
                goalDto.name = user.goal.name;
                goalDto.profileQuestions = user.goal.profileQuestions;

                userDto.role = roleDto;
                userDto.linkedGoal = goalDto;
                userDto.id = user.id;
                userDto.username = user.username;
                userDto.email = user.email;
                userDto.roleId = roleDto.id;
                userDto.goalId = goalDto.id;

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
            let goalDto: GoalDTO = new GoalDTO();
            roleDto.id = user.role.id;
            roleDto.name = user.role.name;

            goalDto.id = user.goal.id;
            goalDto.name = user.goal.name;
            goalDto.profileQuestions = user.goal.profileQuestions;
            
            userDto.role = roleDto;
            userDto.id = user.id;
            userDto.username = user.username;
            userDto.email = user.email;
            userDto.roleId = roleDto.id;
            userDto.goalId = goalDto.id;
        
            return userDto;
        });
    }
    async update(value: UserDTO): Promise<void> {
        return networkAdapter.put("users", new UserUpdateRequestDTO(value));
    }
    async create(value: UserDTO): Promise<void> {
        return networkAdapter.post("users", new UserCreateRequestDTO(value));
    }
    async delete(id: number): Promise<void> {
        return networkAdapter.delete("users/" + id);
    }
}

export default UserService