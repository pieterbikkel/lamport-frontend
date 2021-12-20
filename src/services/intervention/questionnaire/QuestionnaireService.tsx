import networkAdapter from "../../../adapters/network/NetworkAdapterFactory";
import InterventionDTO from "../../../dto/QuestionnaireDTO";
import QuestionnaireDTO from "../../../dto/QuestionnaireDTO";
import QuestionnaireCreateRequestDTO from "./QuestionnaireCreateRequestDTO";
import QuestionnaireUpdateRequestDTO from "./QuestionnaireUpdateRequestDTO";
import QuestionDTO from "../../../dto/QuestionDTO";
class QuestionnaireService {
    async loadAll(): Promise<InterventionDTO[]> {
		return networkAdapter
		.get("interventions/questionnaire")
		.then(response => response.data)
		.then(data => {
			let toReturn = [] as QuestionnaireDTO[];
			data.forEach((questionnaire: any) => {
				let questionnaireDTO: QuestionnaireDTO = new QuestionnaireDTO();
				questionnaireDTO.id = questionnaire.id;
				questionnaireDTO.name = questionnaire.name;
				questionnaireDTO.questions = questionnaire.questions;
				let questions : QuestionDTO[] = []

                questionnaire.questions.forEach((question:any) => {
                    const questionDTO = new QuestionDTO();
                    questionDTO.id = question.id;
                    questionDTO.name = question.name;
                });

                questionnaireDTO.questions = questions;
                
                toReturn.push(questionnaireDTO);
			});
			return toReturn;
		});
    }
    async loadOne(id: number): Promise<QuestionnaireDTO> {
        return networkAdapter.get("interventions/questionnaire/" + id)
            .then(response => response.data)
            .then(questionnaire => {
                let questionnaireDTO: QuestionnaireDTO = new QuestionnaireDTO();
                questionnaireDTO.id = questionnaire.id;
                questionnaireDTO.name = questionnaire.name;
                let questions : QuestionDTO[] = []

                questionnaire.questions.forEach((question:any) => {
                    const questionDTO = new QuestionDTO();
                    questionDTO.id = question.id;
                    questionDTO.name = question.name;
                });
                
                questionnaireDTO.questions = questions;
                
                return questionnaireDTO;
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