import QuestionDTO from "../../../dto/QuestionDTO";


class CommandCreateRequestDTO {
    name: string = "";
	question: string = "";
    answer: string = "";
    
    constructor(questionDTO: QuestionDTO) {
        this.name = questionDTO.name;
        this.question = questionDTO.question;
        this.answer = questionDTO.answer;
    };
}

export default CommandCreateRequestDTO;
