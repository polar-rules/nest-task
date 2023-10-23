import "reflect-metadata";

import { Core } from "@core/index.js";

describe("Core::Decorators::Task", (): void => {
    const Subject = Core.Decorators.Task;

    class DummyRunner extends Core.Runner.Base {
        static testValue: Readonly<string> = "exec";

        public perform(): Promise<void> {
            return Promise.resolve(undefined);
        }
    }

    class DummyTask {
        static testValue: Readonly<string> = "task";
    }

    class DummyModule {
        static testValue: Readonly<string> = "module";
    }

    class DummyProvider {
        static testValue: Readonly<string> = "provider";
    }

    it("Should define `module` metadata", (): void => {
        Subject({
            module: DummyModule,
            runner: DummyRunner,
            providers: [],
        })(DummyTask);

        const value = Reflect.getMetadata("module", DummyTask);

        expect(value.testValue).toEqual(DummyModule.testValue);
    });

    it("Should define `runner` metadata", (): void => {
        Subject({
            module: DummyModule,
            runner: DummyRunner,
            providers: [],
        })(DummyTask);

        const value = Reflect.getMetadata("runner", DummyTask);

        expect(value.testValue).toEqual(DummyRunner.testValue);
    });

    it("Should define `providers` metadata", (): void => {
        Subject({
            module: DummyModule,
            runner: DummyRunner,
            providers: [DummyProvider],
        })(DummyTask);

        const value = Reflect.getMetadata("providers", DummyTask);

        expect(value.at(0).testValue).toEqual(DummyProvider.testValue);
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
