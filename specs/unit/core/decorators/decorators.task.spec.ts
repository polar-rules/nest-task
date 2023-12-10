import { faker } from "@faker-js/faker";

import { Core } from "@core/index.js";

describe("Core::Decorators::Task", (): void => {
    let DummyTask: any;

    const Subject = Core.Decorators.Task;

    class DummyRunner {
        static testValue: Readonly<string> = "exec";

        public perform(): Promise<void> {
            return Promise.resolve(undefined);
        }
    }

    class DummyModule {
        static testValue: Readonly<string> = "module";
    }

    class DummyProvider {
        static testValue: Readonly<string> = "provider";
    }

    beforeEach((): void => {
        DummyTask = class {
            static testValue: Readonly<string> = "task";
        };
    });

    afterEach((): void => {
        DummyTask = undefined;
    });

    it("Should define `watermark` metadata", (): void => {
        Subject({
            name: faker.person.fullName(),
            description: faker.person.bio(),
            module: DummyModule,
            runner: DummyRunner,
            providers: [],
        })(DummyTask);

        const value = Reflect.getMetadata(Core.Decorators.Enums.Metadata.Watermarks.Task, DummyTask);

        expect(value).toBeTruthy();
    });

    it("Should define `module` metadata", (): void => {
        Subject({
            name: faker.person.fullName(),
            description: faker.person.bio(),
            module: DummyModule,
            runner: DummyRunner,
            providers: [],
        })(DummyTask);

        const value = Reflect.getMetadata("module", DummyTask);

        expect(value.testValue).toEqual(DummyModule.testValue);
    });

    it("Should define `runner` metadata", (): void => {
        Subject({
            name: faker.person.fullName(),
            description: faker.person.bio(),
            module: DummyModule,
            runner: DummyRunner,
            providers: [],
        })(DummyTask);

        const value = Reflect.getMetadata("runner", DummyTask);

        expect(value.testValue).toEqual(DummyRunner.testValue);
    });

    it("Should define `providers` metadata", (): void => {
        Subject({
            name: faker.person.fullName(),
            description: faker.person.bio(),
            module: DummyModule,
            runner: DummyRunner,
            providers: [DummyProvider],
        })(DummyTask);

        const value = Reflect.getMetadata("providers", DummyTask);

        expect(value.at(0).testValue).toEqual(DummyProvider.testValue);
    });

    it("Metadata `providers` should be optional", (): void => {
        Subject({
            name: faker.person.fullName(),
            description: faker.person.bio(),
            module: DummyModule,
            runner: DummyRunner,
        })(DummyTask);

        const value = Reflect.getMetadata("providers", DummyTask);

        expect(value).toBeUndefined();
    });

    it("Should assign `name` metadata", (): void => {
        const expectations = faker.person.fullName();

        Subject({
            name: expectations,
            description: faker.person.bio(),
            module: DummyModule,
            runner: DummyRunner,
            providers: [],
        })(DummyTask);

        const value = Reflect.getMetadata("name", DummyTask);

        expect(value).toEqual(expectations);
    });

    it("Should assign `description` metadata", (): void => {
        const expectations = faker.person.fullName();

        Subject({
            name: faker.person.fullName(),
            description: expectations,
            module: DummyModule,
            runner: DummyRunner,
            providers: [],
        })(DummyTask);

        const value = Reflect.getMetadata("description", DummyTask);

        expect(value).toEqual(expectations);
    });

    it("Should define `deprecated` metadata", (): void => {
        Subject({
            name: faker.person.fullName(),
            description: faker.person.bio(),
            module: DummyModule,
            runner: DummyRunner,
            providers: [],
            deprecated: true,
        })(DummyTask);

        const value = Reflect.getMetadata(Core.Decorators.Enums.Metadata.Task.Deprecated, DummyTask);

        expect(value).toBeTruthy();
    });

    it("Should not throw an error when `deprecated` metadata is missing", (): void => {
        Subject({
            name: faker.person.fullName(),
            description: faker.person.bio(),
            module: DummyModule,
            runner: DummyRunner,
            providers: [],
        })(DummyTask);

        const value = Reflect.getMetadata(Core.Decorators.Enums.Metadata.Task.Deprecated, DummyTask);

        expect(value).toBeUndefined();
    });

    it("Should throw an error when incorrect key is used", (): void => {
        expect(() => {
            Subject(<any>{
                otherKey: "test",
                module: DummyModule,
                runner: DummyRunner,
                providers: [DummyProvider],
            })(DummyTask);
        }).toThrowError(Core.Decorators.Errors.InvalidMetadataKey);
    });
});
