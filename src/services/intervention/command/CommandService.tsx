import networkAdapter from "../../../adapters/network/NetworkAdapterFactory";
import CommandDTO from "../../../dto/CommandDTO";
import InterventionDTO from "../../../dto/CommandDTO";
import CommandCreateRequestDTO from "./CommandCreateRequestDTO";
import CommandUpdateRequestDTO from "./CommandUpdateRequestDTO";

class CommandService {
    async loadAll(): Promise<InterventionDTO[]> {
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
    async loadOne(id: number): Promise<InterventionDTO> {
        return networkAdapter.get("command/" + id)
            .then(response => response.data)
            .then(command => {
                let commandDTO: CommandDTO = new CommandDTO();
                commandDTO.id = command.id;
                commandDTO.name = command.name;
				commandDTO.commandText = command.commandText;
                return commandDTO;
            });
    }
    update(value: CommandDTO): Promise<void> {
        return networkAdapter.put("interventions/command", new CommandUpdateRequestDTO(value));
    }
    create(value: CommandDTO): Promise<void> {
        return networkAdapter.post("interventions/command", new CommandCreateRequestDTO(value));
    }
    delete(id: number): Promise<void> {
        return networkAdapter.delete("command/" + id);
    }
}

export default CommandService;