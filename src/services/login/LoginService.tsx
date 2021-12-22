import networkAdapter from "../../adapters/network/NetworkAdapterFactory";
import LoginDTO from "../../dto/LoginDTO";
import LoginRequestDTO from "./LoginRequestDTO";
class LoginService {
    async login(value: LoginDTO): Promise<any> {
        return networkAdapter.post("auth", new LoginRequestDTO(value));
    }

}

export default LoginService;