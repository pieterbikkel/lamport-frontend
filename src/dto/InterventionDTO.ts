class InterventionDTO {
    id: number = 0;
    name: string = "";
    type: string = "";

    constructor(InterventionDTO?: InterventionDTO) {
        Object.assign(this, InterventionDTO);
    }
}

export default InterventionDTO;
