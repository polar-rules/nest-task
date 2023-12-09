import { Core } from "@core/index.js";

describe("Core::Decorators::Module", (): void => {
    const Subject = Core.Decorators.Property;

    class DTO {
        @Subject()
        public value: string = "test";
    }

    it("Should define `dto` index metadata", (): void => {
        const value = Reflect.getMetadata(Core.Decorators.Enums.Metadata.Dto.Property, DTO);
        expect(value).not.toBeUndefined();
    });
});
