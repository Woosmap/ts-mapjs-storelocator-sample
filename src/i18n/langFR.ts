/**
 * Language: Français.
 */
export default {
    time: {
        openingHoursTitle: "Horaires d'ouverture",
        at: "à",
        opensToday: "Ouvre aujourd'hui",
        opens: "Ouvre",
        open24_7: "Ouvert 24/7",
        closed: "Fermé",
        openUntil: "Ouvert jusqu'à",
        daily: "Ouvert tous les jours",
        month: [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ],
        monthAbbr: [
            'Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin',
            'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'
        ],
        dayOfWeek: [
            'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'
        ],
        dayOfWeekAbbr: [
            'Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'
        ]
    },
    search: {
        placeholder: "Rechercher une adresse...",
        submitLabel: "Rechercher",
        clearLabel: "Effacer la recherche",
        yourLocation: "Votre position",
    },
    filtering: {
        servicesTitle: "Services",
        services: {
            WF: 'Hotspot Wi-Fi',
            CD: 'Paiement Mobile',
            DT: 'Drive',
            DR: 'Carte de Fidélité',
            hrs24: 'Ouvert 24h/24',
            WA: 'Plats chauds',
            LB: 'LaBoulange',
            XO: 'Mobile Order and Pay',
            VS: 'Verismo',
            NB: 'Nitro Cold Brew',
            CL: 'Starbucks Reserve-Clover Brewed',
        }
    },
    stores: {
        cta: {
            call: "Appeler",
            directions: "Itinéraire",
            website: "Site Web"
        },
        messages: {
            initialHeader: "Chercher une localité pour afficher les magasins à proximité",
            emptyHeader: "Aucun magasin retourné",
            initialBody: "ou sélectionner un magasin via la carte",
            emptyBody: "Rechercher ailleurs or désactiver vos filtres"
        }
    },
    directions: {
        avoidOptions: {
            highways: 'Autoroutes',
            tolls: 'Péages',
            ferries: 'Transbordeurs'
        },
        unitOptions: {
            METRIC: 'km',
            IMPERIAL: 'milles'
        },
        options: "Options d'itinéraire",
        avoid: "Éviter",
        units: "Unités de distance",
        messages: {
            initialBody: "Renseigner une origine et une destination pour voir les itinéraires disponible et le temps de trajet.",
            error: "Désolé, impossible de calculer l'itinéraire",
            from: "de",
            to: "à",
            forTravelMode: "pour le mode de transport",
            via: "via",
            details: "Details",
            withoutTraffic: "sans circulation",
            openGoogleMaps: "ouvrir dans Google Maps"
        }
    },
    errors: {
        loadingLibrary: "Impossible de charger le script {library}",
        geolocationFailed: "Impossible de géolocaliser l'utilisateur",
        apiErrors: {
            "401": "Unauthorized",
            "403": "Forbidden",
            "429": "Too many requests",
            "500": "Internal server error",
            other: "An unexpected server error occurred"
        }
    }
};
