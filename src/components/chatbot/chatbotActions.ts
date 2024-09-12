import {GeolocationService} from "../../services/geolocation";
import {SearchLocation} from "../search/search";
import {getLocale} from "../../helpers/locale";

interface Action {
    action: string;
    parameters: {
        search?: string;
        [key: string]: any;
    };
}

export const handleGeocode = async (localitiesService: woosmap.map.LocalitiesService, latlng: woosmap.map.LatLngLiteral | null, search: string | null
): Promise<woosmap.map.localities.LocalitiesGeocodeResult | null> => {
    const localitiesRequest: woosmap.map.localities.LocalitiesGeocodeRequest = {};
    if (latlng) {
        localitiesRequest.latLng = latlng;
    } else if (search && search !== "") {
        localitiesRequest.address = search;
    }

    if (localitiesRequest.latLng || localitiesRequest.address) {
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

export const handleFindNearestStores = async (localitiesService: woosmap.map.LocalitiesService, action: Action): Promise<SearchLocation | null> => {
    if (!action.parameters.search) {
        console.log("Search parameter is undefined");
        return null;
    }

    let searchLocation: SearchLocation | null = null;

    switch (action.parameters.search) {
        case "user_position":
        case "user_location":
        case "nearby_user": {
            const position: GeolocationPosition = await GeolocationService.getCurrentPosition();
            if (position) {
                searchLocation = {
                    name: getLocale().search.yourLocation,
                    location: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }
                };
            } else {
                console.log("Unable to get user's location");
            }
            break;
        }
        case "map_center":
        case "map_extent":
        case "current_mapview": {
            searchLocation = null;
            break;
        }
        default: {
            const result = await handleGeocode(localitiesService, null, action.parameters.search);
            if (result) {
                searchLocation = {
                    name: result.formatted_address,
                    publicId: result.public_id,
                    location: result.geometry?.location
                };
            } else {
                console.log(`No localities found for search: ${action.parameters.search}`);
            }
        }
    }

    return searchLocation;
};