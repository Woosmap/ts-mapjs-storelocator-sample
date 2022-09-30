import {AssetFeatureCollectionResponse} from "../types/stores/asset_response";
import Urls from "../configuration/urls.config";
import {objectToQueryString} from "../utils/utils";

export interface ParamsSearchRequest {
    key?: string
    query?: string;
    lat?: number;
    lng?: number;
    radius?: number;
    encoded_polyline?: string
    stores_by_page?: number;
    page?: number;
    zone?: boolean;
}

export class WoosmapApiClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    private apiKey: string;

    constructor(publicApiKey: string, baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = Urls.baseApiUrl;
        this.apiKey = publicApiKey;
    }

    searchStores({...params}: ParamsSearchRequest): Promise<AssetFeatureCollectionResponse> {
        params.key = this.apiKey;
        const url_ = `${this.baseUrl}/search/?${objectToQueryString(params)}`;
        const options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_)
            .then((_response: Response) => {
                return this.processSearchStores(_response);
            });
    }

    protected processSearchStores(response: Response): Promise<AssetFeatureCollectionResponse> {
        const status = response.status;
        const _headers: any = {};
        if (response.headers && response.headers.forEach) {
            response.headers.forEach((v: any, k: any) => _headers[k] = v);
        }
        if (status === 200) {
            return response.json().then((data: AssetFeatureCollectionResponse) => {
                return data
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
