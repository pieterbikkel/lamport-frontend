import ProfileQuestionsDTO from "./profileQuestionsDTO";

class GoalDTO {
    id: number = 0;
    name: string = "";
    profileQuestions: ProfileQuestionsDTO[] = [];
    
    constructor(goalDTO?: GoalDTO) {
        Object.assign(this, goalDTO);
    }
}

export default GoalDTO;
