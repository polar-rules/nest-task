import { Patches } from "@patches/index.js";
import { Core } from "@core/index.js";

describe("Core::ArgumentsManager", (): void => {
    const Subject = Core.ArgumentsManager;

    describe("#taskName", (): void => {
        it("Should get the task name from global metadata", (): void => {
            const expectedTaskName = "exampleTask";
            Reflect.defineMetadata(Core.Enums.MetadataKeys.TaskName, expectedTaskName, global);

            const result = Subject.taskName;

            expect(result).toBe(expectedTaskName);
        });

        it("Should set the task name in global metadata", (): void => {
            const newTaskName = "newTask";

            Subject.taskName = newTaskName;

            const result = Patches.Reflect.getMetadata(Core.Enums.MetadataKeys.TaskName, global);
            expect(result).toBe(newTaskName);
        });
    });

    describe("#taskArguments", (): void => {
        it("Should get the task arguments from global metadata", (): void => {
            const expectedArguments = { arg1: "value1", arg2: 42 };
            Reflect.defineMetadata(Core.Enums.MetadataKeys.TaskArguments, expectedArguments, global);

            const result = Subject.taskArguments;

            expect(result).toEqual(expectedArguments);
        });

        it("Should set the task arguments in global metadata", (): void => {
            const newArguments = { argA: "valueA", argB: 99 };

            Subject.taskArguments = newArguments;

            const result = Patches.Reflect.getMetadata(Core.Enums.MetadataKeys.TaskArguments, global);
            expect(result).toEqual(newArguments);
        });
    });

    describe("#runType", (): void => {
        it("Should get the run type from global metadata", (): void => {
            const expectedRunType = Core.Enums.RunTypes.Run;
            Reflect.defineMetadata(Core.Enums.MetadataKeys.RunType, expectedRunType, global);

            const result = Subject.runType;

            expect(result).toBe(expectedRunType);
        });

        it("Should set the run type in global metadata", (): void => {
            const newRunType = Core.Enums.RunTypes.Info;

            Subject.runType = newRunType;

            const result = Patches.Reflect.getMetadata(Core.Enums.MetadataKeys.RunType, global);
            expect(result).toBe(newRunType);
        });
    });
});
