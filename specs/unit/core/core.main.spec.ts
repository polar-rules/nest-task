import { faker } from "@faker-js/faker";
import { jest } from "@jest/globals";

import { Core } from "@core/index.js";

describe("Core::Main", (): void => {
    let subject: Core.Main;

    let loadSpy: jest.SpiedFunction<any> | undefined;
    let validatorsSpy: jest.SpiedFunction<any> | undefined;
    let performSpy: jest.SpiedFunction<any> | undefined;

    const Subject = Core.Main;

    class DummyClass {}

    beforeEach((): void => {
        subject = new Subject("test", "test");

        validatorsSpy = jest.spyOn(<any>Core.Decorators.Validators.Task, "keys").mockImplementation(() => {});
        loadSpy = jest.spyOn(<any>Core.Main.prototype, "load").mockImplementation(async () => {});
    });

    afterEach((): void => {
        loadSpy?.mockReset();
        validatorsSpy?.mockReset();
        performSpy?.mockReset();
    });

    describe("#run", (): void => {
        it("Should call Dummy#run method", async (): Promise<void> => {
            const name = faker.person.fullName();

            @Core.Decorators.Task({
                name,
                description: faker.person.bio(),
                module: DummyClass,
                runner: DummyClass,
            })
            class DummyTask {
                public run(): void {}
            }

            performSpy = jest.spyOn(<any>Core.Perform.prototype, "run").mockImplementation((): void => {});
            subject = new Subject(name);

            subject["availableTasks"] = [DummyTask];

            await subject.run();

            expect(performSpy).toBeCalledTimes(1);
        });

        it("Should throw if no tasks found", async (): Promise<void> => {
            await expect(() => subject.run()).rejects.toThrowError(Core.Errors.NoTasksFound);
        });

        it("Should throw if no task class found", async (): Promise<void> => {
            @Core.Decorators.Task({
                name: faker.person.fullName(),
                description: faker.person.bio(),
                module: DummyClass,
                runner: DummyClass,
            })
            class DummyTask {}

            subject["availableTasks"] = [DummyTask];

            await expect(() => subject.run()).rejects.toThrowError(Core.Errors.NoSpecificTaskFound);
        });
    });
});
