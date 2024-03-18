import {ParamsSearchRequest} from "../services/api/stores";

const localitiesConf: woosmap.localities.AutocompleteParameters = {
    minLength: 0,
    data: 'advanced',
    types: ['locality', 'postal_code', 'address', 'admin_level', 'airport', 'train_station', 'metro_station', 'shopping', 'country']
};
const searchAPIParameters: ParamsSearchRequest = {
    stores_by_page: 7,
    radius: 500000
};
const availableServices: Record<string, string>[] = [
    {serviceKey: 'WF'},
    {serviceKey: 'DT'},
    {serviceKey: 'DR'},
    {serviceKey: 'hrs24'},
    {serviceKey: 'WA'},
    {serviceKey: 'XO'},
    {serviceKey: 'NB'},
    {serviceKey: 'CL'},
];

export default {
    availableServices: availableServices,
    searchAPIParameters: searchAPIParameters,
    localitiesConf: localitiesConf
}
