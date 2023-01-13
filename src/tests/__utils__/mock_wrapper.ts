/**
 * Defines the mock wrapper for selectively mocking methods on an object.
 */
export interface MockWrapper<T extends (...args: any[]) => any> {
    original: T;
    implementation: T;
    restore: () => void;
}

/**
 * Selectively mock methods on an existing object
 *
 * @param target Target object to apply the mock to.
 * @param functionName The function name on the object that will be mocked.
 * @param implementation The new implementation for the object.
 */
export function mock<TTarget, TFunction extends jest.FunctionPropertyNames<Required<TTarget>>>(
    target: TTarget,
    functionName: TFunction,
    implementation: Required<TTarget>[TFunction],
): Required<TTarget>[TFunction] extends (...args: any[]) => any ? MockWrapper<Required<TTarget>[TFunction]> : never;
export function mock<T>(
    target: T,
    functionName: string,
    implementation: (...args: any[]) => any,
): MockWrapper<(...args: any[]) => any>;
export function mock<T>(
    target: T,
    functionName: string,
    implementation: (...args: any[]) => any,
): MockWrapper<(...args: any[]) => any> {
    const obj: any = target;
    const original = obj[functionName] as unknown as (...args: any[]) => any;
    obj[functionName] = implementation as any;

    function restore(): void {
        obj[functionName] = original as any;
    }

    return {
        original,
        implementation,
        restore,
    };
}
