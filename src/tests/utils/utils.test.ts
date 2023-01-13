import {
    objectToQueryString
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
