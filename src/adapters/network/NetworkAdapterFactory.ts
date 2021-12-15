import INetworkAdapter from "./INetworkAdapter";
import AxiosNetworkAdapter from "./AxiosNetworkAdapter";

const networkAdapter: INetworkAdapter = new AxiosNetworkAdapter();

export default networkAdapter;