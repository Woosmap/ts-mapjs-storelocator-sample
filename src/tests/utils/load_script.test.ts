import {MockWrapper, mock} from '../__utils__/mock_wrapper';
import * as ScriptManager from '../../utils/load_script';
import {getConfig} from "../../configuration/config";

let createElementMock: MockWrapper<(...args: any[]) => any>;
let insertBeforeMock: MockWrapper<(...args: any[]) => any>;
let scriptElement: HTMLScriptElement;

describe("loadScript()", () => {
    beforeEach(() => {
        document.head.innerHTML = "";
        ScriptManager.clearScriptCache();
        createElementMock = mock(Document.prototype, 'createElement', function (name: string) {
            const element = createElementMock.original.bind(document)(name);
            if (name === 'script') {
                scriptElement = element;
            }
            return element;
        });
        insertBeforeMock = mock(Document.prototype, 'insertBefore', () => {
        });

    });

    afterEach(() => {
        insertBeforeMock.restore();
        createElementMock.restore();
    });

    it('should resolve the promise', () => {
        const result = ScriptManager.loadScript({url: getConfig().urls.mapJS, params: {key: 'fake-key'}});
        scriptElement.dispatchEvent(new Event('load'));

        expect(result).resolves.toBe(undefined);
    });

    it('should rejects when script errors', () => {
        const result = ScriptManager.loadScript({url: getConfig().urls.mapJS, params: {key: 'fake-key'}});
        scriptElement.dispatchEvent(new Event('error'));

        expect(result).rejects.toThrowError(`The script "${getConfig().urls.mapJS}?key=fake-key" failed to load.`);
    });


    it('should returns the same promise when same resource is re-requested', () => {
        const first = ScriptManager.loadScript({url: getConfig().urls.mapJS});
        const second = ScriptManager.loadScript({url: getConfig().urls.mapJS});

        expect(second).toBe(first);
    });

    it('should returns a different promise when different resources are requested', () => {
        const first = ScriptManager.loadScript({url: getConfig().urls.mapJS, params: {key: getConfig().map.woosmapPublicKey}});
        const second = ScriptManager.loadScript({url: getConfig().urls.mapJS, params: {key: "fake-key"}});

        expect(second).not.toBe(first);
    });

    it('should returns a different promise for the same resource when the first request fails', async () => {
        const first = ScriptManager.loadScript({url: getConfig().urls.mapJS, params: {key: getConfig().map.woosmapPublicKey}});

        scriptElement.dispatchEvent(new Event('error'));

        try {
            await first;
        } catch (err) {
            expect((err as Error).message).toBe(`The script "${getConfig().urls.mapJS}?key=${getConfig().map.woosmapPublicKey}" failed to load.`);
        }

        const second = ScriptManager.loadScript({url: getConfig().urls.mapJS, params: {key: getConfig().map.woosmapPublicKey}});

        expect(second).not.toBe(first);
    });
});
