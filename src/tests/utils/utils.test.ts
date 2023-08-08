import {
    merge,
    objectToQueryString, replace
} from "../../utils/utils";

describe("objectToQueryString()", () => {
    test("converts an object to a query string", () => {
        const params = {
            "key": "test-key",
            language: "EN",
        };

        expect(objectToQueryString(params)).toBe("key=test-key&language=EN");
    });
});


describe("merge()", () => {
    function testMerge(targetOption: Record<string, any>,
                       sourceOption: Record<string, any>,
                       result: Record<string, any>): void {
        const target = {...targetOption};
        const source = {...sourceOption};
        const mergeResult = merge(target, source);
        expect(mergeResult).toEqual(result);
    }

    test("merge the source object into the target recursively.", () => {
        testMerge(
            {}, {map: {key: "woos-xxx"}},
            {map: {key: "woos-xxx"}},
        );
        testMerge(
            {map: {key: "woos-xxx"}}, {},
            {map: {key: "woos-xxx"}},
        );
        testMerge({map: {key: "woos-yyy"}}, {map: {key: "woos-xxx"}},
            {map: {key: "woos-yyy"}},
        )
        testMerge({'map': 'boum'}, {map: {key: "woos-xxx"}},
            {map: "boum"},
        )
        testMerge({stores: ['store1', 'store2']}, {stores: ['store1'], search: 'Berlin'},
            {stores: ['store1', 'store2'], search: 'Berlin'},
        )
    });
});

describe("replace()", () => {
    test("replace all keys enclosed by curly brace", () => {
        expect(replace("{x} stores returned", {
            'x': '7'
        })).toEqual("7 stores returned")
        expect(replace("directions from {origin} to {destination}", {
            'origin': 'Paris',
            'destination': 'Berlin'
        })).toEqual("directions from Paris to Berlin")
    });
});
