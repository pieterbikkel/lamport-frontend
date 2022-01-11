import GoalDTO from "./GoalDTO";
import RoleDTO from "./RoleDTO";

class UserDTO {
    id: number = 0;
    username: string = "";
    email: string = "";
    password: string= "";
    role: RoleDTO = new RoleDTO();
    roleId: number = 0;
    goalId: number = 0;
    linkedGoal: GoalDTO = new GoalDTO();

    constructor(userDto?: UserDTO) {
        Object.assign(this, userDto);
    }
}

export default UserDTO;
