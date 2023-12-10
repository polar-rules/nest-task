import { Core } from "@core/index.js";

describe("Core::Task", (): void => {
    const Subject = Core.Task;

    class ModuleDummy {}

    class RunnerDummy {}

    @Core.Decorators.Task({
        name: "Dummy",
        description: "DummyDescription",
        module: ModuleDummy,
        runner: RunnerDummy,
        deprecated: true,
    })
    class DummyTask {}

    describe("#name", (): void => {
        it("Should retrieve the task name from metadata", (): void => {
            const subject = new Subject(DummyTask);

            expect(subject.name).toEqual("Dummy");
        });

        it("Should have the same value on second call", (): void => {
            const subject = new Subject(DummyTask);
            subject.name;
            expect(subject.name).toEqual("Dummy");
        });
    });

    describe("#description", (): void => {
        it("Should retrieve the task name from metadata", (): void => {
            const subject = new Subject(DummyTask);

            expect(subject.description).toEqual("DummyDescription");
        });

        it("Should have the same value on second call", (): void => {
            const subject = new Subject(DummyTask);
            subject.description;
            expect(subject.description).toEqual("DummyDescription");
        });
    });

    describe("#runner", (): void => {
        it("Should retrieve the task name from metadata", (): void => {
            const subject = new Subject(DummyTask);

            expect(subject.runner).toEqual(RunnerDummy);
        });

        it("Should have the same value on second call", (): void => {
            const subject = new Subject(DummyTask);
            subject.runner;
            expect(subject.runner).toEqual(RunnerDummy);
        });
    });

    describe("#dto", (): void => {
        it("Should retrieve the task name from metadata", (): void => {
            const subject = new Subject(DummyTask);

            expect(subject.dto).toBeUndefined();
        });

        it("Should have the same value on second call", (): void => {
            const subject = new Subject(DummyTask);
            subject.dto;
            expect(subject.dto).toBeUndefined();
        });
    });

    describe("#dtoIndex", (): void => {
        it("Should retrieve the task name from metadata", (): void => {
            const subject = new Subject(DummyTask);

            expect(subject.dtoIndex).toBeUndefined();
        });

        it("Should have the same value on second call", (): void => {
            const subject = new Subject(DummyTask);
            subject.dtoIndex;
            expect(subject.dtoIndex).toBeUndefined();
        });
    });

    describe("#appIndex", (): void => {
        it("Should retrieve the task name from metadata", (): void => {
            const subject = new Subject(DummyTask);

            expect(subject.appIndex).toBeUndefined();
        });

        it("Should have the same value on second call", (): void => {
            const subject = new Subject(DummyTask);
            subject.appIndex;
            expect(subject.appIndex).toBeUndefined();
        });
    });

    describe("#deprecated", (): void => {
        it("Should retrieve the task name from metadata", (): void => {
            const subject = new Subject(DummyTask);

            expect(subject.deprecated).toBeTruthy();
        });

        it("Should have the same value on second call", (): void => {
            const subject = new Subject(DummyTask);
            subject.deprecated;
            expect(subject.deprecated).toBeTruthy();
        });

        it("Should be set to false by default", (): void => {
            @Core.Decorators.Task({
                name: "Dummy",
                description: "DummyDescription",
                module: ModuleDummy,
                runner: RunnerDummy,
            })
            class Dummy {}

            const subject = new Subject(Dummy);

            expect(subject.deprecated).toBeFalsy();
        });
    });

    describe("#module", (): void => {
        it("Should retrieve the task name from metadata", (): void => {
            const subject = new Subject(DummyTask);

            expect(subject.module).toEqual(ModuleDummy);
        });

        it("Should have the same value on second call", (): void => {
            const subject = new Subject(DummyTask);
            subject.module;
            expect(subject.module).toEqual(ModuleDummy);
        });
    });

    describe("#providers", (): void => {
        it("Should retrieve the task name from metadata", (): void => {
            const subject = new Subject(DummyTask);

            expect(subject.providers.length).toEqual(0);
        });

        it("Should have the same value on second call", (): void => {
            const subject = new Subject(DummyTask);
            subject.providers;
            expect(subject.providers.length).toEqual(0);
        });
    });

    describe("args", (): void => {
        it("Should retrieve the array of property metadata for arguments", (): void => {
            const subject = new Subject(DummyTask);

            expect(subject.args.length).toEqual(0);
        });

        it("Should return the same array on second call", (): void => {
            const subject = new Subject(DummyTask);

            subject.args;

            expect(subject.args.length).toEqual(0);
        });
    });
});
