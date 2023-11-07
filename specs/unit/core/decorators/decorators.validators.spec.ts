import { Core } from "@core/index.js";

describe("Core::Decorators::Validators", (): void => {
    describe(".Descriptable", (): void => {
        describe(".validateModuleKeys", (): void => {
            const subject = Core.Decorators.Validators.Descriptable.keys;

            it("Should successfully pass when provided `name` and `description` as a key", (): void => {
                expect(() => {
                    subject([
                        Core.Decorators.Enums.Metadata.Descriptable.Name,
                        Core.Decorators.Enums.Metadata.Descriptable.Description,
                    ]);
                }).not.toThrow();
            });

            it("Should throw if used undefined key", (): void => {
                expect(() => {
                    subject([<any>"Invalid"]);
                }).toThrow(Core.Decorators.Errors.InvalidMetadataKey);
            });
        });
    });

    describe(".Task", (): void => {
        describe(".validateModuleKeys", (): void => {
            const subject = Core.Decorators.Validators.Task.keys;

            it("Should successfully pass when provided `module`, `runner` and `providers` as a key", (): void => {
                expect(() => {
                    subject([
                        Core.Decorators.Enums.Metadata.Task.Module,
                        Core.Decorators.Enums.Metadata.Task.Runner,
                        Core.Decorators.Enums.Metadata.Task.Providers,
                    ]);
                }).not.toThrow();
            });

            it("Should throw if used undefined key", (): void => {
                expect(() => {
                    subject([<any>"Invalid"]);
                }).toThrow(Core.Decorators.Errors.InvalidMetadataKey);
            });
        });
    });

    describe(".Module", (): void => {
        describe(".validateModuleKeys", (): void => {
            const subject = Core.Decorators.Validators.Module.keys;

            it("Should successfully pass when provided `tasks` as a key", (): void => {
                expect(() => {
                    subject([Core.Decorators.Enums.Metadata.Module.Tasks]);
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
