import { Core } from "@core/index.js";

import { Mocks } from "@specs/mocks/index.js";

describe("Core::Validators", (): void => {
    const subject = Core.Validators;

    beforeEach((): void => {
        Mocks.Nest.CommonLogger.mock();
    });

    afterEach((): void => {
        Mocks.Nest.CommonLogger.clean();
    });

    describe(".Perform", (): void => {
        describe(".validateDependencies", (): void => {
            it("Should not raise error if array is empty", (): void => {
                expect(() => subject.Perform.validateDependencies([])).not.toThrow();
            });

            it("Should not raise an error if array have values", (): void => {
                expect(() => subject.Perform.validateDependencies([<any>{}, <any>{}])).not.toThrow();
            });

            it("Should will raise an error if one of the value is nullable", (): void => {
                expect(() => subject.Perform.validateDependencies([<any>{}, undefined, <any>{}])).toThrowError(
                    Core.Errors.CannotResolveDependencies,
                );
            });
        });
    });
});
