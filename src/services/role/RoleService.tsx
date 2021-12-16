import networkAdapter from "../../adapters/network/NetworkAdapterFactory";
import RoleDTO from "../../dto/RoleDTO";
import IService from "../IService";

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
                roleDTO.allowedPermissions = role.allowedPermissions;

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
            roleDTO.allowedPermissions = role.allowedPermissions;

            return roleDTO;
        });
    }
    update(value: RoleDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }
    create(value: RoleDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export default RoleService;