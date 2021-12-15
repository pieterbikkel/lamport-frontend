class AnswerDTO {
    id: number = 0;
	answerText: string = "";

    constructor(answerDTO?: AnswerDTO) {
        Object.assign(this, answerDTO);
    }

}

export default AnswerDTO;
