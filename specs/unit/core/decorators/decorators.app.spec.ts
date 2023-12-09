import { Core } from "@core/index.js";

describe("Core::Decorators::Module", (): void => {
    const Subject = Core.Decorators.App;

    class Dummy {
        public method(@Subject() _app: any) {}
    }

    it("Should define `app` metadata", (): void => {
        const value = Reflect.getMetadata(Core.Decorators.Enums.Metadata.Runner.AppIndex, Dummy);
        expect(value).not.toBeUndefined();
    });
});
