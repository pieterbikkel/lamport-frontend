import networkAdapter from "../../../adapters/network/NetworkAdapterFactory";
import AnswerDTO from "../../../dto/AnswerDTO";
import QuestionDTO from "../../../dto/QuestionDTO";
import IService from "../../IService";
import QuestionCreateRequestDTO from "./QuestionCreateRequestDTO";
import QuestionUpdateRequestDTO from "./QuestionUpdateRequestDTO";

class QuestionService implements IService<QuestionDTO> {
    async loadAll(): Promise<QuestionDTO[]> {
        return networkAdapter
            .get("interventions")
            .then(response => response.data)
            .then(data => {
                let toReturn = [] as QuestionDTO[];
                data.forEach((question: any) => {
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
                    toReturn.push(questionDto);
                });
                return toReturn;
            });
    }
    
    async loadOne(id: number): Promise<QuestionDTO> {
        return networkAdapter
            .get("interventions/" + id)
            .then(response => response.data)
            .then(question => {
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
                return questionDto;
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