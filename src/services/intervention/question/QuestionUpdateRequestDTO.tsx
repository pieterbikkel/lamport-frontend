import QuestionDTO from "../../../dto/QuestionDTO";


class CommandUpdateRequestDTO {
    id: number = 0;
    name: string = "";
	question: string = "";
    answer: string = "";
    
    constructor(questionDTO: QuestionDTO) {
        this.id = questionDTO.id;
        this.name = questionDTO.name;
        this.question = questionDTO.question;
        this.answer = questionDTO.answer;
    };
}

export default CommandUpdateRequestDTO;
