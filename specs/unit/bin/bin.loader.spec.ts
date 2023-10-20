import { Bin } from "@bin/index.js";

import { Mocks } from "@specs/mocks/index.js";

describe("Bin::Loader", (): void => {
    const Subject = Bin.Loader;

    afterEach((): void => {
        Mocks.Ora.clean();
    });

    describe("#start", (): void => {
        it("Should start with specific text", (): void => {
            const startText = "Start!";
            const subject = new Subject();

            subject.start(startText);

            expect(Mocks.Ora.Mocks.defaultBehaviour).toBeCalledWith({ text: startText });
        });

        it("Should call Ora#start method", (): void => {
            const subject = new Subject();

            subject.start("");

            expect(Mocks.Ora.Mocks.start).toBeCalled();
        });
    });

    describe("#message", (): void => {
        it("Should call Ora#text method", (): void => {
            const messageText = "Message!";
            const subject = new Subject();

            subject.start("");
            subject.message(messageText);

            expect(subject["ora"].text).toBe(messageText);
        });
    });

    describe("#finish", (): void => {
        it("Should call Ora#succeed method", (): void => {
            const finishText = "Done!";
            const subject = new Subject();

            subject.start("");
            subject.finish(finishText);

            expect(Mocks.Ora.Mocks.succeed).toBeCalledWith(finishText);
        });
    });
});
