import { jest } from "@jest/globals";

import { Core } from "@core/index.js";

export namespace _Read {
    export let spyOn: jest.SpiedFunction<any> | undefined;

    export function mock(): void {
        spyOn = jest.spyOn(Core.ProjectConfiguration.Read.prototype, "run").mockImplementation(() => Promise.resolve());
    }

    export function clean(): void {
        spyOn?.mockClear();
    }

    export function fsMerge(): Record<string, any> {
        const read = new Core.ProjectConfiguration.Read();

        return {
            [read.configurationPath]: JSON.stringify({}),
        };
    }
}
