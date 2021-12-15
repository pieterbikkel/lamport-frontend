import axios, { AxiosRequestHeaders } from "axios";
import INetworkAdapter from "./INetworkAdapter";

class AxiosNetworkAdapter implements INetworkAdapter {
    private url: string = "http://localhost:8080";
    private stripSlash = (path: string) => path.charAt(0) == "/" ? path.slice(1) : path;
    private buildUrl = (path: string): string => `${this.url}/${this.stripSlash(path)}`;
    private getHeaders = () : AxiosRequestHeaders => {
        if(localStorage.getItem("token") === null) {
            return {};
        }

        return {
            'Authorization': "Bearer " + localStorage.getItem("token")
        };
    };

    public post   = (path: string, body?: any | undefined): Promise<any> => axios.post   (this.buildUrl(path), body, {
        headers: this.getHeaders()
    });
    public get    = (path: string): Promise<any> => axios.get                            (this.buildUrl(path), {
        headers: this.getHeaders()
    });
    public put    = (path: string, body?: any | undefined): Promise<any> => axios.put    (this.buildUrl(path), body, {
        headers: this.getHeaders()
    });
    public delete = (path: string): Promise<any> => axios.delete                         (this.buildUrl(path), {
        headers: this.getHeaders()
    });
}

export default AxiosNetworkAdapter;