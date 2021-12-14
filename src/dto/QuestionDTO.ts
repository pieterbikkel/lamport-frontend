class QuestionDTO {
    id: number = 0;
	name: string = "";
	question: string = "";
	answer: string = "";

    constructor(questionDTO?: QuestionDTO) {
        Object.assign(this, questionDTO);
    }
}

export default QuestionDTO;
