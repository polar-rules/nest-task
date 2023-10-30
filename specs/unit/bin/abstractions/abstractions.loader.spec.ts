import { jest } from "@jest/globals";

import { Bin } from "@bin/index.js";

describe("Abstractions::Loader", (): void => {
    let subject: Bin.Abstractions.Loader;
    let startSpy: jest.SpiedFunction<any> | undefined;

    class Subject extends Bin.Abstractions.Loader {
        public finish(): void {}
    }

    beforeEach((): void => {
        subject = new Subject();
    });

    afterEach((): void => {
        startSpy?.mockReset();
    });

    describe("#configure", (): void => {
        it("Should call Bin::Loader#start", (): void => {
            startSpy = <jest.SpiedFunction<any>>jest.spyOn(Bin.Loader.prototype, "start");

            subject.configure();
            expect(startSpy).toBeCalledTimes(1);
        });
    });

    describe("#finish", (): void => {
        it("Should be defined", (): void => {
            expect(() => subject.finish()).not.toThrow();
        });
    });
});
