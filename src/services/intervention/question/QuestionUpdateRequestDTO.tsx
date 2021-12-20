import AnswerDTO from "../../../dto/AnswerDTO";
import QuestionDTO from "../../../dto/QuestionDTO";

class CommandUpdateRequestDTO {
    id: number = 0;
    name: string = "";
	question: string = "";
    answers: AnswerDTO[] = [];
    
    constructor(questionDTO: QuestionDTO) {
        this.id = questionDTO.id;
        this.name = questionDTO.name;
        this.question = questionDTO.question;
        this.answers = questionDTO.answers;
    };
}

export default CommandUpdateRequestDTO;
