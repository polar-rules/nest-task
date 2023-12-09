import { jest } from "@jest/globals";

import { Cli } from "@cli/index.js";
import { Errors } from "@errors/index.js";
import { Core } from "@core/index.js";
import { Generators } from "@generators/index.js";

import { Mocks } from "@specs/mocks/index.js";

describe("Cli::Core::Create", (): void => {
    let runSpyOn: jest.SpiedFunction<any> | undefined;
    let resolveConfigurationSpyOn: jest.SpiedFunction<any> | undefined;
    let generatorConfigurationSpyOn: jest.SpiedFunction<any> | undefined;

    const Subject = Cli.Core.Create;

    afterEach((): void => {
        runSpyOn?.mockReset();
        resolveConfigurationSpyOn?.mockReset();
        generatorConfigurationSpyOn?.mockReset();
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

            const subject = new Subject("ModuleExample", "ModuleDescription");

            await expect(() => subject.run()).rejects.toThrow(Core.ProjectConfiguration.Errors.TaskIsMissing);
        });

        it("Should throw custom error", async (): Promise<void> => {
            runSpyOn = jest
                .spyOn(Core.ProjectConfiguration.Read.prototype, "run")
                .mockImplementation(() => Promise.reject(new Errors.Base("test")));

            const subject = new Subject("ModuleExample", "ModuleDescription");

            await expect(() => subject.run()).rejects.toThrow(Errors.Base);
        });

        it("Should throw default error", async (): Promise<void> => {
            class CustomError extends Error {}

            runSpyOn = jest
                .spyOn(Core.ProjectConfiguration.Read.prototype, "run")
                .mockImplementation(() => Promise.reject(new CustomError("test")));

            const subject = new Subject("ModuleExample", "ModuleDescription");

            await expect(() => subject.run()).rejects.toThrow(CustomError);
        });

        it("Should call Generator.Create", async (): Promise<void> => {
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
            generatorConfigurationSpyOn = jest
                .spyOn(Generators.Create.prototype, "run")
                .mockImplementation(() => Promise.resolve());

            const subject = new Subject("ModuleExample", "ModuleDescription");

            await subject.run();

            expect(generatorConfigurationSpyOn).toBeCalledTimes(1);
        });
    });
});
