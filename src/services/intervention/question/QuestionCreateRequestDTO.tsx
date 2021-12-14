import AnswerDTO from "../../../dto/AnswerDTO";
import QuestionDTO from "../../../dto/QuestionDTO";

class QuestionCreateRequestDTO {
    question: string = "";
    answers: AnswerDTO[] = [];
    
    constructor(questionDTO: QuestionDTO) {
        this.question = questionDTO.question;
        this.answers = questionDTO.answers;
    };
}

export default QuestionCreateRequestDTO;