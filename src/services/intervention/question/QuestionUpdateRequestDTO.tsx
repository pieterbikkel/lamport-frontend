import AnswerDTO from "../../../dto/AnswerDTO";
import QuestionDTO from "../../../dto/QuestionDTO";

class QuestionUpdateRequestDTO {
    id: number = 0;
    question: string = "";
    answers: AnswerDTO[] = [];
    
    constructor(questionDTO: QuestionDTO) {
        this.id = questionDTO.id;
        this.question = questionDTO.question;
        this.answers = questionDTO.answers;
    };
}

export default QuestionUpdateRequestDTO;