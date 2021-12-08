import networkAdapter from "../../adapters/NetworkAdapterFactory";
import LoginDTO from "../../dto/LoginDTO";
import LoginRequestDTO from "./LoginRequestDTO";
class LoginService {
    async login(value: LoginDTO): Promise<void> {
        return networkAdapter.post("login", new LoginRequestDTO(value));
    }

}

export default LoginService;