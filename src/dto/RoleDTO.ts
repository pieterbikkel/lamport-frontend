import PermissionDTO from "./PermissionDTO";

class RoleDTO {
    id: number = 0;
    name: string = "";
    allowedPermissions: PermissionDTO[] = [];

    constructor(roleDTO?: RoleDTO) {
        Object.assign(this, roleDTO);
    }
}

export default RoleDTO;
