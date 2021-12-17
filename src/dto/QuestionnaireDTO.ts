import QuestionDTO from "./QuestionDTO";

class QuestionnaireDTO {
    id: number = 0;
    name: string = "";
    questions: QuestionDTO[] = [];
}

export default QuestionnaireDTO;