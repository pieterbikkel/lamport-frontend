import GoalDTO from "../../dto/GoalDTO";
import ProfileQuestionsDTO from "../../dto/profileQuestionsDTO";

class GoalCreateRequestDTO {
    name: String = "";
    profileQuestions: ProfileQuestionsDTO[] = [];
    
    constructor(goalDTO: GoalDTO) {
        this.name = goalDTO.name;
        this.profileQuestions = goalDTO.profileQuestions;
    };
}

export default GoalCreateRequestDTO;