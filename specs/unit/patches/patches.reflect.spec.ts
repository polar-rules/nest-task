import { jest } from "@jest/globals";

import { Patches } from "@patches/index.js";

describe("Patches::Reflect", (): void => {
    let getMetadataSpy: jest.SpiedFunction<any> | undefined;

    const Subject = Patches.Reflect;

    class Dummy {}

    beforeEach((): void => {
        getMetadataSpy = <jest.SpiedFunction<any>>jest.spyOn(Reflect, "getMetadata").mockImplementation(() => {});
    });

    afterEach((): void => {
        getMetadataSpy?.mockReset();
    });

    describe(".getMetadata", (): void => {
        it("Should proxy call to Reflect.getMetadata method", (): void => {
            Subject.getMetadata("test", Dummy);
            expect(getMetadataSpy).toBeCalledTimes(1);
        });
    });
});
