import { Mocks } from "@specs/mocks/index.js";
import { Configs } from "@specs/configs/index.js";

import { _Module } from "@platform/cjs/lib/tools/tools.module.js";

describe("Platform::Cjs::Lib::Tools::Module", (): void => {
    const Subject = _Module;

    describe(".isCJS", (): void => {
        it("Should have isCJS property set to true", () => {
            expect(Subject.isCJS).toBeTruthy();
        });
    });

    describe(".dirname", (): void => {
        beforeEach((): void => {
            Mocks.Node.Dirname.mock(Configs.Constants.Folders.tmp);
        });

        afterEach((): void => {
            Mocks.Node.Dirname.clean();
        });

        it("Should have a valid property", (): void => {
            expect(Subject.dirname).toBeDefined();
        });

        it("Should have a correct value", (): void => {
            expect(Subject.dirname).toEqual(Configs.Constants.Folders.tmp);
        });

        it("Should not throw an error", (): void => {
            expect(() => Subject.dirname).not.toThrow();
        });
    });
});
