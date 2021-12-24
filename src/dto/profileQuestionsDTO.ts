class ProfileQuestionsDTO {
    id: number = 0;
	name: string = "";

    constructor(profileQuestionsDTO?: ProfileQuestionsDTO) {
        Object.assign(this, profileQuestionsDTO);
    }
}

export default ProfileQuestionsDTO;
