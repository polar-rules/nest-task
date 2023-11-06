import { jest } from "@jest/globals";
import { Tools } from "@tools/index.js";

describe("Tools::Module", (): void => {
    let booleanSpy: jest.SpiedClass<any>;
    let evalSpy: jest.SpiedFunction<any> | undefined;

    const Subject = Tools.Module;

    afterEach((): void => {
        booleanSpy?.mockReset();
        evalSpy?.mockReset();
    });

    describe(".isCJS", (): void => {
        it("Should return false when it's not CJS", (): void => {
            expect(Subject.isCJS).toBeFalsy();
        });
    });

    describe(".dirname", (): void => {
        it("Should return absolute path when __dirname is not defined", (): void => {
            const expectations = "/lib/tools";
            expect(Subject.dirname.endsWith(expectations)).toBeTruthy();
        });
    });
});
