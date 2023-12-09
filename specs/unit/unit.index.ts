import * as Lib from "@lib/index.js";

describe("Lib", (): void => {
    const Subject = Lib;

    it("Should export the correct object", (): void => {
        expect(Object.keys(Subject)).toEqual(["decorators", "factory"]);
    });

    it("Should define decorators", (): void => {
        expect(Object.keys(Subject.Decorators)).toBeDefined();
    });

    it("Should define factory", (): void => {
        expect(Object.keys(Subject.Factory)).toBeDefined();
    });
});
