import CommandDTO from "../../../dto/CommandDTO";

class CommandUpdateRequestDTO {
    id: number = 0;
    name: String = "";
    
    constructor(commandDTO: CommandDTO) {
        this.id = commandDTO.id;
        this.name = commandDTO.name;
    };
}

export default CommandUpdateRequestDTO;