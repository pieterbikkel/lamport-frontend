import CommandDTO from "../../../dto/CommandDTO";

class CommandCreateRequestDTO {
    id: string = "";
    name: string = "";
    commandText: string = "";
    
    constructor(commandDTO: CommandDTO) {
        this.name = commandDTO.name;
    };
}

export default CommandCreateRequestDTO;