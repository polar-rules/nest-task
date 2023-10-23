import { Core } from "@core/index.js";

describe("Core::Validators", (): void => {
    const subject = Core.Validators;

    describe(".Main", (): void => {
        describe(".validateDependencies", (): void => {
            it("Should not raise error if array is empty", (): void => {
                expect(() => subject.Main.validateDependencies([])).not.toThrow();
            });

            it("Should not raise an error if array have values", (): void => {
                expect(() => subject.Main.validateDependencies([<any>{}, <any>{}])).not.toThrow();
            });

            it("Should will raise an error if one of the value is nullable", (): void => {
                expect(() => subject.Main.validateDependencies([<any>{}, undefined, <any>{}])).toThrowError(
                    Core.Errors.CannotResolveDependencies,
                );
            });
        });
    });
});
