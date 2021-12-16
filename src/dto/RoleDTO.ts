class RoleDTO {
    id: number = 0;
    name: string = "";
    allowedPermissions: string[] = [""];

    constructor(roleDTO?: RoleDTO) {
        Object.assign(this, roleDTO);
    }
}

export default RoleDTO;
