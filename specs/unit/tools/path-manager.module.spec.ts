import { Tools } from "@tools/index.js";

describe("Tools::Module", (): void => {
    const Subject = Tools.Module;

    describe(".isCJS", (): void => {
        it("Should return true if __dirname is truthy", (): void => {
            const spyOn = jest.spyOn(global, "Boolean").mockReturnValue(true);

            expect(Subject.isCJS).toBeTruthy();

            spyOn.mockClear();
        });

        it("Should return false if __dirname is falsy", (): void => {
            const spyOn = jest.spyOn(global, "Boolean").mockReturnValue(false);

            expect(Subject.isCJS).toBeFalsy();

            spyOn.mockClear();
        });

        it("Should return false when it's undefined", (): void => {
            expect(Subject.isCJS).toBeFalsy();
        });
    });

    describe(".dirname", (): void => {
        it("Should return absolute path when __dirname is not defined", (): void => {
            expect(Subject.dirname.includes(process.cwd())).toBeTruthy();
        });
    });
});
