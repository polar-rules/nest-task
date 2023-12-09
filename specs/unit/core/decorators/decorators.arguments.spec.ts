import { Core } from "@core/index.js";

describe("Core::Decorators::Module", (): void => {
    const Subject = Core.Decorators.Arguments;

    class DTO {
        @Core.Decorators.Property()
        public value: string = "test";
    }

    class Dummy {
        public method(@Subject() _args: DTO) {}
    }

    it("Should define `dto` metadata", (): void => {
        const value = Reflect.getMetadata(Core.Decorators.Enums.Metadata.Runner.Dto, Dummy);
        expect(value).not.toBeUndefined();
    });

    it("Should define `dto` index metadata", (): void => {
        const value = Reflect.getMetadata(Core.Decorators.Enums.Metadata.Runner.DtoIndex, Dummy);
        expect(value).not.toBeUndefined();
    });
});
