import networkAdapter from "../../../adapters/NetworkAdapterFactory";
import CommandDTO from "../../../dto/CommandDTO";
import IService from "../../IService";
import CommandCreateRequestDTO from "./CommandCreateRequestDTO";
import CommandUpdateRequestDTO from "./CommandUpdateRequestDTO";

class CommandService implements IService<CommandDTO> {
    async loadAll(): Promise<CommandDTO[]> {
        return networkAdapter
            .get("commands")
            .then(response => response.data)
            .then(data => {
                let toReturn = [] as CommandDTO[];
                data.forEach((command: any) => {
                    let commandDTO: CommandDTO = new CommandDTO();
                    commandDTO.id = command.id;
                    commandDTO.name = command.name;
                    commandDTO.commandText = command.commandText;
                    toReturn.push(commandDTO);
                });
                return toReturn;
            });
    }
    
    async loadOne(id: number): Promise<CommandDTO> {
        return networkAdapter
            .get("commands/" + id)
            .then(response => response.data)
            .then(data => {
                let toReturn = new CommandDTO();
                toReturn.id = data.id;
                toReturn.name = data.name;
                toReturn.commandText = data.commandText;
                return toReturn;
            });
    }
    async   update(value: CommandDTO): Promise<void> {
        return networkAdapter.put("interventions/commands", new CommandUpdateRequestDTO(value));
    }
    async create(value: CommandDTO): Promise<void> {
        return networkAdapter.post("interventions/commands", new CommandCreateRequestDTO(value));
    }
    async delete(id: number): Promise<void> {
        return networkAdapter.delete("interventions/commands/" + id);
    }

}

export default CommandService;