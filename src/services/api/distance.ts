import HttpClient from "../http_client";

export interface ParamsRouteRequest {
    origin: string;
    destination: string;
    mode?: string;
    language?: string;
    units?: string;
    alternatives?: boolean;
    waypoints?: string;
    method?: string;
    details?: string;
    avoid?: string;
}

export default class WoosmapDistanceApi {
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    route({...params}: ParamsRouteRequest): Promise<woosmap.map.DirectionResult> {
        const apiPath = "/distance/route/json";
        const options: RequestInit = {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        };
        return this.httpClient
            .call(apiPath, params, options)
            .then((response: Response) => {
                return this.processRoute(response);
            });
    }

    processRoute(response: Response): Promise<woosmap.map.DirectionResult> {
        const status = response.status;
        if (status === 200) {
            return response.json().then((data: woosmap.map.DirectionResult) => {
                return data;
            });
        } else if (status === 401) {
            throw new Error("Unauthorized");
        } else if (status === 403) {
            throw new Error("Forbidden");
        } else if (status === 429) {
            throw new Error("Too many requests");
        } else if (status === 500) {
            throw new Error("Internal server error");
        } else if (status !== 200 && status !== 204) {
            throw new Error("An unexpected server error occurred.");
        }
        return Promise.resolve<woosmap.map.DirectionResult>(null as any);
    }
}
