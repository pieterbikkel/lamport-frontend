import CommandDTO from "../../../dto/CommandDTO";

class CommandUpdateRequestDTO {
    name: String = "";
	commandText: String = "";
    
    constructor(commandDTO: CommandDTO) {
        this.name = commandDTO.name;
        this.commandText = commandDTO.commandText;
    };

}

export default CommandUpdateRequestDTO;
