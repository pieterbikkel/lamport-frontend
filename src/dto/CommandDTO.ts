class CommandDTO {
    id: number = 0;
    name: string = "";
    text: string = "";

    constructor(commandDTO?: CommandDTO) {
        Object.assign(this, commandDTO);
    }

}

export default CommandDTO;
