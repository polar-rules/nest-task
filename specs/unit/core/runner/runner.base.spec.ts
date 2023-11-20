import { INestApplication } from "@nestjs/common";

describe("Core::Runner::Base", (): void => {
    class Subject {
        public async perform(app: INestApplication): Promise<void> {
            app;
        }
    }

    describe("#perform", (): void => {
        it("Should be defined", (): void => {
            const subject = new Subject();
            expect(() => subject.perform(<any>undefined)).not.toThrow();
        });
    });
});
