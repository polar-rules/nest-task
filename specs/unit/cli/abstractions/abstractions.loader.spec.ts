import { jest } from "@jest/globals";

import { Cli } from "@cli/index.js";

describe("Cli::Abstractions::Loader", (): void => {
    let startSpy: jest.SpiedFunction<any> | undefined;

    class Subject extends Cli.Abstractions.Loader {
        public finish(): void {}
    }

    describe("#configure", (): void => {
        it("Should call Bin::Loader#start", (): void => {
            startSpy = <jest.SpiedFunction<any>>jest.spyOn(Cli.Abstractions.Ora.prototype, "start");

            const subject = new Subject();

            subject.configure();
            expect(startSpy).toBeCalledTimes(1);
        });
    });

    describe("#finish", (): void => {
        it("Should be defined", (): void => {
            const subject = new Subject();

            expect(() => subject.finish()).not.toThrow();
        });
    });
});
