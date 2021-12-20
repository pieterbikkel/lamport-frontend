import QuestionDTO from "./QuestionDTO";

class QuestionnaireDTO {
    id: number = 0;
    name: string = "";
    questions: QuestionDTO[] = [];

    constructor(questionDTO?: QuestionnaireDTO) {
        Object.assign(this, questionDTO);
    }
}

export default QuestionnaireDTO;