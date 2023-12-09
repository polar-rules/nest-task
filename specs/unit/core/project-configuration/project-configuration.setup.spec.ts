import { jest } from "@jest/globals";

import fs from "fs/promises";

import { Core } from "@core/index.js";

import { Mocks } from "@specs/mocks/index.js";

import { _Fails } from "./fails/index.js";

describe("Core::ProjectConfiguration::Setup", (): void => {
    const Subject = Core.ProjectConfiguration.Setup;

    beforeEach((): void => {
        Mocks.Tools.PathManager.projectRootMock();
    });

    afterEach((): void => {
        Mocks.Tools.PathManager.clean();
    });

    describe("#run", (): void => {
        describe("When `task` should be defined on root level", (): void => {
            describe("When convention is not BearHugs", (): void => {
                let read: Core.ProjectConfiguration.Read | undefined;

                beforeEach(async (): Promise<void> => {
                    Mocks.Fs.merge(Mocks.NestCli.mockMerge(), Mocks.Templates.mockSetupMerge());

                    const subject = new Subject(Core.ProjectConfiguration.Abstractions.Enums.Conventions.KebabCase);
                    await subject.run();

                    read = new Core.ProjectConfiguration.Read();

                    await read.run();
                });

                afterEach((): void => {
                    read = undefined;
                });

                it("Should write configuration to `nest-cli.json`", async (): Promise<void> => {
                    if (!read) {
                        _Fails.NoRead();
                    }

                    expect(read.configuration.task).toBeDefined();
                });

                it("Should create entrypoint", async (): Promise<void> => {
                    if (!read) {
                        _Fails.NoRead();
                    }

                    if (!read.taskConfiguration) {
                        _Fails.NoTask();
                    }

                    const entrypoint = new Core.ProjectConfiguration.Entrypoint(read.taskConfiguration);
                    const file = await fs.readFile(entrypoint.path);

                    expect(file).toBeDefined();
                });

                it("Should create module", async (): Promise<void> => {
                    if (!read) {
                        _Fails.NoRead();
                    }

                    if (!read.taskConfiguration) {
                        _Fails.NoTask();
                    }

                    const module = new Core.ProjectConfiguration.Module(read.taskConfiguration);
                    const file = await fs.readFile(module.path);

                    expect(file).toBeDefined();
                });

                it("Should create task", async (): Promise<void> => {
                    if (!read) {
                        _Fails.NoRead();
                    }

                    if (!read.taskConfiguration) {
                        _Fails.NoTask();
                    }

                    const task = new Core.ProjectConfiguration.Task(read.taskConfiguration);
                    const file = await fs.readFile(task.path);

                    expect(file).toBeDefined();
                });

                it("Should create runner", async (): Promise<void> => {
                    if (!read) {
                        _Fails.NoRead();
                    }

                    if (!read.taskConfiguration) {
                        _Fails.NoTask();
                    }

                    const runner = new Core.ProjectConfiguration.Runner(read.taskConfiguration);
                    const file = await fs.readFile(runner.path);

                    expect(file).toBeDefined();
                });

                it("Should not create index file", async (): Promise<void> => {
                    if (!read) {
                        _Fails.NoRead();
                    }

                    if (!read.taskConfiguration) {
                        _Fails.NoTask();
                    }

                    const index = new Core.ProjectConfiguration.Index(read.taskConfiguration);

                    await expect(() => fs.readFile(index.path)).rejects.toThrow();
                });
            });

            it("Should create index file when BearHugs conventions", async (): Promise<void> => {
                Mocks.Fs.merge(Mocks.NestCli.mockMerge(), Mocks.Templates.mockSetupMerge());

                const subject = new Subject(Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs);
                await subject.run();

                const read = new Core.ProjectConfiguration.Read();

                await read.run();

                if (!read) {
                    _Fails.NoRead();
                }

                if (!read.taskConfiguration) {
                    _Fails.NoTask();
                }

                const index = new Core.ProjectConfiguration.Index(read.taskConfiguration);
                const file = await fs.readFile(index.path);

                expect(file).toBeDefined();
            });
        });

        describe("When task is defined on project level", (): void => {
            beforeEach((): void => {
                Mocks.Fs.merge(Mocks.NestCli.mockMerge(Mocks.NestCli.project), Mocks.Templates.mockSetupMerge());
            });

            it("Should throw if task is already defined", async (): Promise<void> => {
                Mocks.Fs.merge(
                    Mocks.NestCli.mockMerge(Mocks.NestCli.projectWithTask),
                    Mocks.Templates.mockSetupMerge(),
                );

                const subject = new Subject(Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs, "api");
                await expect(() => subject.run()).rejects.toThrow(
                    Core.ProjectConfiguration.Errors.TaskIsPresentInConfig,
                );
            });

            it("Should throw if projectName is missing", async (): Promise<void> => {
                const subject = new Subject(Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs);
                await expect(() => subject.run()).rejects.toThrow(
                    Core.ProjectConfiguration.Errors.ProjectNameIsRequired,
                );
            });

            it("Should throw if projectName is incorrect", async (): Promise<void> => {
                const subject = new Subject(Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs, "wrong");
                await expect(() => subject.run()).rejects.toThrow(
                    Core.ProjectConfiguration.Errors.MissingProjectConfiguration,
                );
            });

            it("Should create index file", async (): Promise<void> => {
                const subject = new Subject(Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs, "api");
                await subject.run();

                const read = new Core.ProjectConfiguration.Read("api");

                await read.run();

                if (!read) {
                    _Fails.NoRead();
                }

                if (!read.taskConfiguration) {
                    _Fails.NoTask();
                }

                const index = new Core.ProjectConfiguration.Index(read.taskConfiguration);
                const file = await fs.readFile(index.path);

                expect(file).toBeDefined();
            });
        });

        describe("Other cases", (): void => {
            beforeEach((): void => {
                Mocks.Fs.merge(Mocks.NestCli.mockMerge(Mocks.NestCli.main), Mocks.Templates.mockSetupMerge());
            });

            it("Should throw in entrypoint", async (): Promise<void> => {
                const subject = new Subject(Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs, "api");

                subject["createConfiguration"] = <any>jest.fn();

                await expect(() => subject.run()).rejects.toThrow(Core.ProjectConfiguration.Errors.TaskIsMissing);
            });

            it("Should throw in module", async (): Promise<void> => {
                const subject = new Subject(Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs, "api");

                subject["createConfiguration"] = <any>jest.fn();
                subject["createEntrypoint"] = <any>jest.fn();

                await expect(() => subject.run()).rejects.toThrow(Core.ProjectConfiguration.Errors.TaskIsMissing);
            });

            it("Should throw in task", async (): Promise<void> => {
                const subject = new Subject(Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs, "api");

                subject["createConfiguration"] = <any>jest.fn();
                subject["createEntrypoint"] = <any>jest.fn();
                subject["createModule"] = <any>jest.fn();

                await expect(() => subject.run()).rejects.toThrow(Core.ProjectConfiguration.Errors.TaskIsMissing);
            });

            it("Should throw in runner", async (): Promise<void> => {
                const subject = new Subject(Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs, "api");

                subject["createConfiguration"] = <any>jest.fn();
                subject["createEntrypoint"] = <any>jest.fn();
                subject["createModule"] = <any>jest.fn();
                subject["createTask"] = <any>jest.fn();

                await expect(() => subject.run()).rejects.toThrow(Core.ProjectConfiguration.Errors.TaskIsMissing);
            });

            it("Should throw in module", async (): Promise<void> => {
                const subject = new Subject(Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs, "api");

                subject["createConfiguration"] = <any>jest.fn();
                subject["createEntrypoint"] = <any>jest.fn();
                subject["createModule"] = <any>jest.fn();
                subject["createTask"] = <any>jest.fn();
                subject["createRunner"] = <any>jest.fn();

                await expect(() => subject.run()).rejects.toThrow(Core.ProjectConfiguration.Errors.TaskIsMissing);
            });
        });
    });
});
