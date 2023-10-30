import { jest } from "@jest/globals";

import { Patches } from "@patches/index.js";

describe("Patches::Json", (): void => {
    let parseSpy: jest.SpiedFunction<any> | undefined;

    const Subject = Patches.Json;

    afterEach((): void => {
        parseSpy?.mockReset();
    });

    describe(".parse", (): void => {
        it("Will the same results as Object.keys", (): void => {
            parseSpy = <jest.SpiedFunction<any>>jest.spyOn(JSON, "parse");

            Subject.parse(JSON.stringify({}));
            expect(parseSpy).toBeCalledTimes(1);
        });
    });
});
