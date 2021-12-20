import networkAdapter from "../../../adapters/network/NetworkAdapterFactory";
import CommandDTO from "../../../dto/CommandDTO";
import InterventionDTO from "../../../dto/CommandDTO";
import CommandCreateRequestDTO from "./CommandCreateRequestDTO";
import CommandUpdateRequestDTO from "./CommandUpdateRequestDTO";

class CommandService {
    async loadAll(): Promise<InterventionDTO[]> {
		return networkAdapter
		.get("interventions")
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
        return networkAdapter.get("interventions/" + id)
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
    async create(value: CommandDTO): Promise<void> {
        return networkAdapter.post("interventions/command", new CommandCreateRequestDTO(value));
    }
    async delete(id: number): Promise<void> {
        return networkAdapter.delete("interventions/command/" + id);
    }
}

export default CommandService;