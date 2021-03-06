import QuestionDTO from "../../../dto/QuestionDTO";
import QuestionnaireDTO from "../../../dto/QuestionnaireDTO";

class QuestionnaireCreateRequestDTO {
    name: string = "";
	questions: QuestionDTO[] = [];
    
    constructor(questionnaireDTO: QuestionnaireDTO) {
        this.name = questionnaireDTO.name;
        this.questions = questionnaireDTO.questions;
    };
}

export default QuestionnaireCreateRequestDTO;
