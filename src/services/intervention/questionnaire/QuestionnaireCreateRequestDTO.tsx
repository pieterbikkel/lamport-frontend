import QuestionDTO from "../../../dto/QuestionDTO";
import QuestionnaireDTO from "../../../dto/QuestionnaireDTO";

class QuestionnaireCreateRequestDTO {
    id: number = 0;
    name: string = "";
    questions: QuestionDTO[] = [];
    
    constructor(questionDTO: QuestionnaireDTO) {
        this.id = questionDTO.id;
        this.name = questionDTO.name;
        this.questions = questionDTO.questions;
    };
}

export default QuestionnaireCreateRequestDTO;