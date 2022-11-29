import {objectToQueryString, StringMap} from "../utils/utils";

export interface IHttpClient {
    call(
        path: string,
        params: StringMap,
        init?: RequestInit
    ): Promise<Response>;
}

export default class HttpClient implements IHttpClient {
    private readonly apiKey: string;
    private readonly baseUrl: string;

    constructor(params: { apiKey: string; baseUrl: string }) {
        this.apiKey = params.apiKey;
        this.baseUrl = params.baseUrl;
    }

    async call(
        path: string,
        params: StringMap,
        init?: RequestInit
    ): Promise<Response> {
        params.key = this.apiKey;
        const apiUrl = `${this.baseUrl}${path}?${objectToQueryString(params)}`;
        return await fetch(apiUrl, {...init});
    }
}
