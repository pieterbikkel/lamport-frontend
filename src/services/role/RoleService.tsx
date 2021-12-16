import networkAdapter from "../../adapters/network/NetworkAdapterFactory";
import PermissionDTO from "../../dto/PermissionDTO";
import RoleDTO from "../../dto/RoleDTO";
import IService from "../IService";
import RoleCreateRequestDTO from "./RoleCreateRequestDTO";
import RoleUpdateRequestDTO from "./RoleUpdateRequestDTO";

class RoleService implements IService<RoleDTO> {
    async loadAll(): Promise<RoleDTO[]> {
        return networkAdapter
        .get("roles")
        .then(response => response.data)
        .then(data => {
            let toReturn = [] as RoleDTO[];
            data.forEach((role: any) => {
                let roleDTO: RoleDTO = new RoleDTO();
                roleDTO.id = role.id;
                roleDTO.name = role.name;
                let allowedPermissions : PermissionDTO[] = []
                role.allowedPermissions.forEach((permission:any) => {
                    const permissionDTO = new PermissionDTO();
                    permissionDTO.key = permission.key;
                    permissionDTO.display = permission.display;
                    allowedPermissions.push(permissionDTO)
                });
                roleDTO.allowedPermissions = allowedPermissions;

                toReturn.push(roleDTO);
            });
            return toReturn;
        });
    }
    async loadOne(id: number): Promise<RoleDTO> {
        return networkAdapter
        .get("roles/" + id)
        .then(response => response.data)
        .then(role => {
            let roleDTO: RoleDTO = new RoleDTO();
            roleDTO.id = role.id;
            roleDTO.name = role.name;
            let allowedPermissions : PermissionDTO[] = [];
            role.allowedPermissions.filter((x:string) => x !== null).forEach((permission:any) => {
                const permissionDTO = new PermissionDTO();
                permissionDTO.key = permission.key;
                permissionDTO.display = permission.display;
                allowedPermissions.push(permissionDTO)
            });
            roleDTO.allowedPermissions = allowedPermissions;
            console.log(roleDTO);

            return roleDTO;
        });
    }

    async update(value: RoleDTO): Promise<void> {
        return networkAdapter.put("roles", new RoleUpdateRequestDTO(value));
    }
    create(value: RoleDTO): Promise<void> {
        return networkAdapter.post("roles", new RoleCreateRequestDTO(value));
    }

    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async loadPermissions() : Promise<PermissionDTO[]> {
        return networkAdapter
        .get("roles/permissions")
        .then(response => response.data)
        .then(data => {
            let toReturn = [] as PermissionDTO[];
            data.forEach((permission: any) => {
                let permissionDTO: PermissionDTO = new PermissionDTO();
                permissionDTO.display = permission.display;
                permissionDTO.key = permission.key;

                toReturn.push(permissionDTO);
            });
            return toReturn;
        });
    }
}

export default RoleService;