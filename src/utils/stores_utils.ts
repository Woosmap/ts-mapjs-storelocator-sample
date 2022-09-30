import {AssetAddress, AssetContact} from "../types/stores/asset_response";

export function getReadableAddress(address: AssetAddress): string {
    let readableAddress: string[] = [];
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

export function getReadableDistance(distance: number, unitSystem = 'metric'): string {
    let readableDistance: string = ""
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

export function getPhoneLink(contact: AssetContact): string {
    if (!contact.phone) {
        return ""
    }
    const contactLink: HTMLAnchorElement = document.createElement("a");
    contactLink.className = 'contactPhone';
    contactLink.href = `tel:${contact.phone}`;
    contactLink.text = contact.phone;
    return contactLink.outerHTML;
}

