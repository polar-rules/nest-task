import { Patches } from "@patches/index.js";

describe("Patches::Object", (): void => {
    const Subject = Patches.Object;

    describe("#namedInterpolation", (): void => {
        it("Will the same results as Object.keys", (): void => {
            const value = { a: 1, b: 2 };
            const expectation = Object.keys(value);

            expect(Subject.typeSafeKeys(value)).toEqual(expectation);
        });
    });
});
