import AnswerDTO from "./AnswerDTO";

class QuestionDTO {
    id: number = 0;
    question: string = "";
    answers: AnswerDTO[] = [];
    name: string = "";

    constructor(questionDTO?: QuestionDTO) {
        Object.assign(this, questionDTO);
    }
}

export default QuestionDTO;