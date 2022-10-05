export const WoosmapPublicKey = "woos-48c80350-88aa-333e-835a-07f4b658a9a4"

export const mapPaddings: { [key: string]: woosmap.map.Padding } = {
    mobile: {left: 50, right: 50, top: 50, bottom: 350},
    full: {left: 450, right: 50, top: 50, bottom: 50}
}

export const StoresStyle: woosmap.map.Style = {
    breakPoint: 14,
    rules: [],
    default: {
        color: "#008a2f",
        size: 8,
        minSize: 1,
        icon: {
            url: "https://images.woosmap.com/starbucks-marker.svg",
            scaledSize: {
                height: 40,
                width: 34
            }
        },
        selectedIcon: {
            url: "https://images.woosmap.com/starbucks-marker-selected.svg",
            scaledSize: {
                height: 50,
                width: 43
            }
        }
    }
};
export const MapOptions: woosmap.map.MapOptions = {
    center: {lat: 46.2, lng: 3.2},
    zoom: 6,
    styles: [
        {
            featureType: "poi.business",
            elementType: "labels",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        },
        {
            featureType: "administrative",
            elementType: "all",
            stylers: [
                {
                    visibility: "on"
                },
                {
                    lightness: 33
                }
            ]
        },
        {
            featureType: "landscape",
            stylers: [
                {
                    hue: "#FFBB00"
                },
                {
                    saturation: 43.400000000000006
                },
                {
                    lightness: 37.599999999999994
                },
                {
                    gamma: 1
                }
            ]
        },
        {
            featureType: "road.highway",
            stylers: [
                {
                    hue: "#FFC200"
                },
                {
                    saturation: -61.8
                },
                {
                    lightness: 45.599999999999994
                },
                {
                    gamma: 1
                }
            ]
        },
        {
            featureType: "road.arterial",
            stylers: [
                {
                    hue: "#FF0300"
                },
                {
                    saturation: -100
                },
                {
                    lightness: 51.19999999999999
                },
                {
                    gamma: 1
                }
            ]
        },
        {
            featureType: "road.local",
            stylers: [
                {
                    hue: "#FF0300"
                },
                {
                    saturation: -100
                },
                {
                    lightness: 52
                },
                {
                    gamma: 1
                }
            ]
        },
        {
            featureType: "water",
            stylers: [
                {
                    hue: "#0078FF"
                },
                {
                    saturation: -13.200000000000003
                },
                {
                    lightness: 2.4000000000000057
                },
                {
                    gamma: 1
                }
            ]
        },
        {
            featureType: "poi",
            stylers: [
                {
                    hue: "#00FF6A"
                },
                {
                    saturation: -1.0989010989011234
                },
                {
                    lightness: 11.200000000000017
                },
                {
                    gamma: 1
                }
            ]
        }
    ],
    gestureHandling: 'greedy'
}
