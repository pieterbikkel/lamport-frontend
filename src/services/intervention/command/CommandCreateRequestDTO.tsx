import CommandDTO from "../../../dto/CommandDTO";

class CommandCreateRequestDTO {
    name: String = "";
    
    constructor(commandDTO: CommandDTO) {
        this.name = commandDTO.name;
    };
}

export default CommandCreateRequestDTO;