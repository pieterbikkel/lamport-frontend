import RoleDTO from "../../dto/RoleDTO";

class RoleCreateRequestDTO {
    name: string = "";
    allowedPermissions: string[] = [];
    
    constructor(roleDTO: RoleDTO) {
        this.name = roleDTO.name;
        this.allowedPermissions = roleDTO.allowedPermissions.map(x => x.key);
    };
}

export default RoleCreateRequestDTO;