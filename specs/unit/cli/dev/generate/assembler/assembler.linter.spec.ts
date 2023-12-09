import { Cli } from "@cli/index.js";

describe("Cli::Dev::Generate::Assembler::Linter", (): void => {
    const Subject = Cli.Dev.Generate.Assembler.Linter;

    describe("format", () => {
        it("should format code using ESLint and Prettier", async () => {
            const subject = new Subject();

            const code = "const   example   =  42 ;";
            const filePath = "/path/to/file.js";

            const formattedCode = await subject.format(code, filePath);

            expect(formattedCode).not.toEqual(code);
        });

        it("should return undefined for code with ESLint issues", async () => {
            const subject = new Subject();

            const codeWithIssues = "const example = 42;";
            const filePath = "/path/to/file.js";

            const formattedCode = await subject.format(codeWithIssues, filePath);

            expect(formattedCode).toBeUndefined();
        });
    });
});
