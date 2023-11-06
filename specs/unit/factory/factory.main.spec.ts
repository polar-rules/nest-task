import { jest } from "@jest/globals";

import { Core } from "@core/index.js";
import { Factory } from "@factory/index.js";

describe("Factory::Main", (): void => {
    let loadSpy: jest.SpiedFunction<any>;

    const Subject = Factory.Main;

    class Dummy {}

    beforeEach((): void => {
        loadSpy = jest.spyOn(<any>Core.App.prototype, "load").mockImplementation((): void => {});
    });

    afterEach((): void => {
        loadSpy.mockReset();
    });

    describe(".create", (): void => {
        it("Should return an instances of the Core::App", async (): Promise<void> => {
            const results = await Subject.create(Dummy);
            expect(results).toBeInstanceOf(Core.App);
        });

        it("Should call Core::App#load", (): void => {
            Subject.create(Dummy);
            expect(loadSpy).toBeCalledTimes(1);
        });
    });
});
