import { jest } from "@jest/globals";

import { Core } from "@core/index.js";

describe("Core::App", (): void => {
    let spyOn: jest.SpiedFunction<any> | undefined;

    const Subject = Core.App;

    class DummyApp {}

    class DummyRunner {}

    @Core.Decorators.Task({ name: "Dummy", description: " Dummy", module: DummyApp, runner: DummyRunner })
    class DummyTask {}

    @Core.Decorators.Module({ tasks: [DummyTask] })
    class DummyModule {}

    afterEach((): void => {
        spyOn?.mockReset();
    });

    describe("#run", (): void => {
        it("Should load tasks", (): void => {
            const subject = new Subject();

            subject.load(DummyModule);

            expect(subject["tasks"].length).toEqual(1);
        });

        it("Should set empty array if metadata is missing", (): void => {
            const subject = new Subject();

            subject.load(DummyApp);

            expect(subject["tasks"].length).toEqual(0);
        });
    });

    describe("#load", (): void => {
        it("Should throw an error when no tasks are present", async (): Promise<void> => {
            const subject = new Subject();

            await expect(() => subject.run()).rejects.toThrow(Core.Errors.NoTasksFound);
        });

        it("Should provide info when run type is info", async (): Promise<void> => {
            Core.ArgumentsManager.runType = Core.Enums.RunTypes.Info;
            const subject = new Subject();

            await subject.load(DummyModule);
            expect(() => subject.run()).not.toThrow();
        });

        it("Should throw error when specific task is not found", async (): Promise<void> => {
            Core.ArgumentsManager.runType = Core.Enums.RunTypes.Run;

            const subject = new Subject();

            await subject.load(DummyModule);
            await expect(() => subject.run()).rejects.toThrow(Core.Errors.NoSpecificTaskFound);
        });

        it("Should perform when task is found", async (): Promise<void> => {
            spyOn = jest.spyOn(Core.Perform.prototype, "run").mockImplementation(() => Promise.resolve());

            Core.ArgumentsManager.runType = Core.Enums.RunTypes.Run;
            Core.ArgumentsManager.taskName = "Dummy";

            const subject = new Subject();

            await subject.load(DummyModule);
            await subject.run();

            expect(spyOn).toBeCalledTimes(1);
        });
    });
});
