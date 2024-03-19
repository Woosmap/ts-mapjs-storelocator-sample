const woosmapPublicKey = "woos-48c80350-88aa-333e-835a-07f4b658a9a4";

const mobileBreakPoint = 768;

const userLocationIconOptions: woosmap.map.Icon = {
    url: "https://images.woosmap.com/user-position.png",
    scaledSize: {
        height: 32,
        width: 32,
    },
}
const mapPaddings: { [key: string]: woosmap.map.Padding } = {
    mobile: {left: 50, right: 50, top: 50, bottom: 550},
    full: {left: 450, right: 50, top: 50, bottom: 50},
};

const storesStyle: woosmap.map.Style = {
    breakPoint: 11,
    rules: [],
    default: {
        color: "#008a2f",
        size: 8,
        minSize: 1,
        icon: {
            url: "https://images.woosmap.com/starbucks-marker.svg",
            scaledSize: {
                height: 40,
                width: 34,
            },
        },
        selectedIcon: {
            url: "https://images.woosmap.com/starbucks-marker-selected.svg",
            scaledSize: {
                height: 50,
                width: 43,
            },
        },
    },
};
const mapOptions: woosmap.map.MapOptions = {
    center: {lat: 46.2, lng: 3.2},
    zoom: 6,
    styles: [
        {
            featureType: "point_of_interest",
            elementType: "all",
            stylers: [
                {
                    visibility: "on"
                }
            ]
        }, {
            featureType: "point_of_interest.business.shop",
            elementType: "all",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        }, {
            featureType: "point_of_interest.business.food_and_drinks",
            elementType: "all",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        },
    ],
    gestureHandling: "greedy",
};


export default {
    mapOptions: mapOptions,
    storesStyle: storesStyle,
    mapPaddings: mapPaddings,
    mobileBreakPoint: mobileBreakPoint,
    woosmapPublicKey: woosmapPublicKey,
    userLocationIconOptions: userLocationIconOptions,
}
