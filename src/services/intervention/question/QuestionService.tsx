import networkAdapter from "../../../adapters/NetworkAdapterFactory";
import InterventionDTO from "../../../dto/InterventionDTO";
import QuestionDTO from "../../../dto/QuestionDTO";
import QuestionCreateRequestDTO from "./QuestionCreateRequestDTO";
import QuestionUpdateRequestDTO from "./QuestionUpdateRequestDTO";

class QuestionService {
    async loadAll(): Promise<InterventionDTO[]> {
		return networkAdapter
		.get("questions")
		.then(response => response.data)
		.then(data => {
			let toReturn = [] as QuestionDTO[];
			data.forEach((question: any) => {
				let questionDTO: QuestionDTO = new QuestionDTO();
				questionDTO.id = question.id;
				questionDTO.name = question.name;
				questionDTO.question = question.question;
				questionDTO.answer = question.answer;
				toReturn.push(questionDTO);
			});
			return toReturn;
		});
    }
    async loadOne(id: number): Promise<InterventionDTO> {
        return networkAdapter.get("question/" + id)
            .then(response => response.data)
            .then(question => {
				let questionDTO: QuestionDTO = new QuestionDTO();
				questionDTO.id = question.id;
				questionDTO.name = question.name;
				questionDTO.question = question.name;
				questionDTO.answer = question.name;
				
                return questionDTO;
            });
    }
    update(value: QuestionDTO): Promise<void> {
        return networkAdapter.put("interventions/question", new QuestionUpdateRequestDTO(value));
    }
    create(value: QuestionDTO): Promise<void> {
        return networkAdapter.post("interventions/question", new QuestionCreateRequestDTO(value));
    }
    delete(id: number): Promise<void> {
        return networkAdapter.delete("question/" + id);
    }
}

export default QuestionService;