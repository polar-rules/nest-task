import { jest } from "@jest/globals";
import * as path from "path";

import { Mocks } from "@specs/mocks/index.js";
import { Tools } from "@tools/index.js";

describe("Tools::PathManager::Main", (): void => {
    const Subject = Tools.PathManager.Main;

    describe(".instance", (): void => {
        it("Should have the same instance", (): void => {
            expect(Subject.instance).toEqual(Subject.instance);
        });
    });

    describe("#projectRoot", (): void => {
        afterEach((): void => {
            Mocks.FindPackageJson.clean();
        });

        xit("Should return a project root", (): void => {
            Mocks.FindPackageJson.Mocks.module.mockImplementation(() => Mocks.FindPackageJson.Mocks.defaultBehaviour);

            const expectations = Mocks.FindPackageJson.projectRoot;

            expect(Subject.instance.projectRoot).toEqual(expectations);
        });

        xit("Should raise an error when unable to located `package.json`", (): void => {
            Mocks.FindPackageJson.Mocks.module.mockImplementation(
                () => Mocks.FindPackageJson.Mocks.unableToFindPackageJsonBehaviour,
            );

            const expectations = Tools.PathManager.Errors.NoPackageJson;

            expect(() => Subject.instance.projectRoot).toThrow(expectations);
        });
    });

    describe("#pathResolver", (): void => {
        afterEach((): void => {
            Mocks.FindPackageJson.clean();
        });

        it("Should return a project root", (): void => {
            Mocks.FindPackageJson.Mocks.module.mockImplementation(() => Mocks.FindPackageJson.Mocks.defaultBehaviour);

            const expectations = "test";
            const resolvedPath = Subject.instance.pathResolver(expectations);

            expect(resolvedPath.endsWith(expectations)).toBeTruthy();
        });
    });

    describe("#moduleTypePathResolver", (): void => {
        it("Should return `cjs` path if it's CommonJS", (): void => {
            Mocks.FindPackageJson.Mocks.module.mockImplementation(() => Mocks.FindPackageJson.Mocks.defaultBehaviour);

            const spyOn = jest.spyOn(Tools.Module, "isCJS", "get").mockReturnValue(true);
            const argument = "test-path";
            const expectations = path.join("dist", "cjs", argument);
            const value = Subject.instance.moduleTypePathResolver(argument);

            expect(value.endsWith(expectations)).toBeTruthy();

            spyOn.mockClear();
        });

        it("should return `mjs` path if it's Module", (): void => {
            Mocks.FindPackageJson.Mocks.module.mockImplementation(() => Mocks.FindPackageJson.Mocks.defaultBehaviour);

            const spyOn = jest.spyOn(Tools.Module, "isCJS", "get").mockReturnValue(false);
            const argument = "test-path";
            const expectations = path.join("dist", "esm", argument);
            const value = Subject.instance.moduleTypePathResolver(argument);

            expect(value.endsWith(expectations)).toBeTruthy();

            spyOn.mockClear();
        });
    });
});
