import { Core } from "@core/index.js";

describe("Core::Decorators::Logger", (): void => {
    const Subject = Core.Decorators.Logger;

    class Dummy {
        public method(@Subject() _logger: any): void {}
    }

    it("Should define `app` metadata", (): void => {
        const value = Reflect.getMetadata(Core.Decorators.Enums.Metadata.Runner.LoggerIndex, Dummy);
        expect(value).not.toBeUndefined();
    });
});
