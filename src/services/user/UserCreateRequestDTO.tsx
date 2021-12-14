import UserDTO from "../../dto/UserDTO";
import RoleDTO from "../../dto/RoleDTO";

class UserCreateRequestDTO {
    username: string = "";
    email: string = "";
	password: string= "";
    role: RoleDTO = new RoleDTO();
    roleId: number = 0;
    
    constructor(userDTO: UserDTO) {
        this.username = userDTO.username;
        this.email = userDTO.email;
		this.password = userDTO.password;
        this.role = userDTO.role;
        this.roleId = userDTO.roleId;
    };
}

export default UserCreateRequestDTO;
