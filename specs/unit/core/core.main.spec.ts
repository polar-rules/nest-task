import { Module } from "@nestjs/common";

import { Core } from "@core/index.js";
import { Mocks } from "@specs/mocks/index.js";

describe("Core::Main", (): void => {
    const Subject = Core.Main;

    class DummyProvider {
        static testValue: Readonly<string> = "provider";
    }

    class DummyOne {
        static testValue: Readonly<string> = "dummy-one";
    }

    class DummyTwo {
        static testValue: Readonly<string> = "dummy-two";
    }

    @Core.Decorators.Runner()
    class DummyRunner extends Core.Runner.Base {
        static testValue: Readonly<string> = "exec";

        constructor(
            private readonly dummyOne: DummyOne,
            private readonly dummyTwo: DummyTwo,
            private readonly provider: DummyProvider,
        ) {
            super();
        }

        public perform(): Promise<void> {
            return Promise.resolve(undefined);
        }
    }

    @Module({})
    class DummyModule {
        static testValue: Readonly<string> = "module";
    }

    @Core.Decorators.Task({
        module: DummyModule,
        runner: DummyRunner,
        providers: [DummyProvider, DummyTwo, DummyOne],
    })
    class DummyTask {
        static testValue: Readonly<string> = "task";
    }

    beforeEach((): void => {
        Mocks.Nest.Create.mock();
    });

    afterEach((): void => {
        Mocks.Nest.Create.clean();
    });

    describe("#run", (): void => {
        it("Should call DummyRunner#perform", async (): Promise<void> => {
            const spyOn = jest.spyOn(DummyRunner.prototype, "perform");
            const subject = new Subject(DummyTask);

            await subject.run();

            expect(spyOn).toBeCalled();

            spyOn.mockRestore();
        });

        it("Should run Core::Validators::Main.validateDependencies", async (): Promise<void> => {
            const spyOn = jest.spyOn(Core.Validators.Main, "validateDependencies");
            const subject = new Subject(DummyTask);

            await subject.run();

            expect(spyOn).toBeCalled();

            spyOn.mockRestore();
        });

        describe("Dependencies", (): void => {
            it("Should correctly resolve #dummyOne", async (): Promise<void> => {
                const spyOn = jest.spyOn(Array.prototype, "map");

                const subject = new Subject(DummyTask);

                await subject.run();

                const results = <any>spyOn.mock.results.at(0);
                const dependency = results.value.at(0);

                expect(dependency.constructor.name).toEqual("DummyOne");

                spyOn.mockRestore();
            });

            it("Should correctly resolve #dummyTwo", async (): Promise<void> => {
                const spyOn = jest.spyOn(Array.prototype, "map");

                const subject = new Subject(DummyTask);

                await subject.run();

                const results = <any>spyOn.mock.results.at(0);
                const dependency = results.value.at(1);

                expect(dependency.constructor.name).toEqual("DummyTwo");

                spyOn.mockRestore();
            });

            it("Should correctly resolve #provider", async (): Promise<void> => {
                const spyOn = jest.spyOn(Array.prototype, "map");

                const subject = new Subject(DummyTask);

                await subject.run();

                const results = <any>spyOn.mock.results.at(0);
                const dependency = results.value.at(2);

                expect(dependency.constructor.name).toEqual("DummyProvider");

                spyOn.mockRestore();
            });
        });
    });
});
