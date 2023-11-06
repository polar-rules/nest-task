import { Core } from "@core/index.js";

describe("Core::Decorators::Runner", (): void => {
    const Subject = Core.Decorators.Runner;

    class DummyDependency {}

    @Subject()
    class Dummy {
        constructor(private readonly dummyDependency: DummyDependency) {}
    }

    it("Should define `watermark` metadata", (): void => {
        const value = Reflect.getMetadata(Core.Decorators.Constants.Runner.watermark, Dummy);
        expect(value).toBeTruthy();
    });

    it("Should properly assign metadata", (): void => {
        const value = Reflect.getMetadata("design:paramtypes", Dummy);
        expect(value).not.toBeUndefined();
    });
});
