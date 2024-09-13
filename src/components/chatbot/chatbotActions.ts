import {GeolocationService} from "../../services/geolocation";
import {SearchLocation} from "../search/search";
import {getLocale, getLocaleLang} from "../../helpers/locale";
import {getConfig} from "../../configuration/config";

interface Action {
    action: string;
    parameters: {
        search?: string;
        from?: string;
        to?: string;
        [key: string]: any;
    };
}

export const handleSearch = async (
    localitiesService: woosmap.map.LocalitiesService,
    latlng: woosmap.map.LatLngLiteral | null,
    search: string | null
): Promise<woosmap.map.localities.LocalitiesGeocodeResult | woosmap.map.localities.LocalitiesDetailsResult | null> => {
    if (search && search !== "") {
        const autocompleteRequest: woosmap.map.localities.LocalitiesAutocompleteRequest = {
            input: search,
            types: getConfig().search.localitiesConf.types
        };

        try {
            const predictions = await localitiesService.autocomplete(autocompleteRequest);
            if (predictions.localities.length > 0) {
                const publicId = predictions.localities[0].public_id;
                const localityDetails = await localitiesService.getDetails({publicId, language: getLocaleLang()});
                return localityDetails.result || null;
            } else {
                console.log("No predictions found for search:", search);
                return null;
            }
        } catch (error) {
            console.error("Error fetching autocomplete predictions or place details:", error);
            return null;
        }
    } else if (latlng) {
        const localitiesRequest: woosmap.map.localities.LocalitiesGeocodeRequest = {
            latLng: latlng
        };
        try {
            const localities = await localitiesService.geocode(localitiesRequest);
            return localities.results[0] || null;
        } catch (error) {
            console.error("Error geocoding localities:", error);
            return null;
        }
    }

    return null;
};

export const getLocation = async (localitiesService: woosmap.map.LocalitiesService, param: string): Promise<SearchLocation | null> => {
    switch (param) {
        case "user_position":
        case "user_location":
        case "nearby_user": {
            const position: GeolocationPosition = await GeolocationService.getCurrentPosition();
            if (position) {
                return {
                    name: getLocale().search.yourLocation,
                    location: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }
                };
            } else {
                console.error("Unable to get user's location");
                return null;
            }
        }
        case "map_center":
        case "map_extent":
        case "current_map_view":
        case "current_mapview":
        case "current_view":
        case "user_viewport": {
            return null;
        }

        case "closest_store":
        case "nearest_store":
        case "nearby_stores":
        case "nearby_store": {
            return null;
        }

        default: {
            const result = await handleSearch(localitiesService, null, param);
            if (result) {
                return {
                    name: result.formatted_address,
                    publicId: result.public_id,
                    location: result.geometry?.location
                };
            } else {
                console.error(`No localities found for search: ${param}`);
                return null;
            }
        }
    }
};

export const handleFindNearestStores = async (localitiesService: woosmap.map.LocalitiesService, action: Action): Promise<SearchLocation | null> => {
    if (!action.parameters.search) {
        console.log("Search parameter is undefined");
        return null;
    }

    const searchLocation = await getLocation(localitiesService, action.parameters.search);
    if (!searchLocation) {
        console.error("Failed to get searched location");
        return null;
    }
    return searchLocation;
};

export const handleGetDirections = async (localitiesService: woosmap.map.LocalitiesService, action: Action): Promise<{
    origin: SearchLocation | null,
    destination: SearchLocation | null
} | null> => {
    if (!action.parameters.from) {
        console.log("From parameter is undefined");
        return null;
    }
    if (!action.parameters.to) {
        console.log("To parameter is undefined");
        return null;
    }

    const origin = await getLocation(localitiesService, action.parameters.from);
    const destination = await getLocation(localitiesService, action.parameters.to);

    return {origin, destination};
};
