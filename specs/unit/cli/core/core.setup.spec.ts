import { jest } from "@jest/globals";

import { Cli } from "@cli/index.js";
import { Errors } from "@errors/index.js";
import { Core } from "@core/index.js";

import { Mocks } from "@specs/mocks/index.js";

describe("Cli::Core::Setup", (): void => {
    let runSpyOn: jest.SpiedFunction<any> | undefined;
    let resolveConfigurationSpyOn: jest.SpiedFunction<any> | undefined;
    let setupSpyOn: jest.SpiedFunction<any> | undefined;

    const Subject = Cli.Core.Setup;

    beforeEach((): void => {
        Mocks.Tools.PathManager.projectRootMock();
        Mocks.Fs.merge();
    });

    afterEach((): void => {
        runSpyOn?.mockReset();
        resolveConfigurationSpyOn?.mockReset();
        setupSpyOn?.mockReset();
        Mocks.Inquirer.clean();
    });

    describe("#run", (): void => {
        it("Should throw if there's no task in configuration", async (): Promise<void> => {
            runSpyOn = jest
                .spyOn(Core.ProjectConfiguration.Read.prototype, "run")
                .mockImplementation(() => Promise.resolve());
            resolveConfigurationSpyOn = jest
                .spyOn(Core.ProjectConfiguration.Read.prototype, "resolveConfiguration", "get")
                .mockImplementation(() => ({}));
            setupSpyOn = jest
                .spyOn(Core.ProjectConfiguration.Setup.prototype, "run")
                .mockImplementation(() => Promise.resolve());

            const subject = new Subject(
                "ModuleExample",
                Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs,
            );

            await expect(() => subject.run()).rejects.toThrow(Core.ProjectConfiguration.Errors.TaskIsMissing);
        });

        it("Should throw custom error", async (): Promise<void> => {
            setupSpyOn = jest
                .spyOn(Core.ProjectConfiguration.Setup.prototype, "run")
                .mockImplementation(() => Promise.reject(new Errors.Base("test")));

            const subject = new Subject(
                "ModuleExample",
                Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs,
            );

            await expect(() => subject.run()).rejects.toThrow(Errors.Base);
        });

        it("Should throw default error", async (): Promise<void> => {
            class CustomError extends Error {}

            setupSpyOn = jest
                .spyOn(Core.ProjectConfiguration.Setup.prototype, "run")
                .mockImplementation(() => Promise.reject(new CustomError("test")));

            const subject = new Subject(
                "ModuleExample",
                Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs,
            );

            await expect(() => subject.run()).rejects.toThrow(CustomError);
        });

        it("Should successfully pass", async (): Promise<void> => {
            runSpyOn = jest
                .spyOn(Core.ProjectConfiguration.Read.prototype, "run")
                .mockImplementation(() => Promise.resolve());
            resolveConfigurationSpyOn = jest
                .spyOn(Core.ProjectConfiguration.Read.prototype, "resolveConfiguration", "get")
                .mockImplementation(() => ({
                    task: {
                        path: "Example",
                        entryPoint: "Example",
                        convention: Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs,
                    },
                }));
            setupSpyOn = jest
                .spyOn(Core.ProjectConfiguration.Setup.prototype, "run")
                .mockImplementation(() => Promise.resolve());

            const subject = new Subject(
                "ModuleExample",
                Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs,
            );

            expect(() => subject.run()).not.toThrow();
        });
    });
});
