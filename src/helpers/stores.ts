import {AssetAddress, AssetContact, AssetResponse} from "../types/stores/asset_response";

export function getReadableAddress(address: AssetAddress | undefined): string {
    if (!address) {
        return ""
    }
    const readableAddress: string[] = [];
    if (typeof address.lines !== "undefined" && address.lines.length >= 0) {
        readableAddress.push(...address.lines);
    }
    if (address.zipcode) {
        readableAddress.push(address.zipcode)
    }
    if (address.city) {
        readableAddress.push(address.city)
    }
    return readableAddress.join(', ');
}

export function getReadableDistance(distance: number | undefined, unitSystem = 'metric'): string {
    if (!distance) {
        return ""
    }
    let readableDistance = ""
    const meterToYard = 1.09361;
    const unitSystemValues = {
        'metric': {unit: 'km', smallUnit: 'm', factor: 1000},
        'imperial': {unit: 'mi', smallUnit: 'yd', factor: 1760}
    };
    const system = unitSystemValues['metric'];
    if (unitSystem === 'imperial') {
        distance *= meterToYard;
    }
    if (distance < system.factor) {
        readableDistance = Math.round(distance) + '\u00A0' + system.smallUnit;
    } else {
        readableDistance = parseFloat((distance / system.factor).toFixed(1)) + '\u00A0' + system.unit;
    }
    return readableDistance;
}

export function getPhoneLink(contact: AssetContact | undefined): string {
    if (!contact || !contact.phone) {
        return ""
    }
    const contactLink: HTMLAnchorElement = document.createElement("a");
    contactLink.className = 'contactPhone';
    contactLink.href = `tel:${contact.phone}`;
    contactLink.text = contact.phone;
    return contactLink.outerHTML;
}

export function getOpeningLabel(store: AssetResponse, locale = "en"): string {
    let openLabel = "";

    interface ILocale {
        [key: string]: Record<string, string>
    }

    const i18n: ILocale = {
        "en": {
            "at": "at",
            "opensToday": "Opens today",
            "opens": "Opens",
            "openUntil": "Open until"
        },
        "fr": {
            "at": "à",
            "opensToday": "Ouvre aujourd'hui",
            "opens": "Ouvre",
            "openUntil": "Ouvert jusqu'à"
        }
    };

    function _isToday(date: Date): boolean {
        const today = new Date();
        return today.toDateString() === date.toDateString();
    }

    function _convertTime(UNIX_timestamp: number) {
        const a = new Date(UNIX_timestamp * 1000);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[a.getMonth()] + ' ' + a.getDate() + ', ' + a.getFullYear();
    }

    try {
        if (store.open?.open_now) {
            openLabel = `${i18n[locale].openUntil} ${store.open.current_slice.end}`;
        } else if (store.open?.next_opening) {
            if (_isToday(new Date(store.open?.next_opening.day))) {
                openLabel += openLabel += `${i18n[locale].opensToday} ${i18n[locale].at} ${store.open.next_opening.start}`
            } else {
                openLabel += `${i18n[locale].opens} ${_convertTime(Date.parse(store.open.next_opening.day) / 1000)} ${i18n[locale].at} ${store.open.next_opening.start}`
            }
        }
        return openLabel
    } catch (error) {
        return ""
    }
}


