import CommandDTO from "../../../dto/CommandDTO";

class CommandCreateRequestDTO {
    name: String = "";
	text: String = "";
    
    constructor(commandDTO: CommandDTO) {
        this.name = commandDTO.name;
        this.text = commandDTO.text;
    };

}

export default CommandCreateRequestDTO;
