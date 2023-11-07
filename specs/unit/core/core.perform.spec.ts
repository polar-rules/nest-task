import { jest } from "@jest/globals";
import { NestFactory } from "@nestjs/core";

import { Core } from "@core/index.js";

describe("Core::Perform", (): void => {
    let createSpy: jest.SpiedFunction<any> | undefined;
    let metadataSpy: jest.SpiedFunction<any> | undefined;
    let validateDependenciesSpy: jest.SpiedFunction<any> | undefined;
    let getMock: jest.SpiedFunction<any> | undefined;
    let performMock: jest.SpiedFunction<any> | undefined;

    const Subject = Core.Perform;

    class DummyRunner {
        public perform = performMock;
    }
    class DummyModule {}
    class DummyTask {}
    class DummyProvider {}

    beforeEach((): void => {
        createSpy = jest.spyOn(<any>NestFactory, "create").mockImplementation(() => ({
            get: getMock,
        }));
        validateDependenciesSpy = jest.spyOn(<any>Core.Validators.Perform, "validateDependencies");
        metadataSpy = <jest.SpiedFunction<any>>(
            jest.spyOn(Reflect, "getMetadata").mockImplementation((metadataKey: string): any => {
                switch (metadataKey) {
                    case Core.Decorators.Enums.Metadata.Task.Runner:
                        return DummyRunner;
                    case Core.Decorators.Enums.Metadata.Task.Providers:
                    case Core.Decorators.Enums.Metadata.BuildIn.ParamTypes:
                        return [DummyProvider];
                    case Core.Decorators.Enums.Metadata.Task.Module:
                        return DummyModule;
                }
            })
        );
        getMock = jest.fn((Class: any): any => {
            return new Class();
        });
        performMock = jest.fn();
    });

    afterEach((): void => {
        getMock?.mockReset();
        validateDependenciesSpy?.mockReset();
        createSpy?.mockReset();
        metadataSpy?.mockReset();
    });

    describe("#run", (): void => {
        it("Should initialise Nest.js application", async (): Promise<void> => {
            const subject = new Subject(DummyTask);

            await subject.run();
            expect(createSpy).toBeCalledTimes(1);
        });

        it("Should call DummyRunner#perform method", async (): Promise<void> => {
            const subject = new Subject(DummyTask);

            await subject.run();
            expect(performMock).toBeCalledTimes(1);
        });

        it("Should run Core.Validators.Perform.validateDependencies", async (): Promise<void> => {
            const subject = new Subject(DummyTask);

            await subject.run();
            expect(validateDependenciesSpy).toBeCalledTimes(1);
        });
    });
});
