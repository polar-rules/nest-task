import { Core } from "@core/index.js";

describe("Core::Decorators::Validators", (): void => {
    describe(".Task", (): void => {
        describe(".validateModuleKeys", (): void => {
            const subject = Core.Decorators.Validators.Task.validateModuleKeys;

            it("Should successfully pass when provided `module` as a key", (): void => {
                expect(() => {
                    subject([Core.Decorators.Enums.Task.MetadataKeys.Module]);
                }).not.toThrow();
            });

            it("Should successfully pass when provided `runner` as a key", (): void => {
                expect(() => {
                    subject([Core.Decorators.Enums.Task.MetadataKeys.Runner]);
                }).not.toThrow();
            });

            it("Should successfully pass when provided `providers` as a key", (): void => {
                expect(() => {
                    subject([Core.Decorators.Enums.Task.MetadataKeys.Providers]);
                }).not.toThrow();
            });

            it("Should throw if used undefined key", (): void => {
                expect(() => {
                    subject([<any>"Invalid"]);
                }).toThrow(Core.Decorators.Errors.InvalidMetadataKey);
            });
        });
    });
});
