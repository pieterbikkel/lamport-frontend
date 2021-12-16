import AnswerDTO from "./AnswerDTO";

class QuestionDTO {
    id: number = 0;
	name: string = "";
	question: string = "";
	answer: AnswerDTO[] = [];

    constructor(questionDTO?: QuestionDTO) {
        Object.assign(this, questionDTO);
    }
}

export default QuestionDTO;
