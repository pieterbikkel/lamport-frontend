import networkAdapter from "../../../adapters/network/NetworkAdapterFactory";
import AnswerDTO from "../../../dto/AnswerDTO";
import QuestionDTO from "../../../dto/QuestionDTO";
import QuestionnaireDTO from "../../../dto/QuestionnaireDTO";
import IService from "../../IService";
import QuestionnaireCreateRequestDTO from "./QuestionnaireCreateRequestDTO";
import QuestionnaireUpdateRequestDTO from "./QuestionnaireUpdateRequestDTO";

class QuestionnaireService implements IService<QuestionnaireDTO> {
    async loadAll(): Promise<QuestionnaireDTO[]> {
        return networkAdapter
            .get("interventions")
            .then(response => response.data)
            .then(data => {
                let toReturn = [] as QuestionnaireDTO[];
                data.forEach((question: any) => {
                    let questionnaireDTO: QuestionnaireDTO = new QuestionnaireDTO();
                    questionnaireDTO.id = question.id;
                    questionnaireDTO.name = question.name;
                    let questions : QuestionDTO[] = [];

                    data.questions.forEach((question:any) => {
                        let questionDto = new QuestionDTO();
    
                        questionDto.name = question.question;
                        questionDto.question = question.question;
                        questionDto.id = question.id;
    
                        let answers : AnswerDTO[] = [];
                        question.answers.forEach((answer:any) => {
                            let answerDto = new AnswerDTO();
    
                            answerDto.answerText = answer.answerText;
                            answerDto.id = answer.id;
    
                            answers.push(answer);
                        })
    
                        questionDto.answers = answers;
    
    
                        questions.push(questionDto)
                    });

                    toReturn.push(questionnaireDTO);
                });
                return toReturn;
            });
    }
    
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
    async   update(value: QuestionnaireDTO): Promise<void> {
        return networkAdapter.put("interventions/questionnaires", new QuestionnaireUpdateRequestDTO(value));
    }
    async create(value: QuestionnaireDTO): Promise<void> {
        return networkAdapter.post("interventions/questionnaires", new QuestionnaireCreateRequestDTO(value));
    }
    async delete(id: number): Promise<void> {
        return networkAdapter.delete("interventions/questionnaires/" + id);
    }

}

export default QuestionnaireService;