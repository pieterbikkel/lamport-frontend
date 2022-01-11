import axios, { AxiosRequestHeaders } from "axios";
import { toast } from "react-toastify";
import INetworkAdapter from "./INetworkAdapter";
import { createBrowserHistory } from 'history';

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

    public post = async (path: string, body?: any | undefined): Promise<any> => {
        return axios.post   (this.buildUrl(path), body, {
            headers: this.getHeaders()
        })
        .catch(ex => {
            if(ex.response.status === 403) {
                toast.error("U heeft geen toestemming om deze actie uit te voeren!");
            }
            return Promise.reject(ex);
        })
        .then(data => {
            return data
        });
    }

    public get = async (path: string): Promise<any> => {
        return axios.get(this.buildUrl(path), {
            headers: this.getHeaders()
        }).catch(ex => {
            if(ex.response.status === 403) {
                //todo redirect to home page - Bart(17-12-2021)
                createBrowserHistory().push('/');
                window.location.reload();
                //todo find a way to properly show the toast and make navigating more seamless - Bart(17-12-2021)
                toast.error("U heeft geen toestemming om deze pagina te bezoeken!");
            }
            return Promise.reject(ex);
        })
        .then(data => {
            return data
        });
    }

    public put = async (path: string, body?: any | undefined): Promise<any> => {
        return axios.put   (this.buildUrl(path), body, {
            headers: this.getHeaders()
        })
        .catch(ex => {
            if(ex.response.status === 403) {
                toast.error("U heeft geen toestemming om deze actie uit te voeren!");
            }
            return Promise.reject(ex);
        })
        .then(data => {
            return data
        });
    }
    
    public delete = async (path: string): Promise<any> => {
        return axios.delete   (this.buildUrl(path), {
            headers: this.getHeaders()
        })
        .catch(ex => {
            if(ex.response.status === 403) {
                toast.error("U heeft geen toestemming om deze actie uit te voeren!");
            }
            return Promise.reject(ex);
        })
        .then(data => {
            return data
        });
    }
}

export default AxiosNetworkAdapter;