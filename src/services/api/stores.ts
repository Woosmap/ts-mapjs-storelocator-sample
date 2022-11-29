import HttpClient from "../http_client";
import {AssetFeatureCollectionResponse} from "../../types/stores";
import {StringMap} from "../../utils/utils";

export interface ParamsSearchRequest {
    query?: string;
    lat?: number;
    lng?: number;
    radius?: number;
    encoded_polyline?: string;
    stores_by_page?: number;
    page?: number;
    zone?: boolean;
}

export default class WoosmapStoresApi {
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    searchStores({...params}: ParamsSearchRequest): Promise<AssetFeatureCollectionResponse> {
        const apiPath = "/stores/search/";
        const options: RequestInit = {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        };
        return this.httpClient
            .call(apiPath, params as StringMap, options)
            .then((response: Response) => {
                return this.processSearchStores(response);
            });
    }

    protected processSearchStores(response: Response): Promise<AssetFeatureCollectionResponse> {
        const status = response.status;
        if (status === 200) {
            return response.json().then((data: AssetFeatureCollectionResponse) => {
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
        return Promise.resolve<AssetFeatureCollectionResponse>(null as any);
    }
}
