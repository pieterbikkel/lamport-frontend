import QuestionDTO from "../../../dto/QuestionDTO";
import QuestionnaireDTO from "../../../dto/QuestionnaireDTO";

class QuestionnaireCreateRequestDTO {
    name: string = "";
    questions: QuestionDTO[] = [];
    
    constructor(questionDTO: QuestionnaireDTO) {
        this.name = questionDTO.name;
        this.questions = questionDTO.questions;
    };
}

export default QuestionnaireCreateRequestDTO;