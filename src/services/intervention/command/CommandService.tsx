import networkAdapter from "../../../adapters/NetworkAdapterFactory";
import CommandDTO from "../../../dto/CommandDTO";
import InterventionDTO from "../../../dto/CommandDTO";
import CommandCreateRequestDTO from "./CommandCreateRequestDTO";

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
				commandDTO.text = command.text;
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
				commandDTO.text = command.text;
                return commandDTO;
            });
    }
    update(value: CommandDTO): Promise<void> {
        return networkAdapter.put("command", value);
    }
    create(value: CommandDTO): Promise<void> {
        return networkAdapter.post("interventions/command", new CommandCreateRequestDTO(value));
    }
    delete(id: number): Promise<void> {
        return networkAdapter.delete("command/" + id);
    }
}

export default CommandService;