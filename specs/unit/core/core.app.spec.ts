import { jest } from "@jest/globals";

import { Core } from "@core/index.js";
import { Mocks } from "@specs/mocks/index.js";

describe("Core::App", (): void => {
    let spyOn: jest.SpiedFunction<any> | undefined;
    let executionSourceSpy: jest.SpiedFunction<any> | undefined;

    const Subject = Core.App;

    class DummyApp {}

    class DummyRunner {}

    @Core.Decorators.Task({ name: "Dummy", description: " Dummy", module: DummyApp, runner: DummyRunner })
    class DummyTask {}

    @Core.Decorators.Module({ tasks: [DummyTask] })
    class DummyModule {}

    beforeEach((): void => {
        Mocks.Tools.PathManager.projectRootMock();
        Mocks.Fs.merge(Mocks.Core.ProjectConfiguration.Read.fsMerge());
    });

    afterEach((): void => {
        spyOn?.mockReset();
        executionSourceSpy?.mockReset();
        Mocks.Core.ProjectConfiguration.Read.clean();
    });

    describe("#run", (): void => {
        it("Should throw an error when no tasks are present", async (): Promise<void> => {
            const subject = new Subject();

            await expect(() => subject.run()).rejects.toThrow(Core.Errors.NoTasksFound);
        });

        it("Should provide info when run type is info", async (): Promise<void> => {
            executionSourceSpy = jest
                .spyOn(Core.ArgumentsManager, "executionSource", "get")
                .mockImplementation(() => Core.Enums.ExecutionSourceTypes.Command);
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

    describe("#load", (): void => {
        it("Should load tasks", async (): Promise<void> => {
            executionSourceSpy = jest
                .spyOn(Core.ArgumentsManager, "executionSource", "get")
                .mockImplementation(() => Core.Enums.ExecutionSourceTypes.Command);

            const subject = new Subject();

            await subject.load(DummyModule);

            expect(subject["tasks"].length).toEqual(1);
        });

        it("Should set empty array if metadata is missing", async (): Promise<void> => {
            const subject = new Subject();

            await subject.load(DummyApp);

            expect(subject["tasks"].length).toEqual(0);
        });
    });
});
