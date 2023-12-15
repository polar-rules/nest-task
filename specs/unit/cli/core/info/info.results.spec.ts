import { jest } from "@jest/globals";

import { Cli } from "@cli/index.js";
import { Core } from "@core/index.js";
import { Messages } from "@messages/index.js";

import { Mocks } from "@specs/mocks/index.js";

describe("Cli::Core::Info::Results", (): void => {
    let loaderSpyOn: jest.SpiedFunction<any> | undefined;
    let stateSpyOn: jest.SpiedFunction<any> | undefined;
    let messagesSpyOn: jest.SpiedFunction<any> | undefined;

    const Subject = Cli.Core.Info.Results;

    afterEach((): void => {
        loaderSpyOn?.mockReset();
        stateSpyOn?.mockReset();
        messagesSpyOn?.mockReset();
        Mocks.Inquirer.clean();
    });

    describe("#run", (): void => {
        it("Should call Messages", async (): Promise<void> => {
            loaderSpyOn = jest.spyOn(Core.Loader.prototype, "run").mockImplementation(() => Promise.resolve());
            messagesSpyOn = <any>jest.spyOn(Messages, "FoundTasks");
            stateSpyOn = <any>(
                jest
                    .spyOn(Core.State, "tasksList", "get")
                    .mockReturnValue([<any>{ name: "Example", description: "description" }])
            );

            const subject = new Subject();

            await subject.run();

            expect(messagesSpyOn).toBeCalledTimes(1);
        });

        it("Should call with correct arguments", async (): Promise<void> => {
            loaderSpyOn = jest.spyOn(Core.Loader.prototype, "run").mockImplementation(() => Promise.resolve());
            messagesSpyOn = <any>jest.spyOn(Messages, "FoundTasks");
            stateSpyOn = <any>(
                jest
                    .spyOn(Core.State, "tasksList", "get")
                    .mockReturnValue([<any>{ name: "Example", description: "description" }])
            );

            const subject = new Subject();

            await subject.run();

            expect(messagesSpyOn).toBeCalledWith([
                {
                    name: "Example",
                    description: "description",
                    args: undefined,
                },
            ]);
        });

        it("Should call Messages with deprecation", async (): Promise<void> => {
            loaderSpyOn = jest.spyOn(Core.Loader.prototype, "run").mockImplementation(() => Promise.resolve());
            messagesSpyOn = <any>jest.spyOn(Messages, "FoundTasks");
            stateSpyOn = <any>(
                jest
                    .spyOn(Core.State, "tasksList", "get")
                    .mockReturnValue([<any>{ name: "Example", description: "description", deprecated: true }])
            );

            const subject = new Subject();

            await subject.run();

            expect(messagesSpyOn).toBeCalledWith([
                {
                    name: "[Deprecated] Example",
                    description: "description",
                    args: undefined,
                },
            ]);
        });
    });
});
