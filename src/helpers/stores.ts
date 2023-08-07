import {
    AssetAddress,
    AssetContact,
    AssetOpeningHoursPeriod,
    AssetResponse,
    AssetWeeklyOpeningResponse,
} from "../types/stores";
import {availableServices} from "../configuration/search.config";
import {getLabel, getLocale, getLocaleLang} from "./locale";

export function getReadableAddress(address: AssetAddress | undefined): string {
    if (!address) {
        return "";
    }
    const readableAddress: string[] = [];
    if (typeof address.lines !== "undefined" && address.lines.length >= 0) {
        readableAddress.push(...address.lines);
    }
    if (address.zipcode) {
        readableAddress.push(address.zipcode);
    }
    if (address.city) {
        readableAddress.push(address.city);
    }
    return readableAddress.join(", ");
}

export function getReadableDistance(
    distance: number | undefined,
    unitSystem = "metric"
): string {
    if (!distance) {
        return "";
    }
    let readableDistance: string;
    const meterToYard = 1.09361;
    const unitSystemValues = {
        metric: {unit: "km", smallUnit: "m", factor: 1000},
        imperial: {unit: "mi", smallUnit: "yd", factor: 1760},
    };
    const system = unitSystemValues["metric"];
    if (unitSystem === "imperial") {
        distance *= meterToYard;
    }
    if (distance < system.factor) {
        readableDistance = Math.round(distance) + "\u00A0" + system.smallUnit;
    } else {
        readableDistance =
            parseFloat((distance / system.factor).toFixed(1)) +
            "\u00A0" +
            system.unit;
    }
    return readableDistance;
}

export function getPhoneLink(contact: AssetContact | undefined): string {
    if (!contact || !contact.phone) {
        return "";
    }
    const $contactLink: HTMLAnchorElement = document.createElement("a");
    $contactLink.className = "contactPhone";
    $contactLink.href = `tel:${contact.phone}`;
    $contactLink.text = contact.phone;
    return $contactLink.outerHTML;
}

export function getWebsiteLink(contact: AssetContact | undefined): string {
    if (!contact || !contact.website) {
        return "";
    }
    const $websiteLink: HTMLAnchorElement = document.createElement("a");
    $websiteLink.className = "contactWebsite";
    $websiteLink.href = `${contact.website}`;
    $websiteLink.target = `_blank`;
    $websiteLink.text = getLocale().stores.cta.website;
    return $websiteLink.outerHTML;
}

export function getServicesList(servicesList: string[]): string {
    const storeServices = servicesList
        .map(
            (service) =>
                availableServices.filter(({serviceKey}) => serviceKey === service)[0]
        )
        .filter((x) => x);
    const $storeServices: HTMLUListElement = document.createElement("ul");
    $storeServices.className = "detailsStore__services";
    const servicesHTML: HTMLLIElement[] = storeServices.map((service) => {
        const $service: HTMLLIElement = document.createElement("li");
        $service.dataset.servicekey = service.serviceKey;
        $service.dataset.servicename = getLabel(getLocale().filtering.services, service.serviceKey);
        $service.innerHTML = `
        <div class='iconService iconService__${service.serviceKey}'></div>
        <div class='serviceName'>${getLabel(getLocale().filtering.services, service.serviceKey)}</div>`;
        return $service;
    });
    $storeServices.append(...servicesHTML);
    return $storeServices.outerHTML;
}

export function getOpeningLabel(store: AssetResponse): string {
    let openLabel = "";

    function _convertTime(UNIX_timestamp: number) {
        const a = new Date(UNIX_timestamp * 1000);
        return a.toLocaleString(getLocaleLang(), {weekday: "long", day: "numeric", month: "short"});
    }

    try {
        if (store.open?.open_now) {
            openLabel = `${getLocale().time.openUntil} ${store.open.current_slice.end}`;
            if (store.weekly_opening) {
                if (store.open.current_slice.end) {
                    openLabel = `${getLocale().time.openUntil} ${store.open.current_slice.end}`
                } else if (store.open.current_slice["all-day"]) {
                    openLabel = getLocale().time.open24_7
                }
            } else {
                if (store.open.current_slice.end) {
                    openLabel = `${getLocale().time.openUntil} ${store.open.current_slice.end}`
                } else if (store.open.current_slice["all-day"]) {
                    openLabel = getLocale().time.open24_7
                }
            }
        } else if (store.open?.next_opening) {
            if (isToday(new Date(store.open?.next_opening.day))) {
                openLabel +=
                    openLabel += `${getLocale().time.opensToday} ${getLocale().time.at} ${store.open.next_opening.start}`;
            } else {
                openLabel += `${getLocale().time.opens} ${_convertTime(
                    Date.parse(store.open.next_opening.day) / 1000
                )} ${getLocale().time.at} ${store.open.next_opening.start}`;
            }
        } else {
            openLabel = `${getLocale().time.closed}`;
        }
        return openLabel;
    } catch (error) {
        return "";
    }
}


export function getOpeningWeekList(weeklyOpening: AssetWeeklyOpeningResponse): string {
    interface IReadableOpeningHours {
        [key: string]: { dayName: string; hoursDay: string; today?: boolean };
    }

    const readableOpeningHours: IReadableOpeningHours = {
        "1": {dayName: getLocale().time.dayOfWeek[0], hoursDay: ""},
        "2": {dayName: getLocale().time.dayOfWeek[1], hoursDay: ""},
        "3": {dayName: getLocale().time.dayOfWeek[2], hoursDay: ""},
        "4": {dayName: getLocale().time.dayOfWeek[3], hoursDay: ""},
        "5": {dayName: getLocale().time.dayOfWeek[4], hoursDay: ""},
        "6": {dayName: getLocale().time.dayOfWeek[5], hoursDay: ""},
        "7": {dayName: getLocale().time.dayOfWeek[0], hoursDay: ""},
    };

    const $storeOpeningWeek: HTMLUListElement = document.createElement("ul");
    $storeOpeningWeek.className = "storeDetails__openingWeek";
    const today = new Date().toLocaleString(getLocaleLang(), {weekday: "long"});
    Object.entries(weeklyOpening).forEach(([day, hoursPeriod]) => {
        if (!hoursPeriod || hoursPeriod.length === 0) {
            readableOpeningHours[day].hoursDay = getLocale().time.closed;
        } else if (readableOpeningHours[day]) {
            if (readableOpeningHours[day].dayName === today) {
                readableOpeningHours[day].today = true;
            }
            if (hoursPeriod.hours?.length === 0) {
                readableOpeningHours[day].hoursDay = getLocale().time.closed;
            } else {
                readableOpeningHours[day].hoursDay = concatenateStoreHours(
                    hoursPeriod.hours
                );
            }
        }
    });
    const hoursHTML: HTMLLIElement[] = Object.entries(readableOpeningHours).map(
        ([dayIndex, dayValues]) => {
            const $listDay: HTMLLIElement = document.createElement("li");
            $listDay.className = dayValues.today ? "currentDay" : "";
            $listDay.innerHTML = `<span class='day ${dayIndex}'>${dayValues.dayName}</span><span class='hours'>${dayValues.hoursDay}</span>`;
            return $listDay;
        }
    );
    $storeOpeningWeek.append(...hoursHTML);
    return $storeOpeningWeek.outerHTML;
}

function isToday(date: Date): boolean {
    const today = new Date();
    return today.toDateString() === date.toDateString();
}

function concatenateStoreHours(openHours: AssetOpeningHoursPeriod[]) {
    const hoursText: string[] = [];
    let end = "";
    openHours.forEach((period) => {
        if (
            "all-day" in period ||
            (period.end === "00:00" && period.start === "00:00")
        ) {
            return "24h/24";
        }
        end = period.end;
        hoursText.push(`${period.start}–${end}`);
    });
    return hoursText.join(", ");
}
