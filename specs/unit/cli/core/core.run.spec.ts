import { jest } from "@jest/globals";

import { Cli } from "@cli/index.js";
import { Errors } from "@errors/index.js";
import { Core } from "@core/index.js";

import { Mocks } from "@specs/mocks/index.js";

describe("Cli::Core::Run", (): void => {
    let runSpyOn: jest.SpiedFunction<any> | undefined;

    const Subject = Cli.Core.Run;

    afterEach((): void => {
        runSpyOn?.mockReset();
        Mocks.Inquirer.clean();
    });

    describe("#run", (): void => {
        it("Should throw custom error", async (): Promise<void> => {
            runSpyOn = jest
                .spyOn(Core.Loader.prototype, "run")
                .mockImplementation(() => Promise.reject(new Errors.Base("test")));

            const subject = new Subject("TaskExample", "ProjectName");

            await expect(() => subject.run()).rejects.toThrow(Errors.Base);
        });

        it("Should throw default error", async (): Promise<void> => {
            class CustomError extends Error {}

            runSpyOn = jest
                .spyOn(Core.Loader.prototype, "run")
                .mockImplementation(() => Promise.reject(new CustomError("test")));

            runSpyOn = jest
                .spyOn(Core.ProjectConfiguration.Read.prototype, "run")
                .mockImplementation(() => Promise.reject(new CustomError("test")));

            const subject = new Subject("TaskExample", "ProjectName");

            await expect(() => subject.run()).rejects.toThrow(CustomError);
        });

        it("Should not throw", async (): Promise<void> => {
            runSpyOn = jest.spyOn(Core.Loader.prototype, "run").mockImplementation(() => Promise.resolve());

            const subject = new Subject("TaskExample", "ProjectName");

            await subject.run();

            expect(() => subject.run()).not.toThrow();
        });

        it("Should not throw when arguments passed", async (): Promise<void> => {
            runSpyOn = jest.spyOn(Core.Loader.prototype, "run").mockImplementation(() => Promise.resolve());

            const subject = new Subject("TaskExample", "ProjectName", { test: "example" });

            await subject.run();

            expect(() => subject.run()).not.toThrow();
        });
    });
});
