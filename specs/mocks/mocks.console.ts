import { _Types } from "./mocks.types.js";

export namespace _Console {
    const originalMethods: _Types.Console.OriginalMethods = {
        console: {
            info: console.info,
            error: console.error,
            log: console.log,
        },
    };

    function info(): void {
        console.info = jest.fn().mockImplementation((): void => {});
    }

    function error(): void {
        console.error = jest.fn().mockImplementation((): void => {});
    }

    function log(): void {
        console.log = jest.fn().mockImplementation((): void => {});
    }

    export function mock(): void {
        info();
        error();
        log();
    }

    export function clean(): void {
        console.info = originalMethods.console.info;
        console.error = originalMethods.console.info;
        console.log = originalMethods.console.info;
    }
}
