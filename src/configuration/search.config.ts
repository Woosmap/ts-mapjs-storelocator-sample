import {ParamsSearchRequest} from "../services/woosmap_stores";

export const LocalitiesConf: woosmap.localities.AutocompleteParameters = {
    minLength: 0,
    data: 'advanced'
};
export const SearchAPIParameters: ParamsSearchRequest = {
    stores_by_page: 15,
    radius: 500000
};
