import { Cli } from "@cli/index.js";

import { Mocks } from "@specs/mocks/index.js";

describe("Cli::Abstractions::Ora", (): void => {
    let subject: Cli.Abstractions.Ora;

    const Subject = Cli.Abstractions.Ora;

    beforeEach((): void => {
        subject = new Subject();
    });

    afterEach((): void => {
        Mocks.Ora.clean();
    });

    describe("#start", (): void => {
        it("Should start with specific text", (): void => {
            const startText = "Start!";

            subject.start(startText);
            expect(Mocks.Ora.Mocks.defaultBehaviour).toBeCalledWith({ text: startText });
        });

        it("Should call Ora#start method", (): void => {
            subject.start("");
            expect(Mocks.Ora.Mocks.start).toBeCalled();
        });
    });

    describe("#message", (): void => {
        it("Should call Ora#text method", (): void => {
            const messageText = "Message!";

            subject.start("");
            subject.message(messageText);

            expect(subject["ora"].text).toBe(messageText);
        });
    });

    describe("#finish", (): void => {
        it("Should call Ora#succeed method", (): void => {
            const finishText = "Done!";

            subject.start("");
            subject.finish(finishText);

            expect(Mocks.Ora.Mocks.succeed).toBeCalledWith(finishText);
        });
    });
});
