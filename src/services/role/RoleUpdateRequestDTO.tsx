import RoleDTO from "../../dto/RoleDTO";

class RoleUpdateRequestDTO {
    id: number = 0;
    name: string = "";
    allowedPermissions: string[] = [];
    
    constructor(roleDTO: RoleDTO) {
        this.name = roleDTO.name;
        this.id = roleDTO.id
        this.allowedPermissions = roleDTO.allowedPermissions.map(x => x.key);
    };
}

export default RoleUpdateRequestDTO;