
import networkAdapter from "../../../adapters/network/NetworkAdapterFactory";
import InterventionDTO from "../../../dto/InterventionDTO";
import QuestionDTO from "../../../dto/QuestionDTO";
import QuestionCreateRequestDTO from "./QuestionCreateRequestDTO";
import QuestionUpdateRequestDTO from "./QuestionUpdateRequestDTO";

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
            });
    }
    update(value: QuestionDTO): Promise<void> {
        return networkAdapter.put("interventions/question", new QuestionUpdateRequestDTO(value));
    }
    async create(value: QuestionDTO): Promise<void> {
        return networkAdapter.post("interventions/question", new QuestionCreateRequestDTO(value));
    }
    async delete(id: number): Promise<void> {
        return networkAdapter.delete("interventions/question/" + id);
    }
}

export default QuestionService;