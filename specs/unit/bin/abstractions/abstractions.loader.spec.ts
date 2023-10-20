import { Bin } from "@bin/index.js";

describe("Abstractions::Loader", (): void => {
    class Subject extends Bin.Abstractions.Loader {
        public finish(): void {}
    }

    describe("#configure", (): void => {
        it("Should call Bin::Loader#start", (): void => {
            const spyOn = jest.spyOn(Bin.Loader.prototype, "start");
            const subject = new Subject();

            subject.configure();

            expect(spyOn).toBeCalledTimes(1);
        });
    });

    describe("#finish", (): void => {
        it("Should be defined", (): void => {
            const subject = new Subject();

            expect(() => subject.finish()).not.toThrow();
        });
    });
});
