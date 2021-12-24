import GoalDTO from "../../dto/GoalDTO";
import ProfileQuestionsDTO from "../../dto/profileQuestionsDTO";

class GoalUpdateRequestDTO {
    id: number = 0;
    name: String = "";
    profileQuestions: ProfileQuestionsDTO[] = [];
    
    constructor(goalDTO: GoalDTO) {
        this.id = goalDTO.id;
        this.name = goalDTO.name;
        this.profileQuestions = goalDTO.profileQuestions;
    };
}

export default GoalUpdateRequestDTO;