import networkAdapter from "../../adapters/network/NetworkAdapterFactory";
import GoalDTO from "../../dto/GoalDTO";
import ProfileQuestionsDTO from "../../dto/profileQuestionsDTO";
import IService from "../IService";
import GoalCreateRequestDTO from "./GoalCreateRequestDTO";
import GoalUpdateRequestDTO from "./GoalUpdateRequestDTO";

class GoalService implements IService<GoalDTO> {
    async loadAll(): Promise<GoalDTO[]> {
        return networkAdapter
            .get("goals")
            .then(response => response.data)
            .then(goal => {
                let toReturn = [] as GoalDTO[];
                goal.forEach((goal: any) => {
                    let goalDTO: GoalDTO = new GoalDTO();
                    goalDTO.id = goal.id;
                    goalDTO.name = goal.name;
                    toReturn.push(goalDTO);
                    let questions : ProfileQuestionsDTO[] = [];

                    goal.profileQuestions.forEach((profileQuestions:any) => {
                        let profileQuestionsDTO = new ProfileQuestionsDTO();

                        profileQuestionsDTO.id = profileQuestions.id;
                        profileQuestionsDTO.name = profileQuestions.name;

                        questions.push(profileQuestionsDTO);
                    })

                    goalDTO.profileQuestions = questions;
                    questions.push(goalDTO);
                });

                return toReturn;
            });
    }
    
    async loadOne(id: number): Promise<GoalDTO> {
        return networkAdapter
            .get("goals/" + id)
            .then(response => response.data)
            .then(goal => {
                let goalDTO = new GoalDTO();
                goalDTO.id = goal.id;
                goalDTO.name = goal.name;
                let questions : ProfileQuestionsDTO[] = [];

                goal.profileQuestions.forEach((profileQuestions:any) => {
                    let profileQuestionsDTO = new ProfileQuestionsDTO();

                    profileQuestionsDTO.id = profileQuestions.id;
                    profileQuestionsDTO.name = profileQuestions.name;

                    questions.push(profileQuestionsDTO);
                })

                goalDTO.profileQuestions = questions;

                return goalDTO;
            });
    }
    async update(value: GoalDTO): Promise<void> {
        return networkAdapter.put("goals", new GoalUpdateRequestDTO(value));
    }
    async create(value: GoalDTO): Promise<void> {
        return networkAdapter.post("goals", new GoalCreateRequestDTO(value));
    }
    async delete(id: number): Promise<void> {
        return networkAdapter.delete("goals/" + id);
    }

}

export default GoalService;