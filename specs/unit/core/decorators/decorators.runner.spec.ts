import { faker } from "@faker-js/faker";

import { Core } from "@core/index.js";

describe("Core::Decorators::Runner", (): void => {
    const Subject = Core.Decorators.Runner;

    const name = faker.person.fullName();
    const description = faker.person.bio();

    class DummyDependency {}

    @Subject({
        name,
        description,
    })
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

    it("Should assign `name` metadata", (): void => {
        const value = Reflect.getMetadata("name", Dummy);
        expect(value).toEqual(name);
    });

    it("Should assign `description` metadata", (): void => {
        const value = Reflect.getMetadata("description", Dummy);
        expect(value).toEqual(description);
    });
});
