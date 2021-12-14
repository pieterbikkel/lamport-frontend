import LoginDTO from "../../dto/LoginDTO";

class LoginRequestDTO {
    username: String = "";
    password: String = "";
    
    constructor(loginDTO: LoginDTO) {
        this.username = loginDTO.username;
        this.password = loginDTO.password;
    };
}

export default LoginRequestDTO;