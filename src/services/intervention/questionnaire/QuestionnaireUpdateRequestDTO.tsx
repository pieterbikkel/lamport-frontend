import QuestionDTO from "../../../dto/QuestionDTO";
import QuestionnaireDTO from "../../../dto/QuestionnaireDTO";

class QuestionnaireUpdateRequestDTO {
    id: number = 0;
    name: string = "";
    questions: QuestionDTO[] = [];
    
    constructor(questionnaireDTO: QuestionnaireDTO) {
        this.id = questionnaireDTO.id;
        this.name = questionnaireDTO.name;
        this.questions = questionnaireDTO.questions;
    };
}

export default QuestionnaireUpdateRequestDTO;