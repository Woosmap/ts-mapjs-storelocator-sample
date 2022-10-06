export type StringMap = Record<string, string | number | boolean>;


export function objectToQueryString(params: StringMap): string {
    let queryString = "";
    Object.keys(params).forEach((key) => {
        if (queryString.length !== 0) queryString += "&";
        queryString += key + "=" + params[key].toString();
    });
    return queryString;
}
