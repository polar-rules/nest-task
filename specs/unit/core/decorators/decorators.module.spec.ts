import { Core } from "@core/index.js";

describe("Core::Decorators::Module", (): void => {
    const Subject = Core.Decorators.Module;

    class DummyDependency {}

    @Subject({
        tasks: [DummyDependency],
    })
    class Dummy {}

    it("Should define `watermark` metadata", (): void => {
        const value = Reflect.getMetadata(Core.Decorators.Enums.Metadata.Watermarks.Module, Dummy);
        expect(value).toBeTruthy();
    });

    it("Should define `tasks` metadata", (): void => {
        const value = Reflect.getMetadata("tasks", Dummy);
        expect(value).not.toBeUndefined();
    });
});
