import * as path from "path";

import { jest } from "@jest/globals";

import { Tools } from "@tools/index.js";

import { Mocks } from "@specs/mocks/index.js";

describe("Tools::PathManager::Main", (): void => {
    const Subject = Tools.PathManager.Main;

    let spyOn: jest.SpiedFunction<any> | undefined;

    afterEach((): void => {
        Mocks.Tools.PathManager.clean();
        spyOn?.mockClear();
    });

    describe(".instance", (): void => {
        it("Should have the same instance", (): void => {
            expect(Subject.instance).toEqual(Subject.instance);
        });
    });

    describe("#projectRoot", (): void => {
        it("Should return a project root", (): void => {
            Mocks.Tools.PathManager.findPackageJsonMock(Mocks.Tools.PathManager.projectRoot);

            expect(Subject.instance.projectRoot).toEqual(Mocks.Tools.PathManager.projectRoot);
        });

        it("Should raise an error when unable to located `package.json`", (): void => {
            Mocks.Tools.PathManager.findPackageJsonMock(null);

            const expectations = Tools.PathManager.Errors.NoPackageJson;

            expect(() => Subject.instance.projectRoot).toThrow(expectations);
        });
    });

    describe("#findPackageJson", (): void => {
        it("Should be defined", (): void => {
            expect((<any>Subject.instance).findPackageJson).toBeDefined();
        });
    });

    describe("#pathResolver", (): void => {
        it("Should return a project root", (): void => {
            Mocks.Tools.PathManager.findPackageJsonMock(Mocks.Tools.PathManager.projectRoot);

            const expectations = "test";
            const resolvedPath = Subject.instance.pathResolver(expectations);

            expect(resolvedPath.endsWith(expectations)).toBeTruthy();
        });
    });

    describe("#moduleTypePathResolver", (): void => {
        it("Should return `cjs` path if it's CommonJS", (): void => {
            const spyOn = jest.spyOn(Tools.Module, "isCJS", "get").mockReturnValue(true);
            const argument = "test-path";
            const expectations = path.join("dist", "cjs", argument);
            const value = Subject.instance.moduleTypePathResolver(argument);

            expect(value.endsWith(expectations)).toBeTruthy();

            spyOn.mockClear();
        });

        it("should return `mjs` path if it's Module", (): void => {
            spyOn = jest.spyOn(Tools.Module, "isCJS", "get").mockReturnValue(false);

            const argument = "test-path";
            const expectations = path.join("dist", "esm", argument);
            const value = Subject.instance.moduleTypePathResolver(argument);

            expect(value.endsWith(expectations)).toBeTruthy();
        });
    });

    describe("#packageResolver", (): void => {
        it("Should resolve correctly path to lib", (): void => {
            const expectations = "lib/test";

            Mocks.Tools.PathManager.findPackageJsonMock(
                path.join(Mocks.Tools.PathManager.projectRoot, "lib", "tools", "path-manager"),
            );

            const results = Subject.instance.packageResolver("test").endsWith(expectations);

            expect(results).toBeTruthy();
        });
    });
});
