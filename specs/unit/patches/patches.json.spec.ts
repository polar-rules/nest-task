import { Patches } from "@patches/index.js";

describe("Patches::Json", (): void => {
    const Subject = Patches.Json;

    describe(".parse", (): void => {
        it("Will the same results as Object.keys", (): void => {
            const spyOn = jest.spyOn(JSON, "parse");

            Subject.parse(JSON.stringify({}));

            expect(spyOn).toBeCalledTimes(1);
            spyOn.mockClear();
        });
    });
});
