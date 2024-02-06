import {getConfig} from "../../src/configuration/config";

export default {
    "version": 8,
    "name": "Streets",
    "sources": {
        "openmaptiles": {
            "type": "vector",
            "url": `https://api.woosmap.com/maps/tiles.json?key=${getConfig().map.woosmapPublicKey}`
        }
    },
    "sprite": "https://sdk.woosmap.com/map/assets/styles/streets-v1/sprites/sprite",
    "glyphs": "https://sdk.woosmap.com/map/assets/{fontstack}/{range}.pbf",
    "layers": [
        {
            "id": "background",
            "type": "background",
            "metadata": {
                "featureType": "landscape.natural.background",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "layout": {
                "visibility": "visible"
            },
            "paint": {
                "background-color": "rgba(252, 247, 229, 1)"
            }
        },
        {
            "id": "landuse_hospital",
            "type": "fill",
            "metadata": {
                "featureType": "point_of_interest.medical",
                "elementTypes": [
                    "geometry"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "landuse",
            "filter": [
                "==",
                "class",
                "hospital"
            ],
            "paint": {
                "fill-color": "rgba(249, 225, 220, 1)"
            }
        },
        {
            "id": "landuse_school",
            "type": "fill",
            "metadata": {
                "featureType": "point_of_interest.education",
                "elementTypes": [
                    "geometry"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "landuse",
            "filter": [
                "==",
                "class",
                "school"
            ],
            "paint": {
                "fill-color": "rgb(236,238,204)"
            }
        },
        {
            "id": "landuse_university",
            "type": "fill",
            "metadata": {
                "featureType": "point_of_interest.education",
                "elementTypes": [
                    "geometry"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "landuse",
            "filter": [
                "==",
                "class",
                "university"
            ],
            "paint": {
                "fill-color": "rgb(236,238,204)"
            }
        },
        {
            "id": "landuse_stadium",
            "type": "fill",
            "metadata": {
                "featureType": "point_of_interest.sports_complex",
                "elementTypes": [
                    "geometry"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "landuse",
            "filter": [
                "all",
                [
                    "in",
                    "class",
                    "stadium",
                    "pitch",
                    "track"
                ]
            ],
            "paint": {
                "fill-color": "rgb(236,238,204)"
            }
        },
        {
            "id": "national_park",
            "type": "fill",
            "source": "openmaptiles",
            "source-layer": "park",
            "metadata": {
                "featureType": "point_of_interest.park"
            },
            "filter": [
                "in",
                "class",
                "parc_naturel_r\u00e9gional"
            ],
            "paint": {
                "fill-antialias": false,
                "fill-color": "hsla(98, 61%, 72%, 0.7)",
                "fill-opacity": 0.2
            },
            "layout": {
                "visibility": "visible"
            }
        },
        {
            "id": "landcover_park",
            "type": "fill",
            "source": "openmaptiles",
            "source-layer": "landcover",
            "metadata": {
                "featureType": "point_of_interest.park"
            },
            "filter": [
                "all",
                [
                    "==",
                    "class",
                    "grass"
                ],
                [
                    "==",
                    "subclass",
                    "park"
                ]
            ],
            "paint": {
                "fill-antialias": false,
                "fill-color": "hsla(98, 61%, 72%, 0.7)",
                "fill-opacity": 0.2
            },
            "layout": {
                "visibility": "visible"
            }
        },
        {
            "id": "wgslandcover_built_up",
            "metadata": {
                "featureType": "landscape.man_made.built_up"
            },
            "type": "fill",
            "source": "openmaptiles",
            "source-layer": "wgslandcover",
            "maxzoom": 8,
            "filter": [
                "==",
                "class",
                "built-up"
            ],
            "paint": {
                "fill-opacity": {
                    "stops": [
                        [
                            0,
                            1
                        ],
                        [
                            7,
                            1
                        ],
                        [
                            8,
                            0
                        ]
                    ]
                },
                "fill-color": "#ececec",
                "fill-outline-color": "transparent"
            }
        },
        {
            "id": "wgslandcover_wood",
            "metadata": {
                "featureType": "landscape.natural.landcover.wood"
            },
            "type": "fill",
            "source": "openmaptiles",
            "source-layer": "wgslandcover",
            "maxzoom": 8,
            "filter": [
                "==",
                "class",
                "wood"
            ],
            "paint": {
                "fill-opacity": {
                    "stops": [
                        [
                            0,
                            1
                        ],
                        [
                            7,
                            1
                        ],
                        [
                            8,
                            0
                        ]
                    ]
                },
                "fill-color": "#d3f5d1",
                "fill-outline-color": "transparent"
            }
        },
        {
            "id": "wgslandcover_grass",
            "metadata": {
                "featureType": "landscape.natural.landcover.grass"
            },
            "type": "fill",
            "source": "openmaptiles",
            "source-layer": "wgslandcover",
            "maxzoom": 8,
            "filter": [
                "==",
                "class",
                "grass"
            ],
            "paint": {
                "fill-opacity": {
                    "stops": [
                        [
                            0,
                            1
                        ],
                        [
                            7,
                            1
                        ],
                        [
                            8,
                            0
                        ]
                    ]
                },
                "fill-color": "#eeffed",
                "fill-outline-color": "transparent"
            }
        },
        {
            "id": "wgslandcover_bare_sparse_vegetation",
            "metadata": {
                "featureType": "landscape.natural.landcover.bare_sparse_vegetation"
            },
            "type": "fill",
            "source": "openmaptiles",
            "source-layer": "wgslandcover",
            "maxzoom": 8,
            "filter": [
                "==",
                "class",
                "bare_sparse_vegetation"
            ],
            "paint": {
                "fill-opacity": {
                    "stops": [
                        [
                            0,
                            1
                        ],
                        [
                            7,
                            1
                        ],
                        [
                            8,
                            0
                        ]
                    ]
                },
                "fill-color": "#f6f8e5",
                "fill-outline-color": "transparent"
            }
        },
        {
            "id": "wgslandcover_ice",
            "metadata": {
                "featureType": "landscape.natural.landcover.ice"
            },
            "type": "fill",
            "source": "openmaptiles",
            "source-layer": "wgslandcover",
            "maxzoom": 8,
            "filter": [
                "==",
                "class",
                "ice"
            ],
            "paint": {
                "fill-opacity": {
                    "stops": [
                        [
                            0,
                            1
                        ],
                        [
                            7,
                            1
                        ],
                        [
                            8,
                            0
                        ]
                    ]
                },
                "fill-color": "#fff",
                "fill-outline-color": "transparent"
            }
        },
        {
            "id": "waterway_tunnel",
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "waterway",
            "metadata": {
                "featureType": "water"
            },
            "minzoom": 14,
            "filter": [
                "all",
                [
                    "==",
                    "brunnel",
                    "tunnel"
                ]
            ],
            "layout": {
                "line-cap": "round"
            },
            "paint": {
                "line-color": "#a0c8f0",
                "line-width": {
                    "base": 1.3,
                    "stops": [
                        [
                            13,
                            0.5
                        ],
                        [
                            20,
                            6
                        ]
                    ]
                },
                "line-dasharray": [
                    2,
                    4
                ]
            }
        },
        {
            "id": "waterway_river",
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "waterway",
            "metadata": {
                "featureType": "water"
            },
            "filter": [
                "all",
                [
                    "==",
                    "class",
                    "river"
                ],
                [
                    "!=",
                    "brunnel",
                    "tunnel"
                ],
                [
                    "!=",
                    "intermittent",
                    1
                ]
            ],
            "layout": {
                "line-cap": "round"
            },
            "paint": {
                "line-color": "#a0c8f0",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            11,
                            0.5
                        ],
                        [
                            20,
                            6
                        ]
                    ]
                }
            }
        },
        {
            "id": "waterway_river_intermittent",
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "waterway",
            "metadata": {
                "featureType": "water"
            },
            "filter": [
                "all",
                [
                    "==",
                    "class",
                    "river"
                ],
                [
                    "!=",
                    "brunnel",
                    "tunnel"
                ],
                [
                    "==",
                    "intermittent",
                    1
                ]
            ],
            "layout": {
                "line-cap": "round"
            },
            "paint": {
                "line-color": "#a0c8f0",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            11,
                            0.5
                        ],
                        [
                            20,
                            6
                        ]
                    ]
                },
                "line-dasharray": [
                    3,
                    2
                ]
            }
        },
        {
            "id": "waterway_other",
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "waterway",
            "metadata": {
                "featureType": "water"
            },
            "filter": [
                "all",
                [
                    "!=",
                    "class",
                    "river"
                ],
                [
                    "!=",
                    "brunnel",
                    "tunnel"
                ],
                [
                    "!=",
                    "intermittent",
                    1
                ]
            ],
            "layout": {
                "line-cap": "round"
            },
            "paint": {
                "line-color": "#a0c8f0",
                "line-width": {
                    "base": 1.3,
                    "stops": [
                        [
                            13,
                            0.5
                        ],
                        [
                            20,
                            6
                        ]
                    ]
                }
            }
        },
        {
            "id": "waterway_other_intermittent",
            "type": "line",
            "metadata": {
                "featureType": "water"
            },
            "source": "openmaptiles",
            "source-layer": "waterway",
            "filter": [
                "all",
                [
                    "!=",
                    "class",
                    "river"
                ],
                [
                    "!=",
                    "brunnel",
                    "tunnel"
                ],
                [
                    "==",
                    "intermittent",
                    1
                ]
            ],
            "layout": {
                "line-cap": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "#a0c8f0",
                "line-width": {
                    "base": 1.3,
                    "stops": [
                        [
                            13,
                            0.5
                        ],
                        [
                            20,
                            6
                        ]
                    ]
                },
                "line-dasharray": [
                    4,
                    3
                ]
            }
        },
        {
            "id": "landcover_sand",
            "metadata": {
                "featureType": "landscape.natural.landcover"
            },
            "type": "fill",
            "source": "openmaptiles",
            "source-layer": "landcover",
            "filter": [
                "all",
                [
                    "in",
                    "class",
                    "sand"
                ]
            ],
            "paint": {
                "fill-antialias": false,
                "fill-color": "#f2e9ac",
                "fill-opacity": 1
            },
            "layout": {
                "visibility": "visible"
            }
        },
        {
            "id": "landcover_sand_outline",
            "type": "line",
            "metadata": {
                "featureType": "landscape.natural.landcover"
            },
            "source": "openmaptiles",
            "source-layer": "landcover",
            "filter": [
                "all",
                [
                    "in",
                    "class",
                    "sand"
                ]
            ],
            "paint": {
                "line-color": "#f2e9ac",
                "line-width": 2
            },
            "layout": {
                "visibility": "visible"
            }
        },
        {
            "id": "water",
            "type": "fill",
            "metadata": {
                "featureType": "water"
            },
            "source": "openmaptiles",
            "source-layer": "water",
            "layout": {
                "visibility": "visible"
            },
            "paint": {
                "fill-color": "rgba(134, 204, 250, 1)"
            },
            "filter": [
                "all",
                [
                    "!=",
                    "intermittent",
                    1
                ]
            ]
        },
        {
            "id": "water_intermittent",
            "type": "fill",
            "metadata": {
                "featureType": "water"
            },
            "source": "openmaptiles",
            "source-layer": "water",
            "layout": {
                "visibility": "visible"
            },
            "paint": {
                "fill-color": "rgba(172, 218, 251, 1)",
                "fill-opacity": 0.85
            },
            "filter": [
                "all",
                [
                    "==",
                    "intermittent",
                    1
                ]
            ]
        },
        {
            "id": "landcover_ice",
            "metadata": {
                "featureType": "landscape.natural.landcover"
            },
            "type": "fill",
            "source": "openmaptiles",
            "source-layer": "landcover",
            "filter": [
                "all",
                [
                    "in",
                    "class",
                    "ice"
                ]
            ],
            "paint": {
                "fill-antialias": false,
                "fill-color": "white",
                "fill-opacity": 1
            },
            "layout": {
                "visibility": "visible"
            }
        },
        {
            "id": "landcover_residential",
            "type": "fill",
            "source": "openmaptiles",
            "source-layer": "landcover",
            "filter": [
                "all",
                [
                    "==",
                    "class",
                    "residential"
                ]
            ],
            "paint": {
                "fill-antialias": false,
                "fill-color": "white",
                "fill-opacity": 1
            },
            "layout": {
                "visibility": "visible"
            }
        },
        {
            "id": "landcover_wood",
            "metadata": {
                "featureType": "landscape.natural.landcover"
            },
            "type": "fill",
            "source": "openmaptiles",
            "source-layer": "landcover",
            "filter": [
                "all",
                [
                    "in",
                    "class",
                    "wood"
                ]
            ],
            "paint": {
                "fill-antialias": false,
                "fill-color": "hsla(98, 61%, 72%, 0.7)",
                "fill-opacity": 0.4
            },
            "layout": {
                "visibility": "visible"
            }
        },
        {
            "id": "landcover_grass",
            "metadata": {
                "featureType": "landscape.natural.landcover"
            },
            "type": "fill",
            "source": "openmaptiles",
            "source-layer": "landcover",
            "filter": [
                "all",
                [
                    "in",
                    "class",
                    "grass"
                ],
                [
                    "==",
                    "subclass",
                    "grassland"
                ]
            ],
            "paint": {
                "fill-antialias": false,
                "fill-color": "hsla(98, 61%, 72%, 0.7)",
                "fill-opacity": 0.2
            },
            "layout": {
                "visibility": "visible"
            }
        },
        {
            "id": "aeroway_fill",
            "type": "fill",
            "metadata": {
                "featureType": "transit.station.airport",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "aeroway",
            "minzoom": 11,
            "filter": [
                "==",
                "$type",
                "Polygon"
            ],
            "paint": {
                "fill-color": "rgba(229, 228, 224, 1)",
                "fill-opacity": 0.7
            }
        },
        {
            "id": "aeroway_runway",
            "type": "line",
            "metadata": {
                "featureType": "transit.station.airport",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "aeroway",
            "minzoom": 11,
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "==",
                    "class",
                    "runway"
                ]
            ],
            "paint": {
                "line-color": "#f0ede9",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            11,
                            3
                        ],
                        [
                            20,
                            16
                        ]
                    ]
                }
            }
        },
        {
            "id": "aeroway_taxiway",
            "type": "line",
            "metadata": {
                "featureType": "road.arterial"
            },
            "source": "openmaptiles",
            "source-layer": "aeroway",
            "minzoom": 11,
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "==",
                    "class",
                    "taxiway"
                ]
            ],
            "paint": {
                "line-color": "#f0ede9",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            11,
                            0.5
                        ],
                        [
                            20,
                            6
                        ]
                    ]
                }
            }
        },
        {
            "id": "ferry",
            "type": "line",
            "metadata": {
                "featureType": "ferry"
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "in",
                    "class",
                    "ferry"
                ]
            ],
            "layout": {
                "line-join": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "rgba(108, 159, 182, 1)",
                "line-width": 1.1,
                "line-dasharray": [
                    2,
                    2
                ]
            }
        },
        {
            "id": "tunnel_motorway_link_casing",
            "type": "line",
            "metadata": {
                "featureType": "road",
                "elementTypes": [
                    "geometry.stroke"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "class",
                    "motorway"
                ],
                [
                    "==",
                    "ramp",
                    1
                ],
                [
                    "==",
                    "brunnel",
                    "tunnel"
                ]
            ],
            "layout": {
                "line-join": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "#e9ac77",
                "line-dasharray": [
                    0.5,
                    0.25
                ],
                "line-opacity": 1,
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            12,
                            1
                        ],
                        [
                            13,
                            3
                        ],
                        [
                            14,
                            4
                        ],
                        [
                            20,
                            15
                        ]
                    ]
                }
            }
        },
        {
            "id": "tunnel_service_track_casing",
            "type": "line",
            "metadata": {
                "featureType": "road",
                "elementTypes": [
                    "geometry.stroke"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "brunnel",
                    "tunnel"
                ],
                [
                    "in",
                    "class",
                    "service",
                    "track"
                ]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#cfcdca",
                "line-dasharray": [
                    0.5,
                    0.25
                ],
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            15,
                            1
                        ],
                        [
                            16,
                            4
                        ],
                        [
                            20,
                            11
                        ]
                    ]
                }
            }
        },
        {
            "id": "tunnel_link_casing",
            "type": "line",
            "metadata": {
                "featureType": "road",
                "elementTypes": [
                    "geometry.stroke"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "ramp",
                    "1"
                ],
                [
                    "==",
                    "brunnel",
                    "tunnel"
                ]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#e9ac77",
                "line-opacity": 1,
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            12,
                            1
                        ],
                        [
                            13,
                            3
                        ],
                        [
                            14,
                            4
                        ],
                        [
                            20,
                            15
                        ]
                    ]
                }
            }
        },
        {
            "id": "tunnel_street_casing",
            "type": "line",
            "metadata": {
                "featureType": "road",
                "elementTypes": [
                    "geometry.stroke"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "brunnel",
                    "tunnel"
                ],
                [
                    "in",
                    "class",
                    "street",
                    "street_limited"
                ]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#cfcdca",
                "line-opacity": {
                    "stops": [
                        [
                            12,
                            0
                        ],
                        [
                            12.5,
                            1
                        ]
                    ]
                },
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            12,
                            0.5
                        ],
                        [
                            13,
                            1
                        ],
                        [
                            14,
                            4
                        ],
                        [
                            20,
                            15
                        ]
                    ]
                }
            }
        },
        {
            "id": "tunnel_secondary_tertiary_casing",
            "type": "line",
            "metadata": {
                "featureType": "road",
                "elementTypes": [
                    "geometry.stroke"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "brunnel",
                    "tunnel"
                ],
                [
                    "in",
                    "class",
                    "secondary",
                    "tertiary"
                ]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "rgba(195, 189, 187, 1)",
                "line-opacity": 1,
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            8,
                            1.5
                        ],
                        [
                            20,
                            17
                        ]
                    ]
                },
                "line-dasharray": [
                    0.5,
                    0.25
                ]
            }
        },
        {
            "id": "tunnel_trunk_primary_casing",
            "type": "line",
            "metadata": {
                "featureType": "road.arterial",
                "elementTypes": [
                    "geometry.stroke"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "brunnel",
                    "tunnel"
                ],
                [
                    "in",
                    "class",
                    "primary",
                    "trunk"
                ]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#e9ac77",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            5,
                            0.4
                        ],
                        [
                            6,
                            0.7
                        ],
                        [
                            7,
                            1.75
                        ],
                        [
                            20,
                            22
                        ]
                    ]
                },
                "line-dasharray": [
                    0.5,
                    0.25
                ]
            }
        },
        {
            "id": "tunnel_motorway_casing",
            "type": "line",
            "metadata": {
                "featureType": "road.highway",
                "elementTypes": [
                    "geometry.stroke"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "class",
                    "motorway"
                ],
                [
                    "==",
                    "brunnel",
                    "tunnel"
                ]
            ],
            "layout": {
                "line-join": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "#e9ac77",
                "line-dasharray": [
                    0.5,
                    0.25
                ],
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            5,
                            0.4
                        ],
                        [
                            6,
                            0.7
                        ],
                        [
                            7,
                            1.75
                        ],
                        [
                            20,
                            22
                        ]
                    ]
                }
            }
        },
        {
            "id": "tunnel_path_pedestrian",
            "type": "line",
            "metadata": {
                "featureType": "road.pedestrian",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "==",
                    "brunnel",
                    "tunnel"
                ],
                [
                    "in",
                    "class",
                    "path",
                    "pedestrian"
                ]
            ],
            "layout": {
                "visibility": "visible"
            },
            "paint": {
                "line-color": "rgba(204, 196, 176, 0.45)",
                "line-dasharray": [
                    1,
                    0.75
                ],
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            14,
                            0.5
                        ],
                        [
                            20,
                            6
                        ]
                    ]
                }
            }
        },
        {
            "id": "tunnel_motorway_link",
            "type": "line",
            "metadata": {
                "featureType": "road.highway",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "class",
                    "motorway_link"
                ],
                [
                    "==",
                    "ramp",
                    1
                ],
                [
                    "==",
                    "brunnel",
                    "tunnel"
                ]
            ],
            "layout": {
                "line-join": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "#fc8",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            12.5,
                            0
                        ],
                        [
                            13,
                            1.5
                        ],
                        [
                            14,
                            2.5
                        ],
                        [
                            20,
                            11.5
                        ]
                    ]
                }
            }
        },
        {
            "id": "tunnel_service_track",
            "type": "line",
            "metadata": {
                "featureType": "road",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "brunnel",
                    "tunnel"
                ],
                [
                    "in",
                    "class",
                    "service",
                    "track"
                ]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#fff",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            15.5,
                            0
                        ],
                        [
                            16,
                            2
                        ],
                        [
                            20,
                            7.5
                        ]
                    ]
                }
            }
        },
        {
            "id": "tunnel_link",
            "type": "line",
            "metadata": {
                "featureType": "road",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "ramp",
                    "1"
                ],
                [
                    "==",
                    "brunnel",
                    "tunnel"
                ]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#fff4c6",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            12.5,
                            0
                        ],
                        [
                            13,
                            1.5
                        ],
                        [
                            14,
                            2.5
                        ],
                        [
                            20,
                            11.5
                        ]
                    ]
                }
            }
        },
        {
            "id": "tunnel_minor",
            "type": "line",
            "metadata": {
                "featureType": "road.local",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "brunnel",
                    "tunnel"
                ],
                [
                    "in",
                    "class",
                    "minor"
                ]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#fff",
                "line-opacity": 1,
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            13.5,
                            0
                        ],
                        [
                            14,
                            2.5
                        ],
                        [
                            20,
                            11.5
                        ]
                    ]
                }
            }
        },
        {
            "id": "tunnel_secondary_tertiary",
            "type": "line",
            "metadata": {
                "featureType": "road.arterial",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "brunnel",
                    "tunnel"
                ],
                [
                    "in",
                    "class",
                    "secondary",
                    "tertiary"
                ]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "rgba(245, 245, 243, 1)",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            6.5,
                            0
                        ],
                        [
                            8,
                            0.5
                        ],
                        [
                            20,
                            13
                        ]
                    ]
                }
            }
        },
        {
            "id": "tunnel_trunk_primary",
            "type": "line",
            "metadata": {
                "featureType": "road.arterial",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "brunnel",
                    "tunnel"
                ],
                [
                    "in",
                    "class",
                    "primary",
                    "trunk"
                ]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "rgba(245, 245, 243, 1)",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            5,
                            0
                        ],
                        [
                            7,
                            1
                        ],
                        [
                            20,
                            18
                        ]
                    ]
                }
            }
        },
        {
            "id": "tunnel_motorway",
            "type": "line",
            "metadata": {
                "featureType": "road.highway",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "class",
                    "motorway"
                ],
                [
                    "==",
                    "brunnel",
                    "tunnel"
                ]
            ],
            "layout": {
                "line-join": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "rgba(245, 245, 243, 1)",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            5,
                            0
                        ],
                        [
                            7,
                            1
                        ],
                        [
                            20,
                            18
                        ]
                    ]
                }
            }
        },
        {
            "id": "tunnel_major_rail",
            "type": "line",
            "metadata": {
                "featureType": "transit.line"
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "brunnel",
                    "tunnel"
                ],
                [
                    "in",
                    "class",
                    "rail"
                ]
            ],
            "paint": {
                "line-color": "#f8f8f8",
                "line-width": {
                    "base": 1.4,
                    "stops": [
                        [
                            14,
                            0.4
                        ],
                        [
                            15,
                            0.75
                        ],
                        [
                            20,
                            2
                        ]
                    ]
                }
            }
        },
        {
            "id": "tunnel_major_rail_hatching",
            "type": "line",
            "metadata": {
                "featureType": "transit.line",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "brunnel",
                    "tunnel"
                ],
                [
                    "==",
                    "class",
                    "rail"
                ]
            ],
            "paint": {
                "line-color": "#f8f8f8",
                "line-dasharray": [
                    0.2,
                    8
                ],
                "line-width": {
                    "base": 1.4,
                    "stops": [
                        [
                            14.5,
                            0
                        ],
                        [
                            15,
                            3
                        ],
                        [
                            20,
                            8
                        ]
                    ]
                }
            }
        },
        {
            "id": "road_area_pier",
            "type": "fill",
            "metadata": {
                "featureType": "road",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "Polygon"
                ],
                [
                    "==",
                    "class",
                    "pier"
                ]
            ],
            "layout": {
                "visibility": "visible"
            },
            "paint": {
                "fill-color": "rgba(246, 241, 229, 1)",
                "fill-antialias": true
            }
        },
        {
            "id": "road_pier",
            "type": "line",
            "metadata": {
                "featureType": "road",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "in",
                    "class",
                    "pier"
                ]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            },
            "paint": {
                "line-color": "rgba(246, 241, 229, 1)",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            15,
                            1
                        ],
                        [
                            17,
                            4
                        ]
                    ]
                }
            }
        },
        {
            "id": "road_area_bridge",
            "type": "fill",
            "metadata": {
                "featureType": "road.bridge",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "Polygon"
                ],
                [
                    "==",
                    "brunnel",
                    "bridge"
                ]
            ],
            "layout": {
                "visibility": "visible"
            },
            "paint": {
                "fill-color": "rgba(246, 241, 229, 0.6)",
                "fill-antialias": true
            }
        },
        {
            "id": "road_service_track_casing",
            "type": "line",
            "metadata": {
                "featureType": "road",
                "elementTypes": [
                    "geometry.stroke"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "!in",
                    "brunnel",
                    "bridge",
                    "tunnel"
                ],
                [
                    "in",
                    "class",
                    "service",
                    "track"
                ]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            },
            "paint": {
                "line-color": "#cfcdca",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            15,
                            1
                        ],
                        [
                            16,
                            4
                        ],
                        [
                            20,
                            11
                        ]
                    ]
                }
            }
        },
        {
            "id": "road_link_casing",
            "type": "line",
            "metadata": {
                "featureType": "road",
                "elementTypes": [
                    "geometry.stroke"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "minzoom": 13,
            "filter": [
                "all",
                [
                    "!in",
                    "brunnel",
                    "bridge",
                    "tunnel"
                ],
                [
                    "!in",
                    "class",
                    "motorway",
                    "trunk",
                    "primary",
                    "pedestrian",
                    "path",
                    "track",
                    "service"
                ],
                [
                    "==",
                    "ramp",
                    1
                ]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "#e9ac77",
                "line-opacity": 1,
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            12,
                            1
                        ],
                        [
                            13,
                            3
                        ],
                        [
                            14,
                            4
                        ],
                        [
                            20,
                            15
                        ]
                    ]
                }
            }
        },
        {
            "id": "road_primary_link_casing",
            "type": "line",
            "metadata": {
                "featureType": "road.primary",
                "elementTypes": [
                    "geometry.stroke"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "!in",
                    "brunnel",
                    "bridge",
                    "tunnel"
                ],
                [
                    "==",
                    "ramp",
                    1
                ],
                [
                    "in",
                    "class",
                    "primary"
                ]
            ],
            "layout": {
                "line-cap": "butt",
                "line-join": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "rgba(195, 189, 187, 1)",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            5,
                            0
                        ],
                        [
                            7,
                            0.7
                        ],
                        [
                            20,
                            14
                        ]
                    ]
                }
            }
        },
        {
            "id": "road_trunk_link_casing",
            "type": "line",
            "metadata": {
                "featureType": "road.highway",
                "elementTypes": [
                    "geometry.stroke"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "!in",
                    "brunnel",
                    "bridge",
                    "tunnel"
                ],
                [
                    "==",
                    "ramp",
                    1
                ],
                [
                    "in",
                    "class",
                    "trunk"
                ]
            ],
            "layout": {
                "line-cap": "butt",
                "line-join": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "#e9ac77",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            5,
                            0
                        ],
                        [
                            7,
                            0.7
                        ],
                        [
                            20,
                            14
                        ]
                    ]
                }
            }
        },
        {
            "id": "road_motorway_link_casing",
            "type": "line",
            "metadata": {
                "featureType": "road.highway",
                "elementTypes": [
                    "geometry.stroke"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "minzoom": 12,
            "filter": [
                "all",
                [
                    "!in",
                    "brunnel",
                    "bridge",
                    "tunnel"
                ],
                [
                    "==",
                    "class",
                    "motorway"
                ],
                [
                    "==",
                    "ramp",
                    1
                ]
            ],
            "layout": {
                "line-cap": "butt",
                "line-join": "round"
            },
            "paint": {
                "line-color": "#e9ac77",
                "line-opacity": 1,
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            12,
                            1
                        ],
                        [
                            13,
                            3
                        ],
                        [
                            14,
                            4
                        ],
                        [
                            20,
                            15
                        ]
                    ]
                }
            }
        },
        {
            "id": "road_minor_casing",
            "type": "line",
            "metadata": {
                "featureType": "road.local",
                "elementTypes": [
                    "geometry.stroke"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "!in",
                    "brunnel",
                    "bridge",
                    "tunnel"
                ],
                [
                    "in",
                    "class",
                    "minor"
                ],
                [
                    "!=",
                    "ramp",
                    "1"
                ]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            },
            "paint": {
                "line-color": "#cfcdca",
                "line-opacity": {
                    "stops": [
                        [
                            12,
                            0
                        ],
                        [
                            12.5,
                            1
                        ]
                    ]
                },
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            12,
                            0.5
                        ],
                        [
                            13,
                            1
                        ],
                        [
                            14,
                            4
                        ],
                        [
                            20,
                            20
                        ]
                    ]
                }
            }
        },
        {
            "id": "road_secondary_tertiary_casing",
            "type": "line",
            "metadata": {
                "featureType": "road.arterial",
                "elementTypes": [
                    "geometry.stroke"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "!in",
                    "brunnel",
                    "bridge",
                    "tunnel"
                ],
                [
                    "in",
                    "class",
                    "secondary",
                    "tertiary"
                ],
                [
                    "!=",
                    "ramp",
                    1
                ]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "rgba(195, 189, 187, 1)",
                "line-opacity": 1,
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            8,
                            1.5
                        ],
                        [
                            20,
                            17
                        ]
                    ]
                }
            }
        },
        {
            "id": "road_primary_casing",
            "type": "line",
            "metadata": {
                "featureType": "road.arterial",
                "elementTypes": [
                    "geometry.stroke"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "!in",
                    "brunnel",
                    "bridge",
                    "tunnel"
                ],
                [
                    "!=",
                    "ramp",
                    1
                ],
                [
                    "in",
                    "class",
                    "primary"
                ],
                [
                    "!=",
                    "ramp",
                    1
                ]
            ],
            "layout": {
                "line-cap": "butt",
                "line-join": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "#b8b8b8",
                "line-opacity": 1,
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            5,
                            0.4
                        ],
                        [
                            6,
                            0.7
                        ],
                        [
                            7,
                            1.75
                        ],
                        [
                            20,
                            22
                        ]
                    ]
                }
            }
        },
        {
            "id": "road_trunk_casing",
            "type": "line",
            "metadata": {
                "featureType": "road.highway",
                "elementTypes": [
                    "geometry.stroke"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "!in",
                    "brunnel",
                    "bridge",
                    "tunnel"
                ],
                [
                    "!=",
                    "ramp",
                    1
                ],
                [
                    "==",
                    "class",
                    "trunk"
                ],
                [
                    "!=",
                    "ramp",
                    1
                ]
            ],
            "layout": {
                "line-cap": "butt",
                "line-join": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "#e9ac77",
                "line-opacity": 1,
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            5,
                            0.4
                        ],
                        [
                            6,
                            0.7
                        ],
                        [
                            7,
                            1.75
                        ],
                        [
                            20,
                            22
                        ]
                    ]
                }
            }
        },
        {
            "id": "road_motorway_casing",
            "type": "line",
            "metadata": {
                "featureType": "road.highway",
                "elementTypes": [
                    "geometry.stroke"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "minzoom": 5,
            "filter": [
                "all",
                [
                    "!in",
                    "brunnel",
                    "bridge",
                    "tunnel"
                ],
                [
                    "==",
                    "class",
                    "motorway"
                ],
                [
                    "!=",
                    "ramp",
                    1
                ]
            ],
            "layout": {
                "line-cap": "butt",
                "line-join": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "#e9ac77",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            5,
                            0.4
                        ],
                        [
                            6,
                            0.7
                        ],
                        [
                            7,
                            1.75
                        ],
                        [
                            20,
                            22
                        ]
                    ]
                }
            }
        },
        {
            "id": "road_path_pedestrian",
            "type": "line",
            "metadata": {
                "featureType": "road.pedestrian"
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "minzoom": 14,
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "!in",
                    "brunnel",
                    "bridge",
                    "tunnel"
                ],
                [
                    "in",
                    "class",
                    "path",
                    "pedestrian"
                ]
            ],
            "layout": {
                "line-join": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "rgba(204, 196, 176, 0.45)",
                "line-dasharray": [
                    1,
                    1
                ],
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            14,
                            1
                        ],
                        [
                            20,
                            6
                        ]
                    ]
                }
            }
        },
        {
            "id": "road_link",
            "type": "line",
            "metadata": {
                "featureType": "road",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "minzoom": 13,
            "filter": [
                "all",
                [
                    "!in",
                    "brunnel",
                    "bridge",
                    "tunnel"
                ],
                [
                    "==",
                    "ramp",
                    1
                ],
                [
                    "!in",
                    "class",
                    "motorway",
                    "trunk",
                    "primary",
                    "pedestrian",
                    "path",
                    "track",
                    "service"
                ]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "#fea",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            12.5,
                            0
                        ],
                        [
                            13,
                            1.5
                        ],
                        [
                            14,
                            2.5
                        ],
                        [
                            20,
                            11.5
                        ]
                    ]
                }
            }
        },
        {
            "id": "road_primary_link",
            "type": "line",
            "metadata": {
                "featureType": "road.primary",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "!in",
                    "brunnel",
                    "bridge",
                    "tunnel"
                ],
                [
                    "==",
                    "ramp",
                    1
                ],
                [
                    "==",
                    "class",
                    "primary"
                ]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "white",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            5,
                            0
                        ],
                        [
                            7,
                            0.5
                        ],
                        [
                            20,
                            10
                        ]
                    ]
                }
            }
        },
        {
            "id": "road_trunk_link",
            "type": "line",
            "metadata": {
                "featureType": "road.highway",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "!in",
                    "brunnel",
                    "bridge",
                    "tunnel"
                ],
                [
                    "==",
                    "ramp",
                    1
                ],
                [
                    "==",
                    "class",
                    "trunk"
                ]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "#fea",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            5,
                            0
                        ],
                        [
                            7,
                            0.5
                        ],
                        [
                            20,
                            10
                        ]
                    ]
                }
            }
        },
        {
            "id": "road_motorway_link",
            "type": "line",
            "metadata": {
                "featureType": "road.highway",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "minzoom": 12,
            "filter": [
                "all",
                [
                    "!in",
                    "brunnel",
                    "bridge",
                    "tunnel"
                ],
                [
                    "==",
                    "class",
                    "motorway"
                ],
                [
                    "==",
                    "ramp",
                    1
                ]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            },
            "paint": {
                "line-color": "#fc8",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            12.5,
                            0
                        ],
                        [
                            13,
                            1.5
                        ],
                        [
                            14,
                            2.5
                        ],
                        [
                            20,
                            11.5
                        ]
                    ]
                }
            }
        },
        {
            "id": "road_service_track",
            "type": "line",
            "metadata": {
                "featureType": "road",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "!in",
                    "brunnel",
                    "bridge",
                    "tunnel"
                ],
                [
                    "in",
                    "class",
                    "service",
                    "track"
                ]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            },
            "paint": {
                "line-color": "#fff",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            15.5,
                            0
                        ],
                        [
                            16,
                            2
                        ],
                        [
                            20,
                            7.5
                        ]
                    ]
                }
            }
        },
        {
            "id": "road_minor",
            "type": "line",
            "metadata": {
                "featureType": "road.local",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "all",
                    [
                        "!in",
                        "brunnel",
                        "bridge",
                        "tunnel"
                    ],
                    [
                        "in",
                        "class",
                        "minor"
                    ]
                ]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "#fff",
                "line-opacity": 1,
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            12,
                            0.5
                        ],
                        [
                            14,
                            2.5
                        ],
                        [
                            20,
                            18
                        ]
                    ]
                }
            }
        },
        {
            "id": "road_secondary_tertiary",
            "type": "line",
            "metadata": {
                "featureType": "road.arterial",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "!in",
                    "brunnel",
                    "bridge",
                    "tunnel"
                ],
                [
                    "in",
                    "class",
                    "secondary",
                    "tertiary"
                ]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "#fff",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            6.5,
                            0
                        ],
                        [
                            8,
                            0.5
                        ],
                        [
                            20,
                            13
                        ]
                    ]
                }
            }
        },
        {
            "id": "road_primary",
            "type": "line",
            "metadata": {
                "featureType": "road.arterial",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "!in",
                    "brunnel",
                    "bridge",
                    "tunnel"
                ],
                [
                    "!=",
                    "ramp",
                    1
                ],
                [
                    "==",
                    "class",
                    "primary"
                ]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "white",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            5,
                            0
                        ],
                        [
                            7,
                            1
                        ],
                        [
                            20,
                            18
                        ]
                    ]
                }
            }
        },
        {
            "id": "road_trunk",
            "type": "line",
            "metadata": {
                "featureType": "road.highway",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "!in",
                    "brunnel",
                    "bridge",
                    "tunnel"
                ],
                [
                    "!=",
                    "ramp",
                    1
                ],
                [
                    "==",
                    "class",
                    "trunk"
                ]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "#fea",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            5,
                            0
                        ],
                        [
                            7,
                            1
                        ],
                        [
                            20,
                            18
                        ]
                    ]
                }
            }
        },
        {
            "id": "road_motorway",
            "type": "line",
            "metadata": {
                "featureType": "road.highway",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "minzoom": 5,
            "filter": [
                "all",
                [
                    "!in",
                    "brunnel",
                    "bridge",
                    "tunnel"
                ],
                [
                    "==",
                    "class",
                    "motorway"
                ],
                [
                    "!=",
                    "ramp",
                    1
                ]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "#fc8",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            5,
                            0
                        ],
                        [
                            7,
                            1
                        ],
                        [
                            20,
                            18
                        ]
                    ]
                }
            }
        },
        {
            "id": "tram_lines",
            "type": "line",
            "metadata": {
                "featureType": "transit.line"
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "!in",
                    "brunnel",
                    "bridge",
                    "tunnel"
                ],
                [
                    "==",
                    "class",
                    "transit"
                ],
                [
                    "==",
                    "subclass",
                    "tram"
                ]
            ],
            "paint": {
                "line-color": "#b8b8b8",
                "line-width": {
                    "base": 1.4,
                    "stops": [
                        [
                            14,
                            0.4
                        ],
                        [
                            15,
                            0.75
                        ],
                        [
                            20,
                            2
                        ]
                    ]
                }
            }
        },
        {
            "id": "road_major_rail",
            "type": "line",
            "metadata": {
                "featureType": "transit.line"
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "!in",
                    "brunnel",
                    "bridge",
                    "tunnel"
                ],
                [
                    "==",
                    "class",
                    "rail"
                ]
            ],
            "paint": {
                "line-color": "#bbb",
                "line-width": {
                    "base": 1.4,
                    "stops": [
                        [
                            14,
                            0.4
                        ],
                        [
                            15,
                            0.75
                        ],
                        [
                            20,
                            2
                        ]
                    ]
                }
            }
        },
        {
            "id": "road_major_rail_hatching",
            "type": "line",
            "metadata": {
                "featureType": "transit.line"
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "!in",
                    "brunnel",
                    "bridge",
                    "tunnel"
                ],
                [
                    "==",
                    "class",
                    "rail"
                ]
            ],
            "paint": {
                "line-color": "#bbb",
                "line-dasharray": [
                    0.2,
                    8
                ],
                "line-width": {
                    "base": 1.4,
                    "stops": [
                        [
                            14.5,
                            0
                        ],
                        [
                            15,
                            3
                        ],
                        [
                            20,
                            8
                        ]
                    ]
                }
            }
        },
        {
            "id": "roads.pedestrian.aerialway.stroke",
            "metadata": {
                "featureType": "roads.pedestrian.aerialway",
                "elementTypes": [
                    "geometry.stroke"
                ]
            },
            "minzoom": 5.0,
            "filter": [
                "all",
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ],
                [
                    "in",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "literal",
                        [
                            "aerialway"
                        ]
                    ]
                ],
                [
                    "!",
                    [
                        "in",
                        [
                            "get",
                            "brunnel"
                        ],
                        [
                            "literal",
                            [
                                "bridge",
                                "tunnel"
                            ]
                        ]
                    ]
                ]
            ],
            "source-layer": "transportation",
            "source": "openmaptiles",
            "type": "line",
            "paint": {
                "line-color": "#bbb",
                "line-dasharray": [
                    2.0,
                    2.0
                ],
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            13.0,
                            0.5
                        ],
                        [
                            14.0,
                            1.0
                        ],
                        [
                            20.0,
                            2.0
                        ]
                    ]
                }
            },
            "layout": {
                "visibility": "visible",
                "line-cap": "round",
                "line-join": "miter"
            }
        },
        {
            "id": "building",
            "type": "fill",
            "metadata": {
                "featureType": "landscape.man_made"
            },
            "source": "openmaptiles",
            "source-layer": "building",
            "minzoom": 13,
            "layout": {
                "visibility": "visible"
            },
            "paint": {
                "fill-color": "rgba(204, 198, 192, 1)",
                "fill-outline-color": "darkgrey",
                "fill-opacity": 0.3
            }
        },
        {
            "id": "building-3d",
            "type": "fill-extrusion",
            "source": "openmaptiles",
            "source-layer": "building",
            "minzoom": 15,
            "layout": {
                "visibility": "none"
            },
            "paint": {
                "fill-extrusion-color": "rgba(204, 198, 192, 1)",
                "fill-extrusion-height": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    15,
                    0,
                    15.05,
                    [
                        "get",
                        "render_height"
                    ]
                ],
                "fill-extrusion-base": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    15,
                    0,
                    15.05,
                    [
                        "get",
                        "render_min_height"
                    ]
                ],
                "fill-extrusion-opacity": 0.3
            },
            "filter": [
                "all",
                [
                    "!has",
                    "hide_3d"
                ]
            ]
        },
        {
            "id": "waterway-bridge-case",
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "waterway",
            "metadata": {
                "featureType": "water"
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "==",
                    "brunnel",
                    "bridge"
                ]
            ],
            "layout": {
                "line-cap": "butt",
                "line-join": "miter"
            },
            "paint": {
                "line-color": "#bbbbbb",
                "line-width": {
                    "base": 1.6,
                    "stops": [
                        [
                            12,
                            0.5
                        ],
                        [
                            20,
                            5
                        ]
                    ]
                },
                "line-gap-width": {
                    "base": 1.3,
                    "stops": [
                        [
                            13,
                            0.5
                        ],
                        [
                            20,
                            6
                        ]
                    ]
                }
            }
        },
        {
            "id": "waterway-bridge",
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "waterway",
            "metadata": {
                "featureType": "water"
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "==",
                    "brunnel",
                    "bridge"
                ]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            },
            "paint": {
                "line-color": "rgba(134, 204, 250, 1)",
                "line-width": {
                    "base": 1.3,
                    "stops": [
                        [
                            13,
                            0.5
                        ],
                        [
                            20,
                            6
                        ]
                    ]
                }
            }
        },
        {
            "id": "bridge_motorway_link_casing",
            "type": "line",
            "metadata": {
                "featureType": "road.highway",
                "elementTypes": [
                    "geometry.stroke"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "class",
                    "motorway"
                ],
                [
                    "==",
                    "ramp",
                    1
                ],
                [
                    "==",
                    "brunnel",
                    "bridge"
                ]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#e9ac77",
                "line-opacity": 1,
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            12,
                            1
                        ],
                        [
                            13,
                            3
                        ],
                        [
                            14,
                            4
                        ],
                        [
                            20,
                            15
                        ]
                    ]
                }
            }
        },
        {
            "id": "bridge_service_track_casing",
            "type": "line",
            "metadata": {
                "featureType": "road",
                "elementTypes": [
                    "geometry.stroke"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "brunnel",
                    "bridge"
                ],
                [
                    "in",
                    "class",
                    "service",
                    "track"
                ]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#cfcdca",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            15,
                            1
                        ],
                        [
                            16,
                            4
                        ],
                        [
                            20,
                            11
                        ]
                    ]
                }
            }
        },
        {
            "id": "bridge_link_casing",
            "type": "line",
            "metadata": {
                "featureType": "road",
                "elementTypes": [
                    "geometry.stroke"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "class",
                    "link"
                ],
                [
                    "==",
                    "brunnel",
                    "bridge"
                ]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#e9ac77",
                "line-opacity": 1,
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            12,
                            1
                        ],
                        [
                            13,
                            3
                        ],
                        [
                            14,
                            4
                        ],
                        [
                            20,
                            15
                        ]
                    ]
                }
            }
        },
        {
            "id": "bridge_street_casing",
            "type": "line",
            "metadata": {
                "featureType": "road",
                "elementTypes": [
                    "geometry.stroke"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "brunnel",
                    "bridge"
                ],
                [
                    "in",
                    "class",
                    "street",
                    "street_limited"
                ]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "hsl(36, 6%, 74%)",
                "line-opacity": {
                    "stops": [
                        [
                            12,
                            0
                        ],
                        [
                            12.5,
                            1
                        ]
                    ]
                },
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            12,
                            0.5
                        ],
                        [
                            13,
                            1
                        ],
                        [
                            14,
                            4
                        ],
                        [
                            20,
                            25
                        ]
                    ]
                }
            }
        },
        {
            "id": "bridge_path_pedestrian_casing",
            "type": "line",
            "metadata": {
                "featureType": "road.pedestrian",
                "elementTypes": [
                    "geometry.stroke"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "==",
                    "brunnel",
                    "bridge"
                ],
                [
                    "in",
                    "class",
                    "path",
                    "pedestrian"
                ]
            ],
            "layout": {
                "line-join": "miter",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "hsl(35, 6%, 80%)",
                "line-dasharray": [
                    1,
                    0
                ],
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            14,
                            1.5
                        ],
                        [
                            20,
                            18
                        ]
                    ]
                }
            }
        },
        {
            "id": "bridge_secondary_tertiary_casing",
            "type": "line",
            "metadata": {
                "featureType": "road.arterial",
                "elementTypes": [
                    "geometry.stroke"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "brunnel",
                    "bridge"
                ],
                [
                    "in",
                    "class",
                    "secondary",
                    "tertiary"
                ]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "rgba(195, 189, 187, 1)",
                "line-opacity": 1,
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            8,
                            1.5
                        ],
                        [
                            20,
                            17
                        ]
                    ]
                }
            }
        },
        {
            "id": "bridge_primary_casing",
            "type": "line",
            "metadata": {
                "featureType": "road.arterial",
                "elementTypes": [
                    "geometry.stroke"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "brunnel",
                    "bridge"
                ],
                [
                    "==",
                    "class",
                    "primary"
                ]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#b8b8b8",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            5,
                            0.4
                        ],
                        [
                            6,
                            0.7
                        ],
                        [
                            7,
                            1.75
                        ],
                        [
                            20,
                            22
                        ]
                    ]
                }
            }
        },
        {
            "id": "bridge_trunk_casing",
            "type": "line",
            "metadata": {
                "featureType": "road.highway",
                "elementTypes": [
                    "geometry.stroke"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "brunnel",
                    "bridge"
                ],
                [
                    "==",
                    "class",
                    "trunk"
                ]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#e9ac77",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            5,
                            0.4
                        ],
                        [
                            6,
                            0.7
                        ],
                        [
                            7,
                            1.75
                        ],
                        [
                            20,
                            22
                        ]
                    ]
                }
            }
        },
        {
            "id": "bridge_motorway_casing",
            "type": "line",
            "metadata": {
                "featureType": "road.highway",
                "elementTypes": [
                    "geometry.stroke"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "class",
                    "motorway"
                ],
                [
                    "==",
                    "brunnel",
                    "bridge"
                ],
                [
                    "!=",
                    "ramp",
                    1
                ]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#e9ac77",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            5,
                            0.4
                        ],
                        [
                            6,
                            0.7
                        ],
                        [
                            7,
                            1.75
                        ],
                        [
                            20,
                            22
                        ]
                    ]
                }
            }
        },
        {
            "id": "bridge_path_pedestrian",
            "type": "line",
            "metadata": {
                "featureType": "road.pedestrian"
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "==",
                    "brunnel",
                    "bridge"
                ],
                [
                    "in",
                    "class",
                    "path",
                    "pedestrian"
                ]
            ],
            "paint": {
                "line-color": "hsl(0, 0%, 100%)",
                "line-dasharray": [
                    1,
                    0.3
                ],
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            14,
                            0.5
                        ],
                        [
                            20,
                            10
                        ]
                    ]
                }
            }
        },
        {
            "id": "bridge_motorway_link",
            "type": "line",
            "metadata": {
                "featureType": "road.highway",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "class",
                    "motorway"
                ],
                [
                    "==",
                    "ramp",
                    1
                ],
                [
                    "==",
                    "brunnel",
                    "bridge"
                ]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#fc8",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            12.5,
                            0
                        ],
                        [
                            13,
                            1.5
                        ],
                        [
                            14,
                            2.5
                        ],
                        [
                            20,
                            11.5
                        ]
                    ]
                }
            }
        },
        {
            "id": "bridge_service_track",
            "type": "line",
            "metadata": {
                "featureType": "road",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "brunnel",
                    "bridge"
                ],
                [
                    "in",
                    "class",
                    "service",
                    "track"
                ]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#fff",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            15.5,
                            0
                        ],
                        [
                            16,
                            2
                        ],
                        [
                            20,
                            7.5
                        ]
                    ]
                }
            }
        },
        {
            "id": "bridge_link",
            "type": "line",
            "metadata": {
                "featureType": "road",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "class",
                    "link"
                ],
                [
                    "==",
                    "brunnel",
                    "bridge"
                ]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#fea",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            12.5,
                            0
                        ],
                        [
                            13,
                            1.5
                        ],
                        [
                            14,
                            2.5
                        ],
                        [
                            20,
                            11.5
                        ]
                    ]
                }
            }
        },
        {
            "id": "bridge_street",
            "type": "line",
            "metadata": {
                "featureType": "road",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "brunnel",
                    "bridge"
                ],
                [
                    "in",
                    "class",
                    "minor"
                ]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#fff",
                "line-opacity": 1,
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            13.5,
                            0
                        ],
                        [
                            14,
                            2.5
                        ],
                        [
                            20,
                            18
                        ]
                    ]
                }
            }
        },
        {
            "id": "bridge_secondary_tertiary",
            "type": "line",
            "metadata": {
                "featureType": "road.arterial",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "brunnel",
                    "bridge"
                ],
                [
                    "in",
                    "class",
                    "secondary",
                    "tertiary"
                ]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#fff",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            6.5,
                            0
                        ],
                        [
                            8,
                            0.5
                        ],
                        [
                            20,
                            13
                        ]
                    ]
                }
            }
        },
        {
            "id": "bridge_primary",
            "type": "line",
            "metadata": {
                "featureType": "road.arterial",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "brunnel",
                    "bridge"
                ],
                [
                    "==",
                    "class",
                    "primary"
                ]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#fff",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            5,
                            0
                        ],
                        [
                            7,
                            1
                        ],
                        [
                            20,
                            18
                        ]
                    ]
                }
            }
        },
        {
            "id": "bridge_trunk",
            "type": "line",
            "metadata": {
                "featureType": "road.highway",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "brunnel",
                    "bridge"
                ],
                [
                    "==",
                    "class",
                    "trunk"
                ]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#fea",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            5,
                            0
                        ],
                        [
                            7,
                            1
                        ],
                        [
                            20,
                            18
                        ]
                    ]
                }
            }
        },
        {
            "id": "bridge_motorway",
            "type": "line",
            "metadata": {
                "featureType": "road.highway",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "class",
                    "motorway"
                ],
                [
                    "==",
                    "brunnel",
                    "bridge"
                ],
                [
                    "!=",
                    "ramp",
                    1
                ]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#fc8",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            5,
                            0
                        ],
                        [
                            7,
                            1
                        ],
                        [
                            20,
                            18
                        ]
                    ]
                }
            }
        },
        {
            "id": "bridge_major_rail",
            "type": "line",
            "metadata": {
                "featureType": "transit.line",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "class",
                    "rail"
                ],
                [
                    "==",
                    "brunnel",
                    "bridge"
                ]
            ],
            "paint": {
                "line-color": "#bbb",
                "line-width": {
                    "base": 1.4,
                    "stops": [
                        [
                            14,
                            0.4
                        ],
                        [
                            15,
                            0.75
                        ],
                        [
                            20,
                            2
                        ]
                    ]
                }
            }
        },
        {
            "id": "bridge_major_rail_hatching",
            "type": "line",
            "metadata": {
                "featureType": "transit.line",
                "elementTypes": [
                    "geometry.fill"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                [
                    "==",
                    "class",
                    "rail"
                ],
                [
                    "==",
                    "brunnel",
                    "bridge"
                ]
            ],
            "paint": {
                "line-color": "#bbb",
                "line-dasharray": [
                    0.2,
                    8
                ],
                "line-width": {
                    "base": 1.4,
                    "stops": [
                        [
                            14.5,
                            0
                        ],
                        [
                            15,
                            3
                        ],
                        [
                            20,
                            8
                        ]
                    ]
                }
            }
        },
        {
            "id": "directions_layers",
            "type": "background",
            "paint": {
                "background-opacity": 0
            }
        },
        {
            "id": "cablecar",
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "transportation",
            "metadata": {
                "__untagged__": true
            },
            "minzoom": 13,
            "filter": [
                "==",
                "class",
                "cable_car"
            ],
            "layout": {
                "visibility": "visible",
                "line-cap": "round"
            },
            "paint": {
                "line-color": "hsl(0, 0%, 70%)",
                "line-width": {
                    "base": 1,
                    "stops": [
                        [
                            11,
                            1
                        ],
                        [
                            19,
                            2.5
                        ]
                    ]
                }
            }
        },
        {
            "id": "cablecar-dash",
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "transportation",
            "minzoom": 13,
            "filter": [
                "==",
                "class",
                "cable_car"
            ],
            "layout": {
                "visibility": "visible",
                "line-cap": "round"
            },
            "paint": {
                "line-color": "hsl(0, 0%, 70%)",
                "line-width": {
                    "base": 1,
                    "stops": [
                        [
                            11,
                            3
                        ],
                        [
                            19,
                            5.5
                        ]
                    ]
                },
                "line-dasharray": [
                    2,
                    3
                ]
            }
        },
        {
            "id": "boundary_internal",
            "type": "line",
            "metadata": {
                "featureType": "administrative.province",
                "elementsType": "geometry.stroke"
            },
            "source": "openmaptiles",
            "source-layer": "boundary",
            "filter": [
                "all",
                [
                    "in",
                    "admin_level",
                    3,
                    4
                ],
                [
                    "==",
                    "maritime",
                    0
                ]
            ],
            "layout": {
                "line-join": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "#9e9cab",
                "line-dasharray": {
                    "stops": [
                        [
                            4,
                            [
                                1,
                                2
                            ]
                        ],
                        [
                            8,
                            [
                                1.5,
                                2
                            ]
                        ],
                        [
                            10,
                            [
                                2,
                                2
                            ]
                        ]
                    ]
                },
                "line-width": {
                    "base": 1,
                    "stops": [
                        [
                            4,
                            0.4
                        ],
                        [
                            5,
                            1
                        ],
                        [
                            12,
                            1.5
                        ]
                    ]
                }
            }
        },
        {
            "id": "boundary",
            "type": "line",
            "metadata": {
                "featureType": "administrative.country"
            },
            "source": "openmaptiles",
            "source-layer": "boundary",
            "filter": [
                "all",
                [
                    "in",
                    "admin_level",
                    2
                ],
                [
                    "==",
                    "maritime",
                    0
                ],
                [
                    "==",
                    "disputed",
                    0
                ]
            ],
            "layout": {
                "line-join": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "#9e9cab",
                "line-width": {
                    "base": 1,
                    "stops": [
                        [
                            4,
                            0.4
                        ],
                        [
                            5,
                            1
                        ],
                        [
                            12,
                            1.5
                        ]
                    ]
                }
            }
        },
        {
            "id": "boundary_disputed",
            "type": "line",
            "metadata": {
                "featureType": "administrative.country"
            },
            "source": "openmaptiles",
            "source-layer": "boundary",
            "filter": [
                "all",
                [
                    "in",
                    "admin_level",
                    2
                ],
                [
                    "==",
                    "maritime",
                    0
                ],
                [
                    "==",
                    "disputed",
                    1
                ]
            ],
            "layout": {
                "line-join": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-dasharray": [
                    4,
                    2,
                    4
                ],
                "line-color": "#9e9cab",
                "line-width": {
                    "base": 1,
                    "stops": [
                        [
                            4,
                            0.4
                        ],
                        [
                            5,
                            1
                        ],
                        [
                            12,
                            1.5
                        ]
                    ]
                }
            }
        },
        {
            "id": "overlay_map_types",
            "type": "background",
            "paint": {
                "background-opacity": 0
            }
        },
        {
            "id": "data_layers",
            "type": "background",
            "paint": {
                "background-opacity": 0
            }
        },
        {
            "id": "water_name_line",
            "type": "symbol",
            "metadata": {
                "featureType": "water"
            },
            "source": "openmaptiles",
            "source-layer": "water_name",
            "minzoom": 0,
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ]
            ],
            "layout": {
                "text-field": [
                    "let",
                    "localized_name",
                    [
                        "coalesce",
                        [
                            "get",
                            "name:en"
                        ],
                        [
                            "get",
                            "name_int"
                        ]
                    ],
                    [
                        "case",
                        [
                            "all",
                            [
                                "has",
                                "name:nonlatin"
                            ],
                            [
                                "!=",
                                [
                                    "var",
                                    "localized_name"
                                ],
                                [
                                    "get",
                                    "name:nonlatin"
                                ]
                            ]
                        ],
                        [
                            "concat",
                            [
                                "var",
                                "localized_name"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "has",
                            "name:nonlatin"
                        ],
                        [
                            "concat",
                            [
                                "get",
                                "name:latin"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "var",
                            "localized_name"
                        ]
                    ]
                ],
                "text-font": [
                    "Noto Sans Regular"
                ],
                "text-max-width": 5,
                "text-size": 12,
                "symbol-placement": "line"
            },
            "paint": {
                "text-color": "#5d60be",
                "text-halo-color": "rgba(255,255,255,0.7)",
                "text-halo-width": 1
            }
        },
        {
            "id": "water_name_point",
            "type": "symbol",
            "metadata": {
                "featureType": "water"
            },
            "source": "openmaptiles",
            "source-layer": "water_name",
            "minzoom": 2,
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "Point"
                ],
                [
                    "!=",
                    "class",
                    "ocean"
                ]
            ],
            "layout": {
                "text-field": [
                    "let",
                    "localized_name",
                    [
                        "coalesce",
                        [
                            "get",
                            "name:en"
                        ],
                        [
                            "get",
                            "name_int"
                        ]
                    ],
                    [
                        "case",
                        [
                            "all",
                            [
                                "has",
                                "name:nonlatin"
                            ],
                            [
                                "!=",
                                [
                                    "var",
                                    "localized_name"
                                ],
                                [
                                    "get",
                                    "name:nonlatin"
                                ]
                            ]
                        ],
                        [
                            "concat",
                            [
                                "var",
                                "localized_name"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "has",
                            "name:nonlatin"
                        ],
                        [
                            "concat",
                            [
                                "get",
                                "name:latin"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "var",
                            "localized_name"
                        ]
                    ]
                ],
                "text-font": [
                    "Noto Sans Regular"
                ],
                "text-max-width": 5,
                "text-size": 12
            },
            "paint": {
                "text-color": "rgba(76, 125, 173, 1)",
                "text-halo-color": "rgba(255,255,255,0)",
                "text-halo-width": 1
            },
            "maxzoom": 24
        },
        {
            "id": "water_ocean_name_point",
            "type": "symbol",
            "metadata": {
                "featureType": "water"
            },
            "source": "openmaptiles",
            "source-layer": "water_name",
            "minzoom": 0,
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "Point"
                ],
                [
                    "==",
                    "class",
                    "ocean"
                ]
            ],
            "layout": {
                "text-field": [
                    "let",
                    "localized_name",
                    [
                        "coalesce",
                        [
                            "get",
                            "name:en"
                        ],
                        [
                            "get",
                            "name_int"
                        ]
                    ],
                    [
                        "case",
                        [
                            "all",
                            [
                                "has",
                                "name:nonlatin"
                            ],
                            [
                                "!=",
                                [
                                    "var",
                                    "localized_name"
                                ],
                                [
                                    "get",
                                    "name:nonlatin"
                                ]
                            ]
                        ],
                        [
                            "concat",
                            [
                                "var",
                                "localized_name"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "has",
                            "name:nonlatin"
                        ],
                        [
                            "concat",
                            [
                                "get",
                                "name:latin"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "var",
                            "localized_name"
                        ]
                    ]
                ],
                "text-font": [
                    "Noto Sans Regular"
                ],
                "text-max-width": 5,
                "text-size": 12
            },
            "paint": {
                "text-color": "rgba(76, 125, 173, 1)",
                "text-halo-color": "rgba(255,255,255,0)",
                "text-halo-width": 1
            }
        },
        {
            "id": "poi_transit_station_bus",
            "type": "symbol",
            "metadata": {
                "featureType": "transit.station.bus"
            },
            "source": "openmaptiles",
            "source-layer": "poi",
            "filter": [
                "all",
                [
                    "in",
                    "class",
                    "bus"
                ]
            ],
            "layout": {
                "icon-image": "bus_11",
                "visibility": "visible",
                "icon-size": 0.9,
                "symbol-sort-key": [
                    "get",
                    "rank"
                ]
            },
            "minzoom": 16
        },
        {
            "id": "road_oneway",
            "type": "symbol",
            "source": "openmaptiles",
            "metadata": {
                "featureType": "road"
            },
            "source-layer": "transportation",
            "minzoom": 15,
            "filter": [
                "all",
                [
                    "==",
                    "oneway",
                    1
                ],
                [
                    "in",
                    "class",
                    "motorway",
                    "trunk",
                    "primary",
                    "secondary",
                    "tertiary",
                    "minor",
                    "service"
                ]
            ],
            "layout": {
                "symbol-placement": "line",
                "icon-image": "oneway",
                "symbol-spacing": 600,
                "icon-padding": 2,
                "icon-rotation-alignment": "map",
                "icon-rotate": 90,
                "icon-size": {
                    "stops": [
                        [
                            15,
                            0.5
                        ],
                        [
                            19,
                            1
                        ]
                    ]
                }
            },
            "paint": {
                "icon-opacity": 0.5
            }
        },
        {
            "id": "road_oneway_opposite",
            "type": "symbol",
            "source": "openmaptiles",
            "source-layer": "transportation",
            "metadata": {
                "featureType": "road"
            },
            "minzoom": 15,
            "filter": [
                "all",
                [
                    "==",
                    "oneway",
                    -1
                ],
                [
                    "in",
                    "class",
                    "motorway",
                    "trunk",
                    "primary",
                    "secondary",
                    "tertiary",
                    "minor",
                    "service"
                ]
            ],
            "layout": {
                "symbol-placement": "line",
                "icon-image": "oneway",
                "symbol-spacing": 600,
                "icon-padding": 2,
                "icon-rotation-alignment": "map",
                "icon-rotate": -90,
                "icon-size": {
                    "stops": [
                        [
                            15,
                            0.5
                        ],
                        [
                            19,
                            1
                        ]
                    ]
                }
            },
            "paint": {
                "icon-opacity": 0.5
            }
        },
        {
            "id": "road_label_local",
            "type": "symbol",
            "metadata": {
                "featureType": "road.local",
                "elementTypes": [
                    "labels"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation_name",
            "filter": [
                "in",
                "class",
                "minor",
                "path"
            ],
            "layout": {
                "symbol-spacing": 400,
                "symbol-placement": "line",
                "text-anchor": "center",
                "text-field": [
                    "let",
                    "localized_name",
                    [
                        "coalesce",
                        [
                            "get",
                            "name:en"
                        ],
                        [
                            "get",
                            "name_int"
                        ]
                    ],
                    [
                        "case",
                        [
                            "all",
                            [
                                "has",
                                "name:nonlatin"
                            ],
                            [
                                "!=",
                                [
                                    "var",
                                    "localized_name"
                                ],
                                [
                                    "get",
                                    "name:nonlatin"
                                ]
                            ]
                        ],
                        [
                            "concat",
                            [
                                "var",
                                "localized_name"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "has",
                            "name:nonlatin"
                        ],
                        [
                            "concat",
                            [
                                "get",
                                "name:latin"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "var",
                            "localized_name"
                        ]
                    ]
                ],
                "text-font": [
                    "Noto Sans Regular"
                ],
                "text-offset": [
                    0,
                    0.15
                ],
                "text-size": {
                    "base": 1,
                    "stops": [
                        [
                            13,
                            12
                        ],
                        [
                            14,
                            13
                        ]
                    ]
                }
            },
            "paint": {
                "text-color": "#615345",
                "text-halo-color": "rgba(255,255,255,1)",
                "text-halo-width": 1.1
            }
        },
        {
            "id": "road_label_arterial",
            "type": "symbol",
            "metadata": {
                "featureType": "road.arterial",
                "elementTypes": [
                    "labels"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation_name",
            "filter": [
                "in",
                "class",
                "primary",
                "secondary",
                "tertiary"
            ],
            "layout": {
                "symbol-spacing": 400,
                "symbol-placement": "line",
                "text-anchor": "center",
                "text-field": [
                    "let",
                    "localized_name",
                    [
                        "coalesce",
                        [
                            "get",
                            "name:en"
                        ],
                        [
                            "get",
                            "name_int"
                        ]
                    ],
                    [
                        "case",
                        [
                            "all",
                            [
                                "has",
                                "name:nonlatin"
                            ],
                            [
                                "!=",
                                [
                                    "var",
                                    "localized_name"
                                ],
                                [
                                    "get",
                                    "name:nonlatin"
                                ]
                            ]
                        ],
                        [
                            "concat",
                            [
                                "var",
                                "localized_name"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "has",
                            "name:nonlatin"
                        ],
                        [
                            "concat",
                            [
                                "get",
                                "name:latin"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "var",
                            "localized_name"
                        ]
                    ]
                ],
                "text-font": [
                    "Noto Sans Regular"
                ],
                "text-offset": [
                    0,
                    0.15
                ],
                "text-size": {
                    "base": 1,
                    "stops": [
                        [
                            13,
                            12
                        ],
                        [
                            14,
                            13
                        ]
                    ]
                }
            },
            "paint": {
                "text-color": "#615345",
                "text-halo-color": "rgba(255,255,255,1)",
                "text-halo-width": 1.1
            }
        },
        {
            "id": "road_label_highway",
            "type": "symbol",
            "metadata": {
                "featureType": "road.highway",
                "elementTypes": [
                    "labels"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "transportation_name",
            "filter": [
                "==",
                "class",
                "motorway"
            ],
            "layout": {
                "symbol-spacing": 400,
                "symbol-placement": "line",
                "text-anchor": "center",
                "text-field": [
                    "let",
                    "localized_name",
                    [
                        "coalesce",
                        [
                            "get",
                            "name:en"
                        ],
                        [
                            "get",
                            "name_int"
                        ]
                    ],
                    [
                        "case",
                        [
                            "all",
                            [
                                "has",
                                "name:nonlatin"
                            ],
                            [
                                "!=",
                                [
                                    "var",
                                    "localized_name"
                                ],
                                [
                                    "get",
                                    "name:nonlatin"
                                ]
                            ]
                        ],
                        [
                            "concat",
                            [
                                "var",
                                "localized_name"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "has",
                            "name:nonlatin"
                        ],
                        [
                            "concat",
                            [
                                "get",
                                "name:latin"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "var",
                            "localized_name"
                        ]
                    ]
                ],
                "text-font": [
                    "Noto Sans Regular"
                ],
                "text-offset": [
                    0,
                    0.15
                ],
                "text-size": {
                    "base": 1,
                    "stops": [
                        [
                            13,
                            12
                        ],
                        [
                            14,
                            13
                        ]
                    ]
                }
            },
            "paint": {
                "text-color": "#615345",
                "text-halo-color": "rgba(255,255,255,1)",
                "text-halo-width": 1.1
            }
        },
        {
            "id": "labels_roads.roads.pedestrian.aerialway",
            "metadata": {
                "featureType": "roads.pedestrian.aerialway",
                "elementTypes": [
                    "labels"
                ]
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ],
                [
                    "in",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "literal",
                        [
                            "aerialway"
                        ]
                    ]
                ],
                [
                    "!",
                    [
                        "in",
                        [
                            "get",
                            "brunnel"
                        ],
                        [
                            "literal",
                            [
                                "bridge",
                                "tunnel"
                            ]
                        ]
                    ]
                ]
            ],
            "source-layer": "transportation_name",
            "source": "openmaptiles",
            "type": "symbol",
            "paint": {
                "text-color": "#666",
                "text-halo-blur": 0.2,
                "text-halo-color": "rgba(255,255,255,1)",
                "text-halo-width": 1.2
            },
            "layout": {
                "visibility": "visible",
                "text-allow-overlap": false,
                "symbol-placement": "line",
                "symbol-spacing": 400.0,
                "text-field": [
                    "get",
                    "name"
                ],
                "text-font": [
                    "Noto Sans Regular"
                ],
                "text-size": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    8,
                    10,
                    14,
                    13
                ],
                "text-max-width": 6.25
            }
        },
        {
            "id": "highway-shield",
            "type": "symbol",
            "metadata": {
                "featureType": "road.highway",
                "elementType": "label"
            },
            "source": "openmaptiles",
            "source-layer": "transportation_name",
            "minzoom": 8,
            "filter": [
                "all",
                [
                    "<=",
                    "ref_length",
                    6
                ],
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "!in",
                    "network",
                    "us-interstate",
                    "us-highway",
                    "us-state"
                ]
            ],
            "layout": {
                "text-size": 10,
                "icon-image": "road",
                "icon-text-fit": "both",
                "icon-rotation-alignment": "viewport",
                "symbol-spacing": 200,
                "text-font": [
                    "Noto Sans Regular"
                ],
                "symbol-placement": {
                    "base": 1,
                    "stops": [
                        [
                            10,
                            "point"
                        ],
                        [
                            11,
                            "line"
                        ]
                    ]
                },
                "text-rotation-alignment": "viewport",
                "icon-size": 1,
                "text-field": "{ref}",
                "symbol-avoid-edges": true
            },
            "paint": {
                "text-color": "rgba(37, 36, 36, 1)"
            }
        },
        {
            "id": "highway-shield-us-interstate",
            "type": "symbol",
            "source": "openmaptiles",
            "source-layer": "transportation_name",
            "minzoom": 7,
            "filter": [
                "all",
                [
                    "<=",
                    "ref_length",
                    6
                ],
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "in",
                    "network",
                    "us-interstate"
                ]
            ],
            "layout": {
                "text-size": 9,
                "icon-image": "{network}_{ref_length}",
                "icon-rotation-alignment": "viewport",
                "symbol-spacing": 200,
                "text-font": [
                    "Noto Sans Regular"
                ],
                "symbol-placement": {
                    "base": 1,
                    "stops": [
                        [
                            7,
                            "point"
                        ],
                        [
                            7,
                            "line"
                        ],
                        [
                            8,
                            "line"
                        ]
                    ]
                },
                "text-rotation-alignment": "viewport",
                "icon-size": 1,
                "text-field": "{ref}",
                "symbol-avoid-edges": true
            },
            "paint": {
                "text-color": "rgba(255, 255, 255, 1)"
            }
        },
        {
            "id": "highway-shield-us-other",
            "type": "symbol",
            "source": "openmaptiles",
            "source-layer": "transportation_name",
            "minzoom": 9,
            "filter": [
                "all",
                [
                    "<=",
                    "ref_length",
                    6
                ],
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "in",
                    "network",
                    "us-highway",
                    "us-state"
                ]
            ],
            "layout": {
                "text-size": 9,
                "icon-image": "{network}_{ref_length}",
                "icon-rotation-alignment": "viewport",
                "symbol-spacing": 200,
                "text-font": [
                    "Noto Sans Regular"
                ],
                "symbol-placement": {
                    "base": 1,
                    "stops": [
                        [
                            10,
                            "point"
                        ],
                        [
                            11,
                            "line"
                        ]
                    ]
                },
                "text-rotation-alignment": "viewport",
                "icon-size": 1,
                "text-field": "{ref}",
                "symbol-avoid-edges": true
            },
            "paint": {
                "text-color": "rgba(37, 36, 36, 1)"
            }
        },
        {
            "id": "point_of_interest",
            "metadata": {
                "featureType": "point_of_interest",
                "elementTypes": [
                    "labels"
                ],
                "poiMetadata": {
                    "park": {
                        "filter": [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "park"
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "green",
                        "text_color": "rgb(0, 89, 0)",
                        "icon": "park",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "place_of_worship": {
                        "filter": [
                            "all",
                            [
                                "==",
                                [
                                    "get",
                                    "class"
                                ],
                                "place_of_worship"
                            ],
                            [
                                "has",
                                "subclass"
                            ]
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "grey",
                        "text_color": "rgb(89, 89, 89)",
                        "icon": "place-of-worship",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "medical.hospital": {
                        "filter": [
                            "all",
                            [
                                "==",
                                [
                                    "get",
                                    "class"
                                ],
                                "hospital"
                            ],
                            [
                                "==",
                                [
                                    "get",
                                    "subclass"
                                ],
                                "hospital"
                            ]
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "rgb(255, 25, 25)",
                        "text_color": "rgb(196, 0, 0)",
                        "icon": "hospital",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "medical.pharmacy": {
                        "filter": [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "pharmacy"
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "rgb(255, 25, 25)",
                        "text_color": "rgb(196, 0, 0)",
                        "icon": "pharmacy",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "police": {
                        "filter": [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "police"
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "#0056d6",
                        "text_color": "rgb(0, 60, 149)",
                        "icon": "police",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "education.university": {
                        "filter": [
                            "all",
                            [
                                "==",
                                [
                                    "get",
                                    "class"
                                ],
                                "college"
                            ],
                            [
                                "==",
                                [
                                    "get",
                                    "subclass"
                                ],
                                "university"
                            ]
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "brown",
                        "text_color": "rgb(115, 29, 29)",
                        "icon": "college",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "education.school": {
                        "filter": [
                            "all",
                            [
                                "==",
                                [
                                    "get",
                                    "class"
                                ],
                                "school"
                            ],
                            [
                                "==",
                                [
                                    "get",
                                    "subclass"
                                ],
                                "school"
                            ]
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "brown",
                        "text_color": "rgb(115, 29, 29)",
                        "icon": "school",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "sports_complex": {
                        "filter": [
                            "in",
                            [
                                "get",
                                "class"
                            ],
                            [
                                "literal",
                                [
                                    "sports_centre",
                                    "stadium"
                                ]
                            ]
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "green",
                        "text_color": "rgb(0, 89, 0)",
                        "icon": "pitch",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "government": {
                        "filter": [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "townhall"
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "grey",
                        "text_color": "rgb(89, 89, 89)",
                        "icon": "town-hall",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "post": {
                        "filter": [
                            "all",
                            [
                                "==",
                                [
                                    "get",
                                    "class"
                                ],
                                "post"
                            ],
                            [
                                "==",
                                [
                                    "get",
                                    "subclass"
                                ],
                                "post_office"
                            ]
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "grey",
                        "text_color": "rgb(89, 89, 89)",
                        "icon": "post",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "tourism.monument.castle": {
                        "filter": [
                            "all",
                            [
                                "==",
                                [
                                    "get",
                                    "class"
                                ],
                                "castle"
                            ],
                            [
                                "==",
                                [
                                    "get",
                                    "subclass"
                                ],
                                "castle"
                            ]
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "grey",
                        "text_color": "rgb(89, 89, 89)",
                        "icon": "castle",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "tourism.museum": {
                        "filter": [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "museum"
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "grey",
                        "text_color": "rgb(89, 89, 89)",
                        "icon": "museum",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "tourism.monument": {
                        "filter": [
                            "all",
                            [
                                "!",
                                [
                                    "has",
                                    "level"
                                ]
                            ],
                            [
                                "==",
                                [
                                    "get",
                                    "class"
                                ],
                                "monument"
                            ]
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "grey",
                        "text_color": "rgb(89, 89, 89)",
                        "icon": "monument",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "tourism.attraction": {
                        "filter": [
                            "all",
                            [
                                "!",
                                [
                                    "has",
                                    "level"
                                ]
                            ],
                            [
                                "==",
                                [
                                    "get",
                                    "class"
                                ],
                                "attraction"
                            ],
                            [
                                "==",
                                [
                                    "get",
                                    "subclass"
                                ],
                                "attraction"
                            ]
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "grey",
                        "text_color": "rgb(89, 89, 89)",
                        "icon": "attraction",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "tourism.attraction.zoo": {
                        "filter": [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "zoo"
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "green",
                        "text_color": "rgb(0, 89, 0)",
                        "icon": "zoo",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "hospitality.hotels": {
                        "filter": [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "hotel"
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "purple",
                        "text_color": "rgb(89, 0, 89)",
                        "icon": "lodging",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "business.mall": {
                        "filter": [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "mall"
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "#ee9316",
                        "text_color": "rgb(169, 103, 12)",
                        "icon": "shop",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "business.cinema": {
                        "filter": [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "cinema"
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "#ee9316",
                        "text_color": "rgb(169, 103, 12)",
                        "icon": "cinema",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "business.finance.bank": {
                        "filter": [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "bank"
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "grey",
                        "text_color": "rgb(89, 89, 89)",
                        "icon": "building",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "business.finance.atm": {
                        "filter": [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "atm"
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "grey",
                        "text_color": "rgb(89, 89, 89)",
                        "icon": "bank",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "business.shop.grocery": {
                        "filter": [
                            "all",
                            [
                                "==",
                                [
                                    "get",
                                    "class"
                                ],
                                "grocery"
                            ],
                            [
                                "!",
                                [
                                    "in",
                                    [
                                        "get",
                                        "subclass"
                                    ],
                                    [
                                        "literal",
                                        [
                                            "marketplace"
                                        ]
                                    ]
                                ]
                            ]
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "#ee9316",
                        "text_color": "rgb(169, 103, 12)",
                        "icon": "grocery",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "business.shop.toys": {
                        "filter": [
                            "all",
                            [
                                "==",
                                [
                                    "get",
                                    "class"
                                ],
                                "shop"
                            ],
                            [
                                "==",
                                [
                                    "get",
                                    "subclass"
                                ],
                                "toys"
                            ]
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "#ee9316",
                        "text_color": "rgb(169, 103, 12)",
                        "icon": "shop",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "business.shop.butcher": {
                        "filter": [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "butcher"
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "#ee9316",
                        "text_color": "rgb(169, 103, 12)",
                        "icon": "butcher",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "business.shop.bakery": {
                        "filter": [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "bakery"
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "#ee9316",
                        "text_color": "rgb(169, 103, 12)",
                        "icon": "bakery",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "business.shop.library": {
                        "filter": [
                            "all",
                            [
                                "==",
                                [
                                    "get",
                                    "class"
                                ],
                                "library"
                            ],
                            [
                                "==",
                                [
                                    "get",
                                    "subclass"
                                ],
                                "books"
                            ]
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "#ee9316",
                        "text_color": "rgb(169, 103, 12)",
                        "icon": "library",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "business.shop.electronics": {
                        "filter": [
                            "all",
                            [
                                "==",
                                [
                                    "get",
                                    "class"
                                ],
                                "shop"
                            ],
                            [
                                "==",
                                [
                                    "get",
                                    "subclass"
                                ],
                                "electronics"
                            ]
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "#ee9316",
                        "text_color": "rgb(169, 103, 12)",
                        "icon": "shop",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "business.shop.furniture": {
                        "filter": [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "furniture"
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "#ee9316",
                        "text_color": "rgb(169, 103, 12)",
                        "icon": "furniture",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "business.shop.sports": {
                        "filter": [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "sports"
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "#ee9316",
                        "text_color": "rgb(169, 103, 12)",
                        "icon": "pitch",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "business.shop.clothes": {
                        "filter": [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "clothes"
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "#ee9316",
                        "text_color": "rgb(169, 103, 12)",
                        "icon": "clothing-store",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "business.food_and_drinks.bar": {
                        "filter": [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "bar"
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "#ee9316",
                        "text_color": "rgb(169, 103, 12)",
                        "icon": "bar",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "business.food_and_drinks.pub": {
                        "filter": [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "pub"
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "#ee9316",
                        "text_color": "rgb(169, 103, 12)",
                        "icon": "beer",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "business.food_and_drinks.cafe": {
                        "filter": [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "cafe"
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "#ee9316",
                        "text_color": "rgb(169, 103, 12)",
                        "icon": "cafe",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "business.food_and_drinks.fast_food": {
                        "filter": [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "fast_food"
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "#ee9316",
                        "text_color": "rgb(169, 103, 12)",
                        "icon": "fast-food",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "business.food_and_drinks.restaurant": {
                        "filter": [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "restaurant"
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "#ee9316",
                        "text_color": "rgb(169, 103, 12)",
                        "icon": "restaurant",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "business.parking": {
                        "filter": [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "parking"
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "#03b1fc",
                        "text_color": "rgb(2, 123, 176)",
                        "icon": "parking",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "business.fuel": {
                        "filter": [
                            "all",
                            [
                                "==",
                                [
                                    "get",
                                    "class"
                                ],
                                "fuel"
                            ],
                            [
                                "==",
                                [
                                    "get",
                                    "subclass"
                                ],
                                "fuel"
                            ]
                        ],
                        "symbol_color": "#fff",
                        "symbol_halo_color": "#ee9316",
                        "text_color": "rgb(169, 103, 12)",
                        "icon": "fuel",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    }
                },
                "poiBaseFilter": [
                    "all",
                    [
                        "has",
                        "name"
                    ],
                    [
                        "==",
                        [
                            "geometry-type"
                        ],
                        "Point"
                    ],
                    [
                        "<",
                        [
                            "get",
                            "rank"
                        ],
                        [
                            "interpolate",
                            [
                                "linear"
                            ],
                            [
                                "zoom"
                            ],
                            14,
                            10,
                            15,
                            50,
                            16,
                            100,
                            17,
                            150,
                            18,
                            400,
                            19,
                            800,
                            20,
                            1000
                        ]
                    ]
                ]
            },
            "filter": [
                "all",
                [
                    "has",
                    "name"
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "Point"
                ],
                [
                    "<",
                    [
                        "get",
                        "rank"
                    ],
                    [
                        "interpolate",
                        [
                            "linear"
                        ],
                        [
                            "zoom"
                        ],
                        14,
                        10,
                        15,
                        50,
                        16,
                        100,
                        17,
                        150,
                        18,
                        400,
                        19,
                        800,
                        20,
                        1000
                    ]
                ],
                [
                    "any",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "park"
                    ],
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "place_of_worship"
                        ],
                        [
                            "has",
                            "subclass"
                        ]
                    ],
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "hospital"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "hospital"
                        ]
                    ],
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "pharmacy"
                    ],
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "police"
                    ],
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "college"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "university"
                        ]
                    ],
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "school"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "school"
                        ]
                    ],
                    [
                        "in",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "literal",
                            [
                                "sports_centre",
                                "stadium"
                            ]
                        ]
                    ],
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "townhall"
                    ],
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "post"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "post_office"
                        ]
                    ],
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "castle"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "castle"
                        ]
                    ],
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "museum"
                    ],
                    [
                        "all",
                        [
                            "!",
                            [
                                "has",
                                "level"
                            ]
                        ],
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "monument"
                        ]
                    ],
                    [
                        "all",
                        [
                            "!",
                            [
                                "has",
                                "level"
                            ]
                        ],
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "attraction"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "attraction"
                        ]
                    ],
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "zoo"
                    ],
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "hotel"
                    ],
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "mall"
                    ],
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "cinema"
                    ],
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "bank"
                    ],
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "atm"
                    ],
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "grocery"
                        ],
                        [
                            "!",
                            [
                                "in",
                                [
                                    "get",
                                    "subclass"
                                ],
                                [
                                    "literal",
                                    [
                                        "marketplace"
                                    ]
                                ]
                            ]
                        ]
                    ],
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "shop"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "toys"
                        ]
                    ],
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "butcher"
                    ],
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "bakery"
                    ],
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "library"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "books"
                        ]
                    ],
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "shop"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "electronics"
                        ]
                    ],
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "furniture"
                    ],
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "sports"
                    ],
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "clothes"
                    ],
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "bar"
                    ],
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "pub"
                    ],
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "cafe"
                    ],
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "fast_food"
                    ],
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "restaurant"
                    ],
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "parking"
                    ],
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "fuel"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "fuel"
                        ]
                    ]
                ]
            ],
            "source-layer": "poi",
            "source": "openmaptiles",
            "type": "symbol",
            "paint": {
                "icon-color": [
                    "case",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "park"
                    ],
                    "#fff",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "place_of_worship"
                        ],
                        [
                            "has",
                            "subclass"
                        ]
                    ],
                    "#fff",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "hospital"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "hospital"
                        ]
                    ],
                    "#fff",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "pharmacy"
                    ],
                    "#fff",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "police"
                    ],
                    "#fff",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "college"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "university"
                        ]
                    ],
                    "#fff",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "school"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "school"
                        ]
                    ],
                    "#fff",
                    [
                        "in",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "literal",
                            [
                                "sports_centre",
                                "stadium"
                            ]
                        ]
                    ],
                    "#fff",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "townhall"
                    ],
                    "#fff",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "post"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "post_office"
                        ]
                    ],
                    "#fff",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "castle"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "castle"
                        ]
                    ],
                    "#fff",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "museum"
                    ],
                    "#fff",
                    [
                        "all",
                        [
                            "!",
                            [
                                "has",
                                "level"
                            ]
                        ],
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "monument"
                        ]
                    ],
                    "#fff",
                    [
                        "all",
                        [
                            "!",
                            [
                                "has",
                                "level"
                            ]
                        ],
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "attraction"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "attraction"
                        ]
                    ],
                    "#fff",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "zoo"
                    ],
                    "#fff",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "hotel"
                    ],
                    "#fff",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "mall"
                    ],
                    "#fff",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "cinema"
                    ],
                    "#fff",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "bank"
                    ],
                    "#fff",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "atm"
                    ],
                    "#fff",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "grocery"
                        ],
                        [
                            "!",
                            [
                                "in",
                                [
                                    "get",
                                    "subclass"
                                ],
                                [
                                    "literal",
                                    [
                                        "marketplace"
                                    ]
                                ]
                            ]
                        ]
                    ],
                    "#fff",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "shop"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "toys"
                        ]
                    ],
                    "#fff",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "butcher"
                    ],
                    "#fff",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "bakery"
                    ],
                    "#fff",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "library"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "books"
                        ]
                    ],
                    "#fff",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "shop"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "electronics"
                        ]
                    ],
                    "#fff",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "furniture"
                    ],
                    "#fff",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "sports"
                    ],
                    "#fff",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "clothes"
                    ],
                    "#fff",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "bar"
                    ],
                    "#fff",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "pub"
                    ],
                    "#fff",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "cafe"
                    ],
                    "#fff",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "fast_food"
                    ],
                    "#fff",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "restaurant"
                    ],
                    "#fff",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "parking"
                    ],
                    "#fff",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "fuel"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "fuel"
                        ]
                    ],
                    "#fff",
                    "transparent"
                ],
                "icon-halo-color": [
                    "case",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "park"
                    ],
                    "green",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "place_of_worship"
                        ],
                        [
                            "has",
                            "subclass"
                        ]
                    ],
                    "grey",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "hospital"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "hospital"
                        ]
                    ],
                    "rgb(255, 25, 25)",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "pharmacy"
                    ],
                    "rgb(255, 25, 25)",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "police"
                    ],
                    "#0056d6",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "college"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "university"
                        ]
                    ],
                    "brown",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "school"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "school"
                        ]
                    ],
                    "brown",
                    [
                        "in",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "literal",
                            [
                                "sports_centre",
                                "stadium"
                            ]
                        ]
                    ],
                    "green",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "townhall"
                    ],
                    "grey",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "post"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "post_office"
                        ]
                    ],
                    "grey",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "castle"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "castle"
                        ]
                    ],
                    "grey",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "museum"
                    ],
                    "grey",
                    [
                        "all",
                        [
                            "!",
                            [
                                "has",
                                "level"
                            ]
                        ],
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "monument"
                        ]
                    ],
                    "grey",
                    [
                        "all",
                        [
                            "!",
                            [
                                "has",
                                "level"
                            ]
                        ],
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "attraction"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "attraction"
                        ]
                    ],
                    "grey",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "zoo"
                    ],
                    "green",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "hotel"
                    ],
                    "purple",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "mall"
                    ],
                    "#ee9316",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "cinema"
                    ],
                    "#ee9316",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "bank"
                    ],
                    "grey",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "atm"
                    ],
                    "grey",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "grocery"
                        ],
                        [
                            "!",
                            [
                                "in",
                                [
                                    "get",
                                    "subclass"
                                ],
                                [
                                    "literal",
                                    [
                                        "marketplace"
                                    ]
                                ]
                            ]
                        ]
                    ],
                    "#ee9316",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "shop"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "toys"
                        ]
                    ],
                    "#ee9316",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "butcher"
                    ],
                    "#ee9316",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "bakery"
                    ],
                    "#ee9316",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "library"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "books"
                        ]
                    ],
                    "#ee9316",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "shop"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "electronics"
                        ]
                    ],
                    "#ee9316",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "furniture"
                    ],
                    "#ee9316",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "sports"
                    ],
                    "#ee9316",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "clothes"
                    ],
                    "#ee9316",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "bar"
                    ],
                    "#ee9316",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "pub"
                    ],
                    "#ee9316",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "cafe"
                    ],
                    "#ee9316",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "fast_food"
                    ],
                    "#ee9316",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "restaurant"
                    ],
                    "#ee9316",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "parking"
                    ],
                    "#03b1fc",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "fuel"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "fuel"
                        ]
                    ],
                    "#ee9316",
                    "transparent"
                ],
                "icon-halo-width": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    14,
                    2.8,
                    16,
                    4
                ],
                "text-color": [
                    "case",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "park"
                    ],
                    "green",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "place_of_worship"
                        ],
                        [
                            "has",
                            "subclass"
                        ]
                    ],
                    "grey",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "hospital"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "hospital"
                        ]
                    ],
                    "rgb(255, 25, 25)",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "pharmacy"
                    ],
                    "rgb(255, 25, 25)",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "police"
                    ],
                    "#0056d6",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "college"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "university"
                        ]
                    ],
                    "brown",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "school"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "school"
                        ]
                    ],
                    "brown",
                    [
                        "in",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "literal",
                            [
                                "sports_centre",
                                "stadium"
                            ]
                        ]
                    ],
                    "green",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "townhall"
                    ],
                    "grey",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "post"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "post_office"
                        ]
                    ],
                    "grey",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "castle"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "castle"
                        ]
                    ],
                    "grey",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "museum"
                    ],
                    "grey",
                    [
                        "all",
                        [
                            "!",
                            [
                                "has",
                                "level"
                            ]
                        ],
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "monument"
                        ]
                    ],
                    "grey",
                    [
                        "all",
                        [
                            "!",
                            [
                                "has",
                                "level"
                            ]
                        ],
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "attraction"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "attraction"
                        ]
                    ],
                    "grey",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "zoo"
                    ],
                    "green",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "hotel"
                    ],
                    "purple",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "mall"
                    ],
                    "#ee9316",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "cinema"
                    ],
                    "#ee9316",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "bank"
                    ],
                    "grey",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "atm"
                    ],
                    "grey",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "grocery"
                        ],
                        [
                            "!",
                            [
                                "in",
                                [
                                    "get",
                                    "subclass"
                                ],
                                [
                                    "literal",
                                    [
                                        "marketplace"
                                    ]
                                ]
                            ]
                        ]
                    ],
                    "#ee9316",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "shop"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "toys"
                        ]
                    ],
                    "#ee9316",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "butcher"
                    ],
                    "#ee9316",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "bakery"
                    ],
                    "#ee9316",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "library"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "books"
                        ]
                    ],
                    "#ee9316",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "shop"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "electronics"
                        ]
                    ],
                    "#ee9316",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "furniture"
                    ],
                    "#ee9316",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "sports"
                    ],
                    "#ee9316",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "clothes"
                    ],
                    "#ee9316",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "bar"
                    ],
                    "#ee9316",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "pub"
                    ],
                    "#ee9316",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "cafe"
                    ],
                    "#ee9316",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "fast_food"
                    ],
                    "#ee9316",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "restaurant"
                    ],
                    "#ee9316",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "parking"
                    ],
                    "#03b1fc",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "fuel"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "fuel"
                        ]
                    ],
                    "#ee9316",
                    "transparent"
                ],
                "text-halo-blur": 0.2,
                "text-halo-color": "#fff",
                "text-halo-width": 1.3
            },
            "layout": {
                "visibility": "none",
                "icon-allow-overlap": false,
                "icon-image": [
                    "case",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "park"
                    ],
                    "park",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "place_of_worship"
                        ],
                        [
                            "has",
                            "subclass"
                        ]
                    ],
                    "place-of-worship",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "hospital"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "hospital"
                        ]
                    ],
                    "hospital",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "pharmacy"
                    ],
                    "pharmacy",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "police"
                    ],
                    "police",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "college"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "university"
                        ]
                    ],
                    "college",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "school"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "school"
                        ]
                    ],
                    "school",
                    [
                        "in",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "literal",
                            [
                                "sports_centre",
                                "stadium"
                            ]
                        ]
                    ],
                    "pitch",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "townhall"
                    ],
                    "town-hall",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "post"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "post_office"
                        ]
                    ],
                    "post",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "castle"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "castle"
                        ]
                    ],
                    "castle",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "museum"
                    ],
                    "museum",
                    [
                        "all",
                        [
                            "!",
                            [
                                "has",
                                "level"
                            ]
                        ],
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "monument"
                        ]
                    ],
                    "monument",
                    [
                        "all",
                        [
                            "!",
                            [
                                "has",
                                "level"
                            ]
                        ],
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "attraction"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "attraction"
                        ]
                    ],
                    "attraction",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "zoo"
                    ],
                    "zoo",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "hotel"
                    ],
                    "lodging",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "mall"
                    ],
                    "shop",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "cinema"
                    ],
                    "cinema",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "bank"
                    ],
                    "building",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "atm"
                    ],
                    "bank",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "grocery"
                        ],
                        [
                            "!",
                            [
                                "in",
                                [
                                    "get",
                                    "subclass"
                                ],
                                [
                                    "literal",
                                    [
                                        "marketplace"
                                    ]
                                ]
                            ]
                        ]
                    ],
                    "grocery",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "shop"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "toys"
                        ]
                    ],
                    "shop",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "butcher"
                    ],
                    "butcher",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "bakery"
                    ],
                    "bakery",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "library"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "books"
                        ]
                    ],
                    "library",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "shop"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "electronics"
                        ]
                    ],
                    "shop",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "furniture"
                    ],
                    "furniture",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "sports"
                    ],
                    "pitch",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "clothes"
                    ],
                    "clothing-store",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "bar"
                    ],
                    "bar",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "pub"
                    ],
                    "beer",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "cafe"
                    ],
                    "cafe",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "fast_food"
                    ],
                    "fast-food",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "restaurant"
                    ],
                    "restaurant",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "parking"
                    ],
                    "parking",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "fuel"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "fuel"
                        ]
                    ],
                    "fuel",
                    "circle"
                ],
                "icon-padding": 8.0,
                "icon-size": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    14,
                    0.7,
                    16,
                    1
                ],
                "symbol-sort-key": [
                    "get",
                    "rank"
                ],
                "text-field": [
                    "get",
                    "name"
                ],
                "text-font": [
                    "Noto Sans Bold"
                ],
                "text-size": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    10,
                    10,
                    14,
                    11
                ],
                "text-variable-anchor": [
                    "left",
                    "right"
                ],
                "text-justify": "auto",
                "text-offset": [
                    0,
                    1
                ],
                "text-optional": true,
                "text-padding": 15,
                "text-max-width": 6.25
            }
        },
        {
            "id": "poi",
            "metadata": {
                "featureType": "poi",
                "elementTypes": [
                    "labels"
                ],
                "poiMetadata": {
                    "park": {
                        "filter": [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "park"
                        ],
                        "symbol_color": "green",
                        "symbol_halo_color": "#fff",
                        "text_color": "#444",
                        "icon": "park",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "place_of_worship": {
                        "filter": [
                            "all",
                            [
                                "==",
                                [
                                    "get",
                                    "class"
                                ],
                                "place_of_worship"
                            ],
                            [
                                "has",
                                "subclass"
                            ]
                        ],
                        "symbol_color": "grey",
                        "symbol_halo_color": "#fff",
                        "text_color": "#444",
                        "icon": "place-of-worship",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "medical.hospital": {
                        "filter": [
                            "all",
                            [
                                "==",
                                [
                                    "get",
                                    "class"
                                ],
                                "hospital"
                            ],
                            [
                                "==",
                                [
                                    "get",
                                    "subclass"
                                ],
                                "hospital"
                            ]
                        ],
                        "symbol_color": "rgb(255, 25, 25)",
                        "symbol_halo_color": "#fff",
                        "text_color": "#444",
                        "icon": "hospital",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "school.university": {
                        "filter": [
                            "all",
                            [
                                "==",
                                [
                                    "get",
                                    "class"
                                ],
                                "college"
                            ],
                            [
                                "==",
                                [
                                    "get",
                                    "subclass"
                                ],
                                "university"
                            ]
                        ],
                        "symbol_color": "brown",
                        "symbol_halo_color": "#fff",
                        "text_color": "#444",
                        "icon": "college",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "sports_complex": {
                        "filter": [
                            "in",
                            [
                                "get",
                                "class"
                            ],
                            [
                                "literal",
                                [
                                    "sports_centre",
                                    "stadium"
                                ]
                            ]
                        ],
                        "symbol_color": "green",
                        "symbol_halo_color": "#fff",
                        "text_color": "#444",
                        "icon": "pitch",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "government": {
                        "filter": [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "townhall"
                        ],
                        "symbol_color": "grey",
                        "symbol_halo_color": "#fff",
                        "text_color": "#444",
                        "icon": "town-hall",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "museum": {
                        "filter": [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "museum"
                        ],
                        "symbol_color": "grey",
                        "symbol_halo_color": "#fff",
                        "text_color": "#444",
                        "icon": "museum",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "monument": {
                        "filter": [
                            "all",
                            [
                                "!",
                                [
                                    "has",
                                    "level"
                                ]
                            ],
                            [
                                "==",
                                [
                                    "get",
                                    "class"
                                ],
                                "monument"
                            ]
                        ],
                        "symbol_color": "grey",
                        "symbol_halo_color": "#fff",
                        "text_color": "#444",
                        "icon": "monument",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "attraction": {
                        "filter": [
                            "all",
                            [
                                "!",
                                [
                                    "has",
                                    "level"
                                ]
                            ],
                            [
                                "==",
                                [
                                    "get",
                                    "class"
                                ],
                                "attraction"
                            ],
                            [
                                "==",
                                [
                                    "get",
                                    "subclass"
                                ],
                                "attraction"
                            ]
                        ],
                        "symbol_color": "grey",
                        "symbol_halo_color": "#fff",
                        "text_color": "#444",
                        "icon": "attraction",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "police": {
                        "filter": [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "police"
                        ],
                        "symbol_color": "#0056d6",
                        "symbol_halo_color": "#fff",
                        "text_color": "#444",
                        "icon": "police",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    },
                    "business.parking": {
                        "filter": [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "parking"
                        ],
                        "symbol_color": "#03b1fc",
                        "symbol_halo_color": "#fff",
                        "text_color": "#444",
                        "icon": "parking",
                        "visible": false,
                        "visibility": {},
                        "colors": {}
                    }
                },
                "poiBaseFilter": [
                    "all",
                    [
                        "has",
                        "name"
                    ],
                    [
                        "==",
                        [
                            "geometry-type"
                        ],
                        "Point"
                    ],
                    [
                        "<",
                        [
                            "get",
                            "rank"
                        ],
                        [
                            "interpolate",
                            [
                                "linear"
                            ],
                            [
                                "zoom"
                            ],
                            14,
                            10,
                            15,
                            50,
                            16,
                            100,
                            17,
                            150,
                            18,
                            400,
                            19,
                            800,
                            20,
                            1000
                        ]
                    ]
                ]
            },
            "filter": [
                "all",
                [
                    "has",
                    "name"
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "Point"
                ],
                [
                    "<",
                    [
                        "get",
                        "rank"
                    ],
                    [
                        "interpolate",
                        [
                            "linear"
                        ],
                        [
                            "zoom"
                        ],
                        14,
                        10,
                        15,
                        50,
                        16,
                        100,
                        17,
                        150,
                        18,
                        400,
                        19,
                        800,
                        20,
                        1000
                    ]
                ],
                [
                    "any",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "park"
                    ],
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "place_of_worship"
                        ],
                        [
                            "has",
                            "subclass"
                        ]
                    ],
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "hospital"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "hospital"
                        ]
                    ],
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "college"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "university"
                        ]
                    ],
                    [
                        "in",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "literal",
                            [
                                "sports_centre",
                                "stadium"
                            ]
                        ]
                    ],
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "townhall"
                    ],
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "museum"
                    ],
                    [
                        "all",
                        [
                            "!",
                            [
                                "has",
                                "level"
                            ]
                        ],
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "monument"
                        ]
                    ],
                    [
                        "all",
                        [
                            "!",
                            [
                                "has",
                                "level"
                            ]
                        ],
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "attraction"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "attraction"
                        ]
                    ],
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "police"
                    ],
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "parking"
                    ]
                ]
            ],
            "source-layer": "poi",
            "source": "openmaptiles",
            "type": "symbol",
            "paint": {
                "icon-color": [
                    "case",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "park"
                    ],
                    "green",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "place_of_worship"
                        ],
                        [
                            "has",
                            "subclass"
                        ]
                    ],
                    "grey",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "hospital"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "hospital"
                        ]
                    ],
                    "rgb(255, 25, 25)",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "college"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "university"
                        ]
                    ],
                    "brown",
                    [
                        "in",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "literal",
                            [
                                "sports_centre",
                                "stadium"
                            ]
                        ]
                    ],
                    "green",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "townhall"
                    ],
                    "grey",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "museum"
                    ],
                    "grey",
                    [
                        "all",
                        [
                            "!",
                            [
                                "has",
                                "level"
                            ]
                        ],
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "monument"
                        ]
                    ],
                    "grey",
                    [
                        "all",
                        [
                            "!",
                            [
                                "has",
                                "level"
                            ]
                        ],
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "attraction"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "attraction"
                        ]
                    ],
                    "grey",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "police"
                    ],
                    "#0056d6",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "parking"
                    ],
                    "#03b1fc",
                    "transparent"
                ],
                "icon-halo-color": [
                    "case",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "park"
                    ],
                    "#fff",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "place_of_worship"
                        ],
                        [
                            "has",
                            "subclass"
                        ]
                    ],
                    "#fff",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "hospital"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "hospital"
                        ]
                    ],
                    "#fff",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "college"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "university"
                        ]
                    ],
                    "#fff",
                    [
                        "in",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "literal",
                            [
                                "sports_centre",
                                "stadium"
                            ]
                        ]
                    ],
                    "#fff",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "townhall"
                    ],
                    "#fff",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "museum"
                    ],
                    "#fff",
                    [
                        "all",
                        [
                            "!",
                            [
                                "has",
                                "level"
                            ]
                        ],
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "monument"
                        ]
                    ],
                    "#fff",
                    [
                        "all",
                        [
                            "!",
                            [
                                "has",
                                "level"
                            ]
                        ],
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "attraction"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "attraction"
                        ]
                    ],
                    "#fff",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "police"
                    ],
                    "#fff",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "parking"
                    ],
                    "#fff",
                    "transparent"
                ],
                "icon-halo-width": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    14,
                    2.8,
                    16,
                    4
                ],
                "text-color": "#444",
                "text-halo-blur": 0.2,
                "text-halo-color": "#fff",
                "text-halo-width": 1.3
            },
            "layout": {
                "visibility": "none",
                "icon-allow-overlap": false,
                "icon-image": [
                    "case",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "park"
                    ],
                    "park",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "place_of_worship"
                        ],
                        [
                            "has",
                            "subclass"
                        ]
                    ],
                    "place-of-worship",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "hospital"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "hospital"
                        ]
                    ],
                    "hospital",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "college"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "university"
                        ]
                    ],
                    "college",
                    [
                        "in",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "literal",
                            [
                                "sports_centre",
                                "stadium"
                            ]
                        ]
                    ],
                    "pitch",
                    [
                        "==",
                        [
                            "get",
                            "subclass"
                        ],
                        "townhall"
                    ],
                    "town-hall",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "museum"
                    ],
                    "museum",
                    [
                        "all",
                        [
                            "!",
                            [
                                "has",
                                "level"
                            ]
                        ],
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "monument"
                        ]
                    ],
                    "monument",
                    [
                        "all",
                        [
                            "!",
                            [
                                "has",
                                "level"
                            ]
                        ],
                        [
                            "==",
                            [
                                "get",
                                "class"
                            ],
                            "attraction"
                        ],
                        [
                            "==",
                            [
                                "get",
                                "subclass"
                            ],
                            "attraction"
                        ]
                    ],
                    "attraction",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "police"
                    ],
                    "police",
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "parking"
                    ],
                    "parking",
                    "circle"
                ],
                "icon-padding": 8.0,
                "icon-size": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    14,
                    0.7,
                    16,
                    1
                ],
                "symbol-sort-key": [
                    "get",
                    "rank"
                ],
                "text-field": [
                    "get",
                    "name"
                ],
                "text-font": [
                    "Noto Sans Regular"
                ],
                "text-size": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    10,
                    10,
                    14,
                    11
                ],
                "text-variable-anchor": [
                    "left",
                    "right"
                ],
                "text-justify": "auto",
                "text-offset": [
                    0,
                    1
                ],
                "text-optional": true,
                "text-padding": 15,
                "text-max-width": 6.25
            }
        },
        {
            "id": "poi_transit_station_stop_z12",
            "type": "symbol",
            "metadata": {
                "featureType": "transit.station.rail"
            },
            "source": "openmaptiles",
            "source-layer": "poi",
            "filter": [
                "all",
                [
                    "in",
                    "class",
                    "railway"
                ],
                [
                    "in",
                    "subclass",
                    "tram_stop",
                    "subway"
                ]
            ],
            "layout": {
                "icon-image": "railway_11",
                "visibility": "visible",
                "icon-size": {
                    "stops": [
                        [
                            12,
                            0.7
                        ],
                        [
                            16,
                            1
                        ]
                    ]
                },
                "symbol-sort-key": [
                    "get",
                    "rank"
                ]
            },
            "minzoom": 13,
            "maxzoom": 16
        },
        {
            "id": "poi_transit_stop_rail_z16",
            "type": "symbol",
            "metadata": {
                "featureType": "transit.station.rail"
            },
            "source": "openmaptiles",
            "source-layer": "poi",
            "filter": [
                "all",
                [
                    "in",
                    "class",
                    "railway"
                ],
                [
                    "in",
                    "subclass",
                    "tram_stop",
                    "subway"
                ]
            ],
            "layout": {
                "icon-image": "railway_11",
                "text-variable-anchor": [
                    "left",
                    "right"
                ],
                "text-field": [
                    "let",
                    "localized_name",
                    [
                        "coalesce",
                        [
                            "get",
                            "name:en"
                        ],
                        [
                            "get",
                            "name_int"
                        ]
                    ],
                    [
                        "case",
                        [
                            "all",
                            [
                                "has",
                                "name:nonlatin"
                            ],
                            [
                                "!=",
                                [
                                    "var",
                                    "localized_name"
                                ],
                                [
                                    "get",
                                    "name:nonlatin"
                                ]
                            ]
                        ],
                        [
                            "concat",
                            [
                                "var",
                                "localized_name"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "has",
                            "name:nonlatin"
                        ],
                        [
                            "concat",
                            [
                                "get",
                                "name:latin"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "var",
                            "localized_name"
                        ]
                    ]
                ],
                "text-font": [
                    "Noto Sans Regular"
                ],
                "text-max-width": 9,
                "text-offset": [
                    0.9,
                    0
                ],
                "text-padding": 2,
                "text-size": 12,
                "text-optional": true,
                "symbol-sort-key": [
                    "get",
                    "rank"
                ],
                "visibility": "visible",
                "icon-size": 1
            },
            "paint": {
                "text-color": "rgba(102, 102, 102, 1)",
                "text-halo-blur": 0.5,
                "text-halo-color": "#ffffff",
                "text-halo-width": 1
            },
            "minzoom": 16
        },
        {
            "id": "poi_transit_station_rail",
            "type": "symbol",
            "metadata": {
                "featureType": "transit.station.rail"
            },
            "source": "openmaptiles",
            "source-layer": "poi",
            "filter": [
                "all",
                [
                    "in",
                    "class",
                    "railway"
                ],
                [
                    "in",
                    "subclass",
                    "station"
                ]
            ],
            "layout": {
                "icon-image": "railway_11",
                "text-anchor": "left",
                "text-field": [
                    "let",
                    "localized_name",
                    [
                        "coalesce",
                        [
                            "get",
                            "name:en"
                        ],
                        [
                            "get",
                            "name_int"
                        ]
                    ],
                    [
                        "case",
                        [
                            "all",
                            [
                                "has",
                                "name:nonlatin"
                            ],
                            [
                                "!=",
                                [
                                    "var",
                                    "localized_name"
                                ],
                                [
                                    "get",
                                    "name:nonlatin"
                                ]
                            ]
                        ],
                        [
                            "concat",
                            [
                                "var",
                                "localized_name"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "has",
                            "name:nonlatin"
                        ],
                        [
                            "concat",
                            [
                                "get",
                                "name:latin"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "var",
                            "localized_name"
                        ]
                    ]
                ],
                "text-font": [
                    "Noto Sans Regular"
                ],
                "text-max-width": 9,
                "text-offset": [
                    0.9,
                    0
                ],
                "text-padding": 2,
                "text-size": 12,
                "text-optional": true,
                "visibility": "visible",
                "icon-size": {
                    "stops": [
                        [
                            12,
                            0.7
                        ],
                        [
                            16,
                            1
                        ]
                    ]
                }
            },
            "paint": {
                "text-color": "rgba(102, 102, 102, 1)",
                "text-halo-blur": 0.5,
                "text-halo-color": "#ffffff",
                "text-halo-width": 1
            },
            "minzoom": 12
        },
        {
            "id": "airport-label-major",
            "type": "symbol",
            "source": "openmaptiles",
            "source-layer": "aerodrome_label",
            "metadata": {
                "featureType": "transit.station.airport"
            },
            "minzoom": 10,
            "filter": [
                "all",
                [
                    "has",
                    "iata"
                ],
                [
                    "in",
                    "class",
                    "public",
                    "international",
                    "other"
                ]
            ],
            "layout": {
                "text-padding": 2,
                "text-font": [
                    "Noto Sans Regular"
                ],
                "text-anchor": "bottom",
                "icon-image": "airport_11",
                "text-field": [
                    "let",
                    "localized_name",
                    [
                        "coalesce",
                        [
                            "get",
                            "name:en"
                        ],
                        [
                            "get",
                            "name_int"
                        ]
                    ],
                    [
                        "case",
                        [
                            "all",
                            [
                                "has",
                                "name:nonlatin"
                            ],
                            [
                                "!=",
                                [
                                    "var",
                                    "localized_name"
                                ],
                                [
                                    "get",
                                    "name:nonlatin"
                                ]
                            ]
                        ],
                        [
                            "concat",
                            [
                                "var",
                                "localized_name"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "has",
                            "name:nonlatin"
                        ],
                        [
                            "concat",
                            [
                                "get",
                                "name:latin"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "var",
                            "localized_name"
                        ]
                    ]
                ],
                "text-offset": [
                    0,
                    -0.9
                ],
                "text-size": 12,
                "text-max-width": 9,
                "visibility": "visible",
                "icon-size": 1,
                "text-optional": true
            },
            "paint": {
                "text-halo-blur": 0.1,
                "text-color": "rgb(29, 138, 196)",
                "text-halo-width": 1,
                "text-halo-color": "#ffffff"
            }
        },
        {
            "id": "store_overlay_layers",
            "type": "background",
            "paint": {
                "background-opacity": 0
            }
        },
        {
            "id": "data_layers_points",
            "type": "background",
            "paint": {
                "background-opacity": 0
            }
        },
        {
            "id": "place_other",
            "type": "symbol",
            "metadata": {
                "featureType": "administrative.neighborhood"
            },
            "source": "openmaptiles",
            "source-layer": "place",
            "filter": [
                "all",
                [
                    "in",
                    "class",
                    "hamlet",
                    "island",
                    "islet",
                    "neighbourhood",
                    "suburb"
                ]
            ],
            "layout": {
                "text-field": [
                    "let",
                    "localized_name",
                    [
                        "coalesce",
                        [
                            "get",
                            "name:en"
                        ],
                        [
                            "get",
                            "name_int"
                        ]
                    ],
                    [
                        "case",
                        [
                            "all",
                            [
                                "has",
                                "name:nonlatin"
                            ],
                            [
                                "!=",
                                [
                                    "var",
                                    "localized_name"
                                ],
                                [
                                    "get",
                                    "name:nonlatin"
                                ]
                            ]
                        ],
                        [
                            "concat",
                            [
                                "var",
                                "localized_name"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "has",
                            "name:nonlatin"
                        ],
                        [
                            "concat",
                            [
                                "get",
                                "name:latin"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "var",
                            "localized_name"
                        ]
                    ]
                ],
                "text-font": [
                    "Noto Sans Bold"
                ],
                "text-offset": [
                    0,
                    -0.2
                ],
                "symbol-sort-key": [
                    "get",
                    "rank"
                ],
                "text-letter-spacing": 0.1,
                "text-max-width": 9,
                "text-size": {
                    "base": 1.2,
                    "stops": [
                        [
                            12,
                            10
                        ],
                        [
                            15,
                            14
                        ]
                    ]
                },
                "text-transform": "uppercase",
                "visibility": "visible"
            },
            "paint": {
                "text-color": "rgba(100, 100, 100, 1)",
                "text-halo-color": "rgba(255,255,255,0.8)",
                "text-halo-width": 1.2
            }
        },
        {
            "id": "place_village",
            "type": "symbol",
            "metadata": {
                "featureType": "administrative.locality",
                "types": [
                    "geometry",
                    "label"
                ]
            },
            "source": "openmaptiles",
            "source-layer": "place",
            "filter": [
                "all",
                [
                    "==",
                    "class",
                    "village"
                ]
            ],
            "layout": {
                "text-offset": [
                    0,
                    -0.2
                ],
                "text-field": [
                    "let",
                    "localized_name",
                    [
                        "coalesce",
                        [
                            "get",
                            "name:en"
                        ],
                        [
                            "get",
                            "name_int"
                        ]
                    ],
                    [
                        "case",
                        [
                            "all",
                            [
                                "has",
                                "name:nonlatin"
                            ],
                            [
                                "!=",
                                [
                                    "var",
                                    "localized_name"
                                ],
                                [
                                    "get",
                                    "name:nonlatin"
                                ]
                            ]
                        ],
                        [
                            "concat",
                            [
                                "var",
                                "localized_name"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "has",
                            "name:nonlatin"
                        ],
                        [
                            "concat",
                            [
                                "get",
                                "name:latin"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "var",
                            "localized_name"
                        ]
                    ]
                ],
                "text-font": [
                    "Noto Sans Regular"
                ],
                "text-max-width": 8,
                "text-size": {
                    "base": 1.2,
                    "stops": [
                        [
                            10,
                            12
                        ],
                        [
                            15,
                            22
                        ]
                    ]
                }
            },
            "paint": {
                "text-color": "#333",
                "text-halo-color": "rgba(255,255,255,0.8)",
                "text-halo-width": 1.2
            }
        },
        {
            "id": "place_town",
            "type": "symbol",
            "metadata": {
                "featureType": "administrative.locality"
            },
            "source": "openmaptiles",
            "source-layer": "place",
            "filter": [
                "all",
                [
                    "==",
                    "class",
                    "town"
                ]
            ],
            "layout": {
                "icon-image": {
                    "base": 1,
                    "stops": [
                        [
                            0,
                            "circle-stroked_16"
                        ],
                        [
                            10,
                            ""
                        ]
                    ]
                },
                "text-anchor": "bottom",
                "text-field": [
                    "let",
                    "localized_name",
                    [
                        "coalesce",
                        [
                            "get",
                            "name:en"
                        ],
                        [
                            "get",
                            "name_int"
                        ]
                    ],
                    [
                        "case",
                        [
                            "all",
                            [
                                "has",
                                "name:nonlatin"
                            ],
                            [
                                "!=",
                                [
                                    "var",
                                    "localized_name"
                                ],
                                [
                                    "get",
                                    "name:nonlatin"
                                ]
                            ]
                        ],
                        [
                            "concat",
                            [
                                "var",
                                "localized_name"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "has",
                            "name:nonlatin"
                        ],
                        [
                            "concat",
                            [
                                "get",
                                "name:latin"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "var",
                            "localized_name"
                        ]
                    ]
                ],
                "text-font": [
                    "Noto Sans Regular"
                ],
                "text-max-width": 8,
                "text-offset": [
                    0,
                    -0.2
                ],
                "text-size": {
                    "base": 1.2,
                    "stops": [
                        [
                            7,
                            12
                        ],
                        [
                            11,
                            16
                        ]
                    ]
                }
            },
            "paint": {
                "text-color": "#333",
                "text-halo-color": "rgba(255,255,255,0.8)",
                "text-halo-width": 1.2
            }
        },
        {
            "id": "place_city",
            "type": "symbol",
            "metadata": {
                "featureType": "administrative.locality"
            },
            "source": "openmaptiles",
            "source-layer": "place",
            "minzoom": 4,
            "filter": [
                "all",
                [
                    "==",
                    "class",
                    "city"
                ]
            ],
            "layout": {
                "icon-image": {
                    "base": 1,
                    "stops": [
                        [
                            0,
                            "circle-stroked_16"
                        ],
                        [
                            10,
                            ""
                        ]
                    ]
                },
                "text-anchor": "bottom",
                "text-field": [
                    "let",
                    "localized_name",
                    [
                        "coalesce",
                        [
                            "get",
                            "name:en"
                        ],
                        [
                            "get",
                            "name_int"
                        ]
                    ],
                    [
                        "case",
                        [
                            "all",
                            [
                                "has",
                                "name:nonlatin"
                            ],
                            [
                                "!=",
                                [
                                    "var",
                                    "localized_name"
                                ],
                                [
                                    "get",
                                    "name:nonlatin"
                                ]
                            ]
                        ],
                        [
                            "concat",
                            [
                                "var",
                                "localized_name"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "has",
                            "name:nonlatin"
                        ],
                        [
                            "concat",
                            [
                                "get",
                                "name:latin"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "var",
                            "localized_name"
                        ]
                    ]
                ],
                "text-font": [
                    "Noto Sans Regular"
                ],
                "text-max-width": 8,
                "text-offset": [
                    0,
                    -0.2
                ],
                "text-size": {
                    "base": 1.2,
                    "stops": [
                        [
                            7,
                            14
                        ],
                        [
                            11,
                            24
                        ]
                    ]
                },
                "icon-allow-overlap": true,
                "icon-optional": false
            },
            "paint": {
                "text-color": "black",
                "text-halo-color": "rgba(255,255,255,1)",
                "text-halo-width": 1.2
            }
        },
        {
            "id": "state",
            "type": "symbol",
            "metadata": {
                "featureType": "administrative.province"
            },
            "source": "openmaptiles",
            "source-layer": "place",
            "maxzoom": 6,
            "filter": [
                "all",
                [
                    "==",
                    "class",
                    "state"
                ],
                [
                    "<=",
                    "rank",
                    2
                ]
            ],
            "layout": {
                "text-field": [
                    "let",
                    "localized_name",
                    [
                        "coalesce",
                        [
                            "get",
                            "name:en"
                        ],
                        [
                            "get",
                            "name_int"
                        ]
                    ],
                    [
                        "case",
                        [
                            "all",
                            [
                                "has",
                                "name:nonlatin"
                            ],
                            [
                                "!=",
                                [
                                    "var",
                                    "localized_name"
                                ],
                                [
                                    "get",
                                    "name:nonlatin"
                                ]
                            ]
                        ],
                        [
                            "concat",
                            [
                                "var",
                                "localized_name"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "has",
                            "name:nonlatin"
                        ],
                        [
                            "concat",
                            [
                                "get",
                                "name:latin"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "var",
                            "localized_name"
                        ]
                    ]
                ],
                "text-font": [
                    "Noto Sans Regular"
                ],
                "text-size": {
                    "stops": [
                        [
                            4,
                            10
                        ],
                        [
                            6,
                            13
                        ]
                    ]
                },
                "text-transform": "uppercase",
                "text-padding": 2,
                "text-letter-spacing": 0.1
            },
            "paint": {
                "text-color": "rgba(74, 72, 66, 1)",
                "text-halo-color": "rgba(255,255,255, 1)",
                "text-halo-width": 1.2
            }
        },
        {
            "id": "country_other",
            "type": "symbol",
            "metadata": {
                "featureType": "administrative.country"
            },
            "source": "openmaptiles",
            "source-layer": "place",
            "filter": [
                "all",
                [
                    "==",
                    "class",
                    "country"
                ],
                [
                    "!has",
                    "iso_a2"
                ]
            ],
            "layout": {
                "text-field": [
                    "let",
                    "localized_name",
                    [
                        "coalesce",
                        [
                            "get",
                            "name:en"
                        ],
                        [
                            "get",
                            "name_int"
                        ]
                    ],
                    [
                        "case",
                        [
                            "all",
                            [
                                "has",
                                "name:nonlatin"
                            ],
                            [
                                "!=",
                                [
                                    "var",
                                    "localized_name"
                                ],
                                [
                                    "get",
                                    "name:nonlatin"
                                ]
                            ]
                        ],
                        [
                            "concat",
                            [
                                "var",
                                "localized_name"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "has",
                            "name:nonlatin"
                        ],
                        [
                            "concat",
                            [
                                "get",
                                "name:latin"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "var",
                            "localized_name"
                        ]
                    ]
                ],
                "text-font": [
                    "Noto Sans Regular"
                ],
                "text-max-width": 6.25,
                "text-size": {
                    "stops": [
                        [
                            1,
                            12
                        ],
                        [
                            4,
                            16
                        ]
                    ]
                },
                "text-transform": "none"
            },
            "paint": {
                "text-color": "black",
                "text-halo-blur": 0.2,
                "text-halo-color": "rgba(255,255,255,1)",
                "text-halo-width": 1.2
            }
        },
        {
            "id": "country_3",
            "type": "symbol",
            "metadata": {
                "featureType": "administrative.country"
            },
            "source": "openmaptiles",
            "source-layer": "place",
            "filter": [
                "all",
                [
                    ">=",
                    "rank",
                    3
                ],
                [
                    "==",
                    "class",
                    "country"
                ],
                [
                    "has",
                    "iso_a2"
                ],
                [
                    "!=",
                    "iso_a2",
                    "VA"
                ]
            ],
            "layout": {
                "text-field": [
                    "let",
                    "localized_name",
                    [
                        "coalesce",
                        [
                            "get",
                            "name:en"
                        ],
                        [
                            "get",
                            "name_int"
                        ]
                    ],
                    [
                        "case",
                        [
                            "all",
                            [
                                "has",
                                "name:nonlatin"
                            ],
                            [
                                "!=",
                                [
                                    "var",
                                    "localized_name"
                                ],
                                [
                                    "get",
                                    "name:nonlatin"
                                ]
                            ]
                        ],
                        [
                            "concat",
                            [
                                "var",
                                "localized_name"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "has",
                            "name:nonlatin"
                        ],
                        [
                            "concat",
                            [
                                "get",
                                "name:latin"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "var",
                            "localized_name"
                        ]
                    ]
                ],
                "text-font": [
                    "Noto Sans Regular"
                ],
                "text-max-width": 6.25,
                "text-size": {
                    "stops": [
                        [
                            1,
                            12
                        ],
                        [
                            4,
                            16
                        ]
                    ]
                },
                "text-transform": "none"
            },
            "paint": {
                "text-color": "black",
                "text-halo-blur": 0.2,
                "text-halo-color": "rgba(255,255,255,1)",
                "text-halo-width": 1.2
            }
        },
        {
            "id": "country_2",
            "type": "symbol",
            "metadata": {
                "featureType": "administrative.country"
            },
            "source": "openmaptiles",
            "source-layer": "place",
            "filter": [
                "all",
                [
                    "==",
                    "rank",
                    2
                ],
                [
                    "==",
                    "class",
                    "country"
                ],
                [
                    "has",
                    "iso_a2"
                ]
            ],
            "layout": {
                "text-field": [
                    "let",
                    "localized_name",
                    [
                        "coalesce",
                        [
                            "get",
                            "name:en"
                        ],
                        [
                            "get",
                            "name_int"
                        ]
                    ],
                    [
                        "case",
                        [
                            "all",
                            [
                                "has",
                                "name:nonlatin"
                            ],
                            [
                                "!=",
                                [
                                    "var",
                                    "localized_name"
                                ],
                                [
                                    "get",
                                    "name:nonlatin"
                                ]
                            ]
                        ],
                        [
                            "concat",
                            [
                                "var",
                                "localized_name"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "has",
                            "name:nonlatin"
                        ],
                        [
                            "concat",
                            [
                                "get",
                                "name:latin"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "var",
                            "localized_name"
                        ]
                    ]
                ],
                "text-font": [
                    "Noto Sans Regular"
                ],
                "text-max-width": 6.25,
                "text-size": {
                    "stops": [
                        [
                            1,
                            12
                        ],
                        [
                            4,
                            16
                        ]
                    ]
                },
                "text-transform": "none"
            },
            "paint": {
                "text-color": "black",
                "text-halo-blur": 0.2,
                "text-halo-color": "rgba(255,255,255,1)",
                "text-halo-width": 1.2
            }
        },
        {
            "id": "country_1",
            "type": "symbol",
            "metadata": {
                "featureType": "administrative.country"
            },
            "source": "openmaptiles",
            "source-layer": "place",
            "filter": [
                "all",
                [
                    "==",
                    "rank",
                    1
                ],
                [
                    "==",
                    "class",
                    "country"
                ],
                [
                    "has",
                    "iso_a2"
                ]
            ],
            "layout": {
                "text-field": [
                    "let",
                    "localized_name",
                    [
                        "coalesce",
                        [
                            "get",
                            "name:en"
                        ],
                        [
                            "get",
                            "name_int"
                        ]
                    ],
                    [
                        "case",
                        [
                            "all",
                            [
                                "has",
                                "name:nonlatin"
                            ],
                            [
                                "!=",
                                [
                                    "var",
                                    "localized_name"
                                ],
                                [
                                    "get",
                                    "name:nonlatin"
                                ]
                            ]
                        ],
                        [
                            "concat",
                            [
                                "var",
                                "localized_name"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "has",
                            "name:nonlatin"
                        ],
                        [
                            "concat",
                            [
                                "get",
                                "name:latin"
                            ],
                            " \n",
                            [
                                "get",
                                "name:nonlatin"
                            ]
                        ],
                        [
                            "var",
                            "localized_name"
                        ]
                    ]
                ],
                "text-font": [
                    "Noto Sans Regular"
                ],
                "text-max-width": 6.25,
                "text-size": {
                    "stops": [
                        [
                            1,
                            12
                        ],
                        [
                            4,
                            16
                        ]
                    ]
                },
                "text-transform": "none"
            },
            "paint": {
                "text-color": "black",
                "text-halo-blur": 0.2,
                "text-halo-color": "rgba(255,255,255,1)",
                "text-halo-width": 1.2
            }
        }
    ],
    "id": "streets"
}
