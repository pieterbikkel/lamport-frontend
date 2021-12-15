import networkAdapter from "../../../adapters/NetworkAdapterFactory";
import QuestionDTO from "../../../dto/QuestionDTO";
import IService from "../../IService";
import QuestionCreateRequestDTO from "./QuestionCreateRequestDTO";
import QuestionUpdateRequestDTO from "./QuestionUpdateRequestDTO";

class QuestionService implements IService<QuestionDTO> {
    async loadAll(): Promise<QuestionDTO[]> {
        return networkAdapter
            .get("questions")
            .then(response => response.data)
            .then(data => {
                let toReturn = [] as QuestionDTO[];
                data.forEach((question: any) => {
                    let questionDTO: QuestionDTO = new QuestionDTO();
                    questionDTO.id = question.id;
                    questionDTO.question = question.question;
                    toReturn.push(questionDTO);
                });
                return toReturn;
            });
    }
    
    async loadOne(id: number): Promise<QuestionDTO> {
        return networkAdapter
            .get("questions/" + id)
            .then(response => response.data)
            .then(data => {
                let toReturn = new QuestionDTO();
                toReturn.id = data.id;
                toReturn.question = data.question;
                return toReturn;
            });
    }
    async   update(value: QuestionDTO): Promise<void> {
        return networkAdapter.put("interventions/questions", new QuestionUpdateRequestDTO(value));
    }
    async create(value: QuestionDTO): Promise<void> {
        return networkAdapter.post("interventions/questions", new QuestionCreateRequestDTO(value));
    }
    async delete(id: number): Promise<void> {
        return networkAdapter.delete("interventions/questions/" + id);
    }

}

export default QuestionService;