import AnswerDTO from "../../../dto/AnswerDTO";
import QuestionDTO from "../../../dto/QuestionDTO";


class CommandCreateRequestDTO {
    name: string = "";
	question: string = "";
    answers: AnswerDTO[] = [];
    
    constructor(questionDTO: QuestionDTO) {
        this.name = questionDTO.name;
        this.question = questionDTO.question;
        this.answers = questionDTO.answers;
    };
}

export default CommandCreateRequestDTO;
