import networkAdapter from "../../../adapters/NetworkAdapterFactory";
import QuestionnaireDTO from "../../../dto/QuestionnaireDTO";
import IService from "../../IService";
import QuestionnaireCreateRequestDTO from "./QuestionnaireCreateRequestDTO";
import QuestionnaireUpdateRequestDTO from "./QuestionnaireUpdateRequestDTO";

class QuestionnaireService implements IService<QuestionnaireDTO> {
    async loadAll(): Promise<QuestionnaireDTO[]> {
        return networkAdapter
            .get("questions")
            .then(response => response.data)
            .then(data => {
                let toReturn = [] as QuestionnaireDTO[];
                data.forEach((question: any) => {
                    let questionDTO: QuestionnaireDTO = new QuestionnaireDTO();
                    questionDTO.id = question.id;
                    questionDTO.name = question.name;
                    questionDTO.questions = question.questions;
                    toReturn.push(questionDTO);
                });
                return toReturn;
            });
    }
    
    async loadOne(id: number): Promise<QuestionnaireDTO> {
        return networkAdapter
            .get("questions/" + id)
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
        return networkAdapter.put("questions", new QuestionnaireUpdateRequestDTO(value));
    }
    async create(value: QuestionnaireDTO): Promise<void> {
        return networkAdapter.post("questions", new QuestionnaireCreateRequestDTO(value));
    }
    async delete(id: number): Promise<void> {
        return networkAdapter.delete("questions/" + id);
    }

}

export default QuestionnaireService;