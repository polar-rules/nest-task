import { jest } from "@jest/globals";

import { Patches } from "@patches/index.js";

export namespace _Json {
    export let spyOn: jest.SpiedFunction<any> | undefined;

    export function mock(returnValue: object): void {
        spyOn = <any>jest.spyOn(Patches.Json, "parse").mockReturnValue(returnValue);
    }

    export function clean(): void {
        spyOn?.mockClear();
    }
}
