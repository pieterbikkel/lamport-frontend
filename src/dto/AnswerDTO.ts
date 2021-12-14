class AnswerDTO {
    id: number = 0;
    answer: string = "";

    constructor(answerDTO?: AnswerDTO) {
        Object.assign(this, answerDTO);
    }
}

export default AnswerDTO;