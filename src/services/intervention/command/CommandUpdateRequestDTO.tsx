import CommandDTO from "../../../dto/CommandDTO";

class CommandUpdateRequestDTO {
    id: number = 0;
    name: string = "";
    commandText: string = "";
    
    constructor(commandDTO: CommandDTO) {
        this.id = commandDTO.id;
        this.name = commandDTO.name;
        this.commandText = commandDTO.commandText;
    };
}

export default CommandUpdateRequestDTO;