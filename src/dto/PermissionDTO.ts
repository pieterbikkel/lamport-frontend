class PermissionDTO {
    key: string = "";
	display: string = "";

    constructor(permissionDTO?: PermissionDTO) {
        Object.assign(this, permissionDTO);
    }
}

export default PermissionDTO;
