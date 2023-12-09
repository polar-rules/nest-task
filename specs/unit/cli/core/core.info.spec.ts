import { jest } from "@jest/globals";

import { Cli } from "@cli/index.js";
import { Errors } from "@errors/index.js";
import { Core } from "@core/index.js";
import { Messages } from "@messages/index.js";

import { Mocks } from "@specs/mocks/index.js";

describe("Cli::Core::Info", (): void => {
    let loaderSpyOn: jest.SpiedFunction<any> | undefined;
    let stateSpyOn: jest.SpiedFunction<any> | undefined;
    let messagesSpyOn: jest.SpiedFunction<any> | undefined;

    const Subject = Cli.Core.Info;

    afterEach((): void => {
        loaderSpyOn?.mockReset();
        stateSpyOn?.mockReset();
        messagesSpyOn?.mockReset();
        Mocks.Inquirer.clean();
    });

    describe("#run", (): void => {
        it("Should throw if there's no task in configuration", async (): Promise<void> => {
            loaderSpyOn = jest.spyOn(Core.Loader.prototype, "run").mockImplementation(() => Promise.resolve());
            messagesSpyOn = <any>jest.spyOn(Messages, "FoundTasks");
            stateSpyOn = <any>jest.spyOn(Core.State, "tasksList", "get").mockReturnValue([]);

            const subject = new Subject(undefined);

            await subject.run();

            expect(process.exit).toBeCalled();
        });

        it("Should throw custom error", async (): Promise<void> => {
            loaderSpyOn = jest
                .spyOn(Core.Loader.prototype, "run")
                .mockImplementation(() => Promise.reject(new Errors.Base("test")));

            const subject = new Subject("ModuleExample");

            await expect(() => subject.run()).rejects.toThrow(Errors.Base);
        });

        it("Should throw default error", async (): Promise<void> => {
            class CustomError extends Error {}

            loaderSpyOn = jest
                .spyOn(Core.Loader.prototype, "run")
                .mockImplementation(() => Promise.reject(new CustomError("example")));

            const subject = new Subject("ModuleExample");

            await expect(() => subject.run()).rejects.toThrow(CustomError);
        });

        it("Should call Generator.Create", async (): Promise<void> => {
            loaderSpyOn = jest.spyOn(Core.Loader.prototype, "run").mockImplementation(() => Promise.resolve());
            messagesSpyOn = <any>jest.spyOn(Messages, "FoundTasks");
            stateSpyOn = <any>(
                jest
                    .spyOn(Core.State, "tasksList", "get")
                    .mockReturnValue([<any>{ name: "Example", description: "description" }])
            );

            const subject = new Subject(undefined);

            await subject.run();

            expect(messagesSpyOn).toBeCalledTimes(1);
        });
    });
});
