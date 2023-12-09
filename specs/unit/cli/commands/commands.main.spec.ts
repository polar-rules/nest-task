import { jest } from "@jest/globals";

import { Cli } from "@cli/index.js";
import { Core } from "@core/index.js";

import { Mocks } from "@specs/mocks/index.js";

describe("Cli::Commands::Main", (): void => {
    let spyOn: jest.SpiedFunction<any> | undefined;

    const Subject = Cli.Commands.Main;

    afterEach((): void => {
        spyOn?.mockReset();
        Mocks.Inquirer.clean();
    });

    describe("#run", (): void => {
        it("Should exit with error when no command", async (): Promise<void> => {
            const subject = new Subject(<any>undefined);
            await subject.run();

            expect(process.exit).toBeCalledWith(1);
        });

        describe("Help", (): void => {
            it("Should run the task based on the selected action", async (): Promise<void> => {
                spyOn = jest.spyOn(Cli.Commands.Help.Main.prototype, "run").mockImplementation(() => Promise.resolve());

                const subject = new Subject(Cli.Commands.Enums.Commands.Help);

                await subject.run();

                expect(spyOn).toHaveBeenCalledTimes(1);
            });
        });

        describe("Setup", (): void => {
            it("Should run the task based on the selected action", async (): Promise<void> => {
                spyOn = jest
                    .spyOn(Cli.Commands.Setup.Main.prototype, "run")
                    .mockImplementation(() => Promise.resolve());

                const subject = new Subject(Cli.Commands.Enums.Commands.Setup, {
                    convention: Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs,
                });

                await subject.run();

                expect(spyOn).toHaveBeenCalledTimes(1);
            });

            it("Should exit if not arguments", async (): Promise<void> => {
                const subject = new Subject(Cli.Commands.Enums.Commands.Setup);

                try {
                    await subject.run();
                } catch {
                    expect(process.exit).toHaveBeenCalledWith(1);
                }
            });

            it("Should exit if no conventions in arguments", async (): Promise<void> => {
                const subject = new Subject(Cli.Commands.Enums.Commands.Setup, <any>{ test: "value" });

                await subject.run();

                expect(process.exit).toHaveBeenCalledWith(1);
            });
        });

        describe("Create", (): void => {
            it("Should run the task based on the selected action", async (): Promise<void> => {
                spyOn = jest
                    .spyOn(Cli.Commands.Create.Main.prototype, "run")
                    .mockImplementation(() => Promise.resolve());

                const subject = new Subject(Cli.Commands.Enums.Commands.Create, {
                    name: "Test",
                    description: "TestDescription",
                });

                await subject.run();

                expect(spyOn).toHaveBeenCalledTimes(1);
            });

            it("Should exit if not arguments", async (): Promise<void> => {
                const subject = new Subject(Cli.Commands.Enums.Commands.Create);

                try {
                    await subject.run();
                } catch {
                    expect(process.exit).toHaveBeenCalledWith(1);
                }
            });

            it("Should exit if no name or description", async (): Promise<void> => {
                const subject = new Subject(Cli.Commands.Enums.Commands.Create, <any>{ test: "value" });

                await subject.run();

                expect(process.exit).toHaveBeenCalledWith(1);
            });
        });

        describe("Run", (): void => {
            it("Should run the task based on the selected action", async (): Promise<void> => {
                spyOn = jest.spyOn(Cli.Commands.Run.Main.prototype, "run").mockImplementation(() => Promise.resolve());

                const subject = new Subject(Cli.Commands.Enums.Commands.Run, {
                    name: "Test",
                });

                await subject.run();

                expect(spyOn).toHaveBeenCalledTimes(1);
            });

            it("Should exit if not arguments", async (): Promise<void> => {
                const subject = new Subject(Cli.Commands.Enums.Commands.Run);

                try {
                    await subject.run();
                } catch {
                    expect(process.exit).toHaveBeenCalledWith(1);
                }
            });

            it("Should exit if no name or description", async (): Promise<void> => {
                const subject = new Subject(Cli.Commands.Enums.Commands.Run, <any>{ test: "value" });

                await subject.run();

                expect(process.exit).toHaveBeenCalledWith(1);
            });
        });

        describe("Info", (): void => {
            it("Should run the task based on the selected action", async (): Promise<void> => {
                spyOn = jest.spyOn(Cli.Commands.Info.Main.prototype, "run").mockImplementation(() => Promise.resolve());

                const subject = new Subject(Cli.Commands.Enums.Commands.Info);

                await subject.run();

                expect(spyOn).toHaveBeenCalledTimes(1);
            });
        });
    });
});
