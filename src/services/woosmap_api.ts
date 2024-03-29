import HttpClient from "./http_client";

import WoosmapStoresApi from "./api/stores";
import WoosmapDistanceApi from "./api/distance";
import {getConfig} from "../configuration/config";

export class WoosmapApiClient {
  private readonly httpClient: HttpClient;
  private readonly _stores: WoosmapStoresApi;
  private readonly _distance: WoosmapDistanceApi;

  constructor(params: { apiKey?: string; baseUrl?: string }) {
    this.httpClient = new HttpClient({
      ...params,
      baseUrl: params.baseUrl || getConfig().urls.baseApiUrl,
      apiKey: params.apiKey || getConfig().map.woosmapPublicKey,
    });

    this._stores = new WoosmapStoresApi(this.httpClient);
    this._distance = new WoosmapDistanceApi(this.httpClient);
  }

  public get stores(): WoosmapStoresApi {
    return this._stores;
  }
  public get distance(): WoosmapDistanceApi {
    return this._distance;
  }
}
