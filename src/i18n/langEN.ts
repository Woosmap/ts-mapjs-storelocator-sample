/**
 * Language: English.
 */
export default {
    time: {
        openingHoursTitle: "Opening hours",
        at: "at",
        opensToday: "Opens today",
        opens: "Opens",
        open24_7: "Open 24/7",
        closed: "Closed",
        openUntil: "Open until",
        daily: "Daily opened",
        month: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ],
        monthAbbr: [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        dayOfWeek: [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
        ],
        dayOfWeekAbbr: [
            'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
        ]
    },
    search: {
        placeholder: "Search a location...",
        submitLabel: "Search",
        clearLabel: "Clear Search",
        yourLocation: "Your location",
    },
    filtering: {
        servicesTitle: "Services",
        services: {
            WF: 'Wireless Hotspot',
            DT: 'Drive-Thru',
            DR: 'Digital Rewards',
            hrs24: 'Open 24 hours per day',
            WA: 'Oven-warmed Food',
            XO: 'Mobile Order and Pay',
            NB: 'Nitro Cold Brew',
            CL: 'Starbucks Reserve-Clover Brewed',
        }
    },
    stores: {
        cta: {
            call: "Call",
            directions: "Directions",
            website: "Website"
        },
        messages: {
            initialHeader: "Start by searching a locality to display nearby stores",
            emptyHeader: "No store returned",
            initialBody: "or click on the Map to select a store",
            emptyBody: "Please Search a locality elsewhere or unselect your filters"
        }
    },
    directions: {
        avoidOptions: {
            highways: 'Highways',
            tolls: 'Tolls',
            ferries: 'Ferries'
        },
        unitOptions: {
            METRIC: 'km',
            IMPERIAL: 'miles'
        },
        options: "Route options",
        avoid: "Avoid",
        units: "Distance units",
        messages: {
            initialBody: "Search an origin and destination to see available routes and time travel.",
            error: "Sorry, we could not calculate driving directions",
            from: "from",
            to: "to",
            forTravelMode: "for the travel mode",
            via: "through",
            details: "Details",
            withoutTraffic: "without traffic",
            openGoogleMaps: "open in google maps"
        }
    },
    errors: {
        loadingLibrary: "failed to load the {library} script",
        geolocationFailed: "User Geolocation failed",
        apiErrors:{
            "401": "Unauthorized",
            "403": "Forbidden",
            "429": "Too many requests",
            "500": "Internal server error",
            other: "An unexpected server error occurred"
        }
    },
};
