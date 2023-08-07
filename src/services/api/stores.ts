import HttpClient from "../http_client";
import {AssetFeatureCollectionResponse} from "../../types/stores";
import {StringMap} from "../../utils/utils";
import {getLocale} from "../../helpers/locale";

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
            throw new Error(getLocale().errors.apiErrors["401"]);
        } else if (status === 403) {
            throw new Error(getLocale().errors.apiErrors["403"]);
        } else if (status === 429) {
            throw new Error(getLocale().errors.apiErrors["429"]);
        } else if (status === 500) {
            throw new Error(getLocale().errors.apiErrors["500"]);
        } else if (status !== 200 && status !== 204) {
            throw new Error(getLocale().errors.apiErrors.other);
        }
        return Promise.resolve<AssetFeatureCollectionResponse>(null as any);
    }
}
