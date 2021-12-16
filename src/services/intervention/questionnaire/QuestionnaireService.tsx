import networkAdapter from "../../../adapters/network/NetworkAdapterFactory";
import QuestionnaireDTO from "../../../dto/QuestionnaireDTO";
import IService from "../../IService";
import QuestionnaireCreateRequestDTO from "./QuestionnaireCreateRequestDTO";
import QuestionnaireUpdateRequestDTO from "./QuestionnaireUpdateRequestDTO";

class QuestionnaireService implements IService<QuestionnaireDTO> {
    async loadAll(): Promise<QuestionnaireDTO[]> {
        return networkAdapter
            .get("questionnaires")
            .then(response => response.data)
            .then(data => {
                let toReturn = [] as QuestionnaireDTO[];
                data.forEach((question: any) => {
                    let questionnaireDTO: QuestionnaireDTO = new QuestionnaireDTO();
                    questionnaireDTO.id = question.id;
                    questionnaireDTO.name = question.name;
                    questionnaireDTO.questions = question.questions;
                    toReturn.push(questionnaireDTO);
                });
                return toReturn;
            });
    }
    
    async loadOne(id: number): Promise<QuestionnaireDTO> {
        return networkAdapter
            .get("questionnaires/" + id)
            .then(response => response.data)
            .then(data => {
                let toReturn = new QuestionnaireDTO();
                toReturn.id = data.id;
                toReturn.name = data.name;
                toReturn.questions = data.questions;
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