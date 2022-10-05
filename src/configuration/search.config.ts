import {ParamsSearchRequest} from "../services/woosmap_stores";

export const LocalitiesConf: woosmap.localities.AutocompleteParameters = {
    minLength: 0,
    data: 'advanced'
};
export const SearchAPIParameters: ParamsSearchRequest = {
    stores_by_page: 15,
    radius: 500000
};
export const availableServices: Record<string, string>[] = [
    {serviceKey: 'WF', serviceName: 'Wireless Hotspot'},
    {serviceKey: 'CD', serviceName: 'Mobile Payment'},
    {serviceKey: 'DT', serviceName: 'Drive-Thru'},
    {serviceKey: 'DR', serviceName: 'Digital Rewards'},
    {serviceKey: 'hrs24', serviceName: 'Open 24 hours per day'},
    {serviceKey: 'WA', serviceName: 'Oven-warmed Food'},
    {serviceKey: 'LB', serviceName: 'LaBoulange'},
    {serviceKey: 'XO', serviceName: 'Mobile Order and Pay'},
    {serviceKey: 'VS', serviceName: 'Verismo'},
    {serviceKey: 'NB', serviceName: 'Nitro Cold Brew'},
    {serviceKey: 'CL', serviceName: 'Starbucks Reserve-Clover Brewed'},
];
