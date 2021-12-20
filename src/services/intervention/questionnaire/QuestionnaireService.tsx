import networkAdapter from "../../../adapters/network/NetworkAdapterFactory";
import QuestionnaireDTO from "../../../dto/QuestionnaireDTO";
import QuestionnaireCreateRequestDTO from "./QuestionnaireCreateRequestDTO";
import QuestionnaireUpdateRequestDTO from "./QuestionnaireUpdateRequestDTO";
import QuestionDTO from "../../../dto/QuestionDTO";
import AnswerDTO from "../../../dto/AnswerDTO";

class QuestionnaireService {
    async loadOne(id: number): Promise<QuestionnaireDTO> {
        return networkAdapter
            .get("interventions/" + id)
            .then(response => response.data)
            .then(data => {
                let toReturn = new QuestionnaireDTO();
                toReturn.id = data.id;
                toReturn.name = data.name;

                let questions : QuestionDTO[] = [];

                data.questions.forEach((question:any) => {
                    let questionDto = new QuestionDTO();

                    questionDto.name = question.question;
                    questionDto.question = question.question;
                    questionDto.id = question.id;

                    let answers : AnswerDTO[] = [];
                    question.answers.forEach((answer:any) => {
                        let answerDto = new AnswerDTO();

                        answerDto.answerText = answer.answer;
                        answerDto.id = answer.id;

                        answers.push(answerDto);
                    })

                    questionDto.answers = answers;

                    questions.push(questionDto);
                });
                toReturn.questions = questions;

                return toReturn;
            });
    }
    update(value: QuestionnaireDTO): Promise<void> {
        return networkAdapter.put("interventions/questionnaire", new QuestionnaireUpdateRequestDTO(value));
    }
    async create(value: QuestionnaireDTO): Promise<void> {
        return networkAdapter.post("interventions/questionnaire", new QuestionnaireCreateRequestDTO(value));
    }
    async delete(id: number): Promise<void> {
        return networkAdapter.delete("interventions/questionnaire/" + id);
    }
}

export default QuestionnaireService;