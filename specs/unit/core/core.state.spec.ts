import { Patches } from "@patches/index.js";
import { Core } from "@core/index.js";

describe("Core::State", (): void => {
    const Subject = Core.State;

    describe("#tasksList", (): void => {
        it("Should get the tasksList from global metadata", (): void => {
            const expectedTaskName = "exampleTask";
            Reflect.defineMetadata(Core.Enums.MetadataKeys.TasksList, expectedTaskName, global);

            const result = Subject.tasksList;

            expect(result).toBe(expectedTaskName);
        });

        it("Should set the tasksList in global metadata", (): void => {
            const newTaskName = "newTask";

            Subject.tasksList = <any>newTaskName;

            const result = Patches.Reflect.getMetadata(Core.Enums.MetadataKeys.TasksList, global);
            expect(result).toBe(newTaskName);
        });
    });
});
