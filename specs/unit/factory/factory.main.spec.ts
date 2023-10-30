import { Factory } from "@factory/index.js";

describe("Factory::Main", (): void => {
    const Subject = Factory.Main;

    class Dummy {}

    afterEach((): void => {
        Subject.instance = <any>undefined;
    });

    describe(".instance", (): void => {
        it("Should be defined and set after .create", (): void => {
            Subject.create(Dummy);

            expect(Subject.instance).toBeDefined();
        });
    });
});
