
import networkAdapter from "../../../adapters/network/NetworkAdapterFactory";
import AnswerDTO from "../../../dto/AnswerDTO";
import QuestionDTO from "../../../dto/QuestionDTO";
import QuestionCreateRequestDTO from "./QuestionCreateRequestDTO";
import QuestionUpdateRequestDTO from "./QuestionUpdateRequestDTO";

class QuestionService {
    async loadOne(id: number): Promise<QuestionDTO> {
        return networkAdapter.get("interventions/" + id)
            .then(response => response.data)
            .then(question => {
				let questionDTO: QuestionDTO = new QuestionDTO();
				questionDTO.id = question.id;
				questionDTO.name = question.name;
				questionDTO.question = question.question;
				let answers : AnswerDTO[] = [];
                
				question.answers.forEach((answer:any) => {
					let answerDto = new AnswerDTO();

					answerDto.answerText = answer.answer;
					answerDto.id = answer.id;

					answers.push(answerDto);
				})

				questionDTO.answers = answers;
				
                return questionDTO;
        });
    }

    async  update(value: QuestionDTO): Promise<void> {
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