import { Core } from "@core/index.js";
import { jest } from "@jest/globals";

describe("Core::ProjectConfiguration::Naming", (): void => {
    const Subject = Core.ProjectConfiguration.Naming;

    it("Should create an instance of Subject with CamelCase convention", (): void => {
        const subject = new Subject(Core.ProjectConfiguration.Abstractions.Enums.Conventions.CamelCase);
        expect(subject).toBeInstanceOf(Subject);
    });

    it("Should create an instance of Subject with BearHugs convention", (): void => {
        const subject = new Subject(Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs);
        expect(subject).toBeInstanceOf(Subject);
    });

    describe("#isBearHugs", (): void => {
        it("Should return true if convention is BearHugs", (): void => {
            const subject = new Subject(Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs);
            expect(subject.isBearHugs).toBe(true);
        });

        it("Should return false if convention is CamelCase", (): void => {
            const subject = new Subject(Core.ProjectConfiguration.Abstractions.Enums.Conventions.CamelCase);
            expect(subject.isBearHugs).toBe(false);
        });
    });

    describe("#taskName", (): void => {
        it("Should apply BearHugs conventions to task name", (): void => {
            const subject = new Subject(Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs);
            expect(subject.taskName("example_test")).toEqual("_Task");
        });

        for (const convention of [
            Core.ProjectConfiguration.Abstractions.Enums.Conventions.KebabCase,
            Core.ProjectConfiguration.Abstractions.Enums.Conventions.CamelCase,
            Core.ProjectConfiguration.Abstractions.Enums.Conventions.SnakeCase,
        ]) {
            it(`Should apply ${convention} conventions to task name`, (): void => {
                const subject = new Subject(convention);
                expect(subject.taskName("example_test")).toEqual("ExampleTestTask");
            });
        }
    });

    describe("#runnerName", (): void => {
        it("Should apply BearHugs conventions to runner name", (): void => {
            const subject = new Subject(Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs);
            expect(subject.runnerName("example_test")).toEqual("_Runner");
        });

        for (const convention of [
            Core.ProjectConfiguration.Abstractions.Enums.Conventions.KebabCase,
            Core.ProjectConfiguration.Abstractions.Enums.Conventions.CamelCase,
            Core.ProjectConfiguration.Abstractions.Enums.Conventions.SnakeCase,
        ]) {
            it(`Should apply ${convention} conventions to runner name`, (): void => {
                const subject = new Subject(convention);
                expect(subject.runnerName("example_test")).toEqual("ExampleTestRunner");
            });
        }
    });

    describe("#moduleName", (): void => {
        it("Should apply BearHugs conventions to module name", (): void => {
            const subject = new Subject(Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs);
            expect(subject.moduleName("example_test")).toEqual("_Module");
        });

        for (const convention of [
            Core.ProjectConfiguration.Abstractions.Enums.Conventions.KebabCase,
            Core.ProjectConfiguration.Abstractions.Enums.Conventions.CamelCase,
            Core.ProjectConfiguration.Abstractions.Enums.Conventions.SnakeCase,
        ]) {
            it(`Should apply ${convention} conventions to module name`, (): void => {
                const subject = new Subject(convention);
                expect(subject.moduleName("example_test")).toEqual("ExampleTestModule");
            });
        }
    });

    describe("#folderName", (): void => {
        it("Should apply BearHugs conventions", (): void => {
            const subject = new Subject(Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs);
            expect(subject.folderName("example_test")).toEqual("example-test");
        });

        it("Should apply KebabCase conventions", (): void => {
            const subject = new Subject(Core.ProjectConfiguration.Abstractions.Enums.Conventions.KebabCase);
            expect(subject.folderName("example_test")).toEqual("example-test");
        });

        it("Should apply CamelCase conventions", (): void => {
            const subject = new Subject(Core.ProjectConfiguration.Abstractions.Enums.Conventions.CamelCase);
            expect(subject.folderName("example_test")).toEqual("exampleTest");
        });

        it("Should apply SnakeCase conventions", (): void => {
            const subject = new Subject(Core.ProjectConfiguration.Abstractions.Enums.Conventions.SnakeCase);
            expect(subject.folderName("example_test")).toEqual("example_test");
        });
    });

    describe("#runnerFileName", (): void => {
        it("Should delegate call to #folderName", (): void => {
            const subject = new Subject(Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs);

            jest.spyOn(subject, "runnerFileName");
            subject.runnerFileName("example");

            expect(subject.runnerFileName).toBeCalledTimes(1);
        });

        it("Should add .runner to string", (): void => {
            const subject = new Subject(Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs);
            expect(subject.runnerFileName("example").endsWith(".runner")).toBeTruthy();
        });
    });

    describe("#taskFileName", (): void => {
        it("Should delegate call to #folderName", (): void => {
            const subject = new Subject(Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs);

            jest.spyOn(subject, "folderName");
            subject.taskFileName("example");

            expect(subject.folderName).toBeCalledTimes(1);
        });

        it("Should add .task to string", (): void => {
            const subject = new Subject(Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs);
            expect(subject.taskFileName("example").endsWith(".task")).toBeTruthy();
        });
    });

    describe("#importFrom", (): void => {
        it("Should apply BearHugs conventions to import file of the task", (): void => {
            const subject = new Subject(Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs);
            expect(subject.importFrom("example_test")).toEqual("");
        });

        it("Should apply KebabCase conventions to import file of task", (): void => {
            const subject = new Subject(Core.ProjectConfiguration.Abstractions.Enums.Conventions.KebabCase);
            expect(subject.importFrom("example_test")).toEqual("example-test.task");
        });

        it("Should apply CamelCase conventions to import file of task", (): void => {
            const subject = new Subject(Core.ProjectConfiguration.Abstractions.Enums.Conventions.CamelCase);
            expect(subject.importFrom("example_test")).toEqual("exampleTest.task");
        });

        it("Should apply SnakeCase conventions to import file of task", (): void => {
            const subject = new Subject(Core.ProjectConfiguration.Abstractions.Enums.Conventions.SnakeCase);
            expect(subject.importFrom("example_test")).toEqual("example_test.task");
        });
    });

    describe("#importEntity", (): void => {
        it("Should apply BearHugs conventions to import of the task", (): void => {
            const subject = new Subject(Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs);
            expect(subject.importEntity("example_test")).toEqual("_ExampleTest");
        });

        for (const convention of [
            Core.ProjectConfiguration.Abstractions.Enums.Conventions.KebabCase,
            Core.ProjectConfiguration.Abstractions.Enums.Conventions.CamelCase,
            Core.ProjectConfiguration.Abstractions.Enums.Conventions.SnakeCase,
        ]) {
            it(`Should apply ${convention} conventions to usage of task`, (): void => {
                const subject = new Subject(convention);
                expect(subject.importEntity("example_test")).toEqual("ExampleTestTask");
            });
        }
    });

    describe("#usageEntity", (): void => {
        it("Should apply BearHugs conventions to usage of task", (): void => {
            const subject = new Subject(Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs);
            expect(subject.usageEntity("example_test")).toEqual("_ExampleTest.Task");
        });

        for (const convention of [
            Core.ProjectConfiguration.Abstractions.Enums.Conventions.KebabCase,
            Core.ProjectConfiguration.Abstractions.Enums.Conventions.CamelCase,
            Core.ProjectConfiguration.Abstractions.Enums.Conventions.SnakeCase,
        ]) {
            it(`Should apply ${convention} conventions to usage of task`, (): void => {
                const subject = new Subject(convention);
                expect(subject.usageEntity("example_test")).toEqual("ExampleTestTask");
            });
        }
    });
});
