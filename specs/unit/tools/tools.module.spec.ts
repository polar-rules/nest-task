import path from "path";

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
        it("Should return false if __dirname is falsy", (): void => {
            booleanSpy = jest.spyOn(global, "Boolean").mockReturnValue(false);
            expect(Subject.isCJS).toBeFalsy();
        });

        it("Should return false when it's undefined", (): void => {
            expect(Subject.isCJS).toBeFalsy();
        });
    });

    describe(".dirname", (): void => {
        it("Should return absolute path when __dirname is not defined", (): void => {
            const expectations: Readonly<string> = "/test";
            const fileUrl: Readonly<string> = "file://localhost" + path.join(expectations, "test.ts");

            evalSpy = <jest.SpiedFunction<any>>jest.spyOn(global, "eval").mockImplementation(() => fileUrl);

            expect(Subject.dirname).toEqual(expectations);
        });
    });
});
