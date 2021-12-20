
import networkAdapter from "../../../adapters/network/NetworkAdapterFactory";
import QuestionDTO from "../../../dto/QuestionDTO";
import IService from "../../IService";
import QuestionCreateRequestDTO from "./QuestionCreateRequestDTO";
import QuestionUpdateRequestDTO from "./QuestionUpdateRequestDTO";

<<<<<<< HEAD
class QuestionService {
    async loadAll(): Promise<InterventionDTO[]> {
		return networkAdapter
		.get("interventions/questions")
		.then(response => response.data)
		.then(data => {
			let toReturn = [] as QuestionDTO[];
			data.forEach((question: any) => {
				let questionDTO: QuestionDTO = new QuestionDTO();
				questionDTO.id = question.id;
				questionDTO.name = question.name;
				questionDTO.question = question.question;
				questionDTO.answers = question.answers;
				toReturn.push(questionDTO);
			});
			return toReturn;
		});
    }
    async loadOne(id: number): Promise<QuestionDTO> {
        return networkAdapter.get("interventions/question/" + id)
            .then(response => response.data)
            .then(question => {
				let questionDTO: QuestionDTO = new QuestionDTO();
				questionDTO.id = question.id;
				questionDTO.name = question.name;
				questionDTO.question = question.question;
				questionDTO.answers = question.answers;
				
                return questionDTO;
=======
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
>>>>>>> 8bdd974fa4a09e513a6ea48be81d3a684ddc199f
            });
    }
    async   update(value: QuestionDTO): Promise<void> {
        return networkAdapter.put("interventions/questions", new QuestionUpdateRequestDTO(value));
    }
    async create(value: QuestionDTO): Promise<void> {
        return networkAdapter.post("interventions/question", new QuestionCreateRequestDTO(value));
    }
    async delete(id: number): Promise<void> {
        return networkAdapter.delete("interventions/question/" + id);
    }

}

export default QuestionService;