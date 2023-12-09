import { Cli } from "@cli/index.js";
import { Errors } from "@errors/index.js";

describe("Core::Errors::NoFactoryFound", (): void => {
    const Subject = Cli.Dev.Generate.Assembler.Errors.MissingName;

    it("Should be an instance of Errors.Base", (): void => {
        const error = new Subject();
        expect(error).toBeInstanceOf(Errors.Base);
    });

    it("Should have the correct error message", (): void => {
        const error = new Subject();
        const expectations = "Could not retrieve the module name while executing the script!";

        expect(error.message).toBe(expectations);
    });
});
