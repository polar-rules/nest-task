import { _Module } from "@platform/esm/lib/tools/tools.module.js";

describe("Platform::Esm::Lib::Tools::Module", (): void => {
    const Subject = _Module;

    describe(".isCJS", (): void => {
        it("Should have isCJS property set to true", () => {
            expect(Subject.isCJS).toBeFalsy();
        });
    });

    describe(".dirname", (): void => {
        it("Should have a valid property", (): void => {
            expect(Subject.dirname).toBeDefined();
        });

        it("Should have a correct value", (): void => {
            const expectations = "/platform/esm/lib/tools";

            expect(Subject.dirname.endsWith(expectations)).toBeTruthy();
        });

        it("Should not throw an error", (): void => {
            expect(() => Subject.dirname).not.toThrow();
        });
    });
});
