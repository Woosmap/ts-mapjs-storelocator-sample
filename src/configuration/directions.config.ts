const directionsOptions: Record<string, string | boolean | string[]> = {
    travelMode: 'DRIVING',
    unitSystem: 'METRIC',
    provideRouteAlternatives: true,
    avoid: []
}

const avoidOptions: Record<string, string>[] = [
    {paramKey: 'highways'},
    {paramKey: 'tolls'},
    {paramKey: 'ferries'}
]
const unitOptions: Record<string, string>[] = [
    {paramKey: 'METRIC'},
    {paramKey: 'IMPERIAL'}
]


const travelModes: Record<string, string>[] = [
    {
        modeKey: 'DRIVING',
        defaultIcon: 'https://images.woosmap.com/directions/drive.png',
        selectedIcon: 'https://images.woosmap.com/directions/drive_selected.png',
        darkIcon: 'https://images.woosmap.com/directions/drive_black.png'
    },
    {
        modeKey: 'WALKING',
        defaultIcon: 'https://images.woosmap.com/directions/walk.png',
        selectedIcon: 'https://images.woosmap.com/directions/walk_selected.png',
        darkIcon: 'https://images.woosmap.com/directions/walk_black.png'
    },
    {
        modeKey: 'CYCLING',
        defaultIcon: 'https://images.woosmap.com/directions/bicycle.png',
        selectedIcon: 'https://images.woosmap.com/directions/bicycle_selected.png',
        darkIcon: 'https://images.woosmap.com/directions/bicycle_black.png'
    }
];

const iconsDirections: Record<string, woosmap.map.Icon> = {
    start: {
        url: 'https://images.woosmap.com/directions/directions_start.png',
        scaledSize: {height: 14, width: 14}
    },
    end: {
        url: 'https://images.woosmap.com/directions/directions_destination.png',
        scaledSize: {height: 16, width: 16}
    }
};

const stepsIcon: Record<string, string | number>[] = [
    {index: 1, key: 'Start', icon: 'https://images.woosmap.com/directions/straight_black.png'},
    {index: 2, key: 'StartRight', icon: 'https://images.woosmap.com/directions/turn_slight_left_black.png'},
    {index: 3, key: 'StartLeft', icon: 'https://images.woosmap.com/directions/turn_slight_left_black.png'},
    {index: 4, key: 'Destination', icon: 'https://images.woosmap.com/directions/straight_black.png'},
    {index: 5, key: 'DestinationRight', icon: 'https://images.woosmap.com/directions/turn_slight_left_black.png'},
    {index: 6, key: 'DestinationLeft', icon: 'https://images.woosmap.com/directions/turn_slight_left_black.png'},
    {index: 8, key: 'Continue', icon: 'https://images.woosmap.com/directions/straight_black.png'},
    {index: 9, key: 'SlightRight', icon: 'https://images.woosmap.com/directions/turn_slight_left_black.png'},
    {index: 10, key: 'Right', icon: 'https://images.woosmap.com/directions/turn_left_black.png'},
    {index: 11, key: 'SharpRight', icon: 'https://images.woosmap.com/directions/turn_left_black.png'},
    {index: 12, key: 'UturnRight', icon: 'https://images.woosmap.com/directions/turn_left_black.png'},
    {index: 13, key: 'UturnLeft', icon: 'https://images.woosmap.com/directions/turn_left_black.png'},
    {index: 14, key: 'SharpLeft', icon: 'https://images.woosmap.com/directions/turn_left_black.png'},
    {index: 15, key: 'Left', icon: 'https://images.woosmap.com/directions/turn_left_black.png'},
    {index: 16, key: 'SlightLeft', icon: 'https://images.woosmap.com/directions/turn_slight_left_black.png'},
    {index: 17, key: 'RampStraight', icon: 'https://images.woosmap.com/directions/straight_black.png'},
    {index: 18, key: 'RampRight', icon: 'https://images.woosmap.com/directions/merge_slight_left_black.png'},
    {index: 19, key: 'RampLeft', icon: 'https://images.woosmap.com/directions/merge_slight_left_black.png'},
    {index: 20, key: 'ExitRight', icon: 'https://images.woosmap.com/directions/merge_left_black.png'},
    {index: 21, key: 'ExitLeft', icon: 'https://images.woosmap.com/directions/merge_left_black.png'},
    {index: 22, key: 'StayStraight', icon: 'https://images.woosmap.com/directions/straight_black.png'},
    {index: 23, key: 'StayRight', icon: 'https://images.woosmap.com/directions/merge_slight_left_black.png'},
    {index: 24, key: 'StayLeft', icon: 'https://images.woosmap.com/directions/merge_slight_left_black.png'},
    {index: 25, key: 'Merge', icon: 'https://images.woosmap.com/directions/merge_black.png'},
    {index: 26, key: 'RoundaboutEnter', icon: 'https://images.woosmap.com/directions/roundabout_black.png'},
    {index: 27, key: 'RoundaboutExit', icon: 'https://images.woosmap.com/directions/roundabout_black.png'},
    {index: 28, key: 'FerryEnter', icon: 'https://images.woosmap.com/directions/boat_black.png'},
    {index: 29, key: 'FerryExit', icon: 'https://images.woosmap.com/directions/boat_black.png'},
    {index: 37, key: 'MergeRight', icon: 'https://images.woosmap.com/directions/merge_left_black.png'},
    {index: 38, key: 'MergeLeft', icon: 'https://images.woosmap.com/directions/merge_left_black.png'},
]

export default {
    stepsIcon: stepsIcon,
    iconsDirections: iconsDirections,
    travelModes: travelModes,
    unitOptions: unitOptions,
    avoidOptions: avoidOptions,
    directionsOptions: directionsOptions
}
