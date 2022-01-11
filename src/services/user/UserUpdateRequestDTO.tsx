import UserDTO from "../../dto/UserDTO";
import RoleDTO from "../../dto/RoleDTO";

class UserUpdateRequestDTO {
    id: number = 0;
    username: string = "";
    email: string = "";
	password: string= "";
    role: RoleDTO = new RoleDTO();
    roleId: number = 0;
    goalId: number = 0;
    
    constructor(userDTO: UserDTO) {
        this.id = userDTO.id;
        this.username = userDTO.username;
        this.email = userDTO.email;
		this.password = userDTO.password;
        this.role = userDTO.role;
        this.roleId = userDTO.roleId;
        this.goalId = userDTO.goalId;
    };
}

export default UserUpdateRequestDTO;
