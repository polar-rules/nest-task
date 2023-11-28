import { jest } from "@jest/globals";

import { Cli } from "@cli/index.js";

// import { Mocks } from "@specs/mocks/index.js";

describe("Cli::Abstractions::Loader", (): void => {
    let subject: Cli.Abstractions.Loader;
    let startSpy: jest.SpiedFunction<any> | undefined;

    // class Subject extends Bin.Abstractions.Loader {
    //     public finish(): void {}
    // }

    describe("#configure", (): void => {
        xit("Should call Bin::Loader#start", (): void => {
            startSpy = <jest.SpiedFunction<any>>jest.spyOn(Cli.Abstractions.Ora.prototype, "start");

            subject.configure();
            expect(startSpy).toBeCalledTimes(1);
        });
    });

    describe("#finish", (): void => {
        xit("Should be defined", (): void => {
            expect(() => subject.finish()).not.toThrow();
        });
    });
});
