import { Cli } from "@cli/index.js";

describe("Cli::Dev::Generate::Assembler::Builder", (): void => {
    const Subject = Cli.Dev.Generate.Assembler.Builder;

    let fileLines: any;

    beforeEach(() => {
        fileLines = {
            imports: {
                folders: [],
                constants: [],
                types: [],
                files: [],
            },
            exports: {
                folders: [],
                constants: [],
                types: [],
                files: [],
            },
        };
    });

    describe("#folder", () => {
        it("Should add folder-related code to fileLines", (): void => {
            const subject = new Subject();

            const addFolder = subject.folder(fileLines);

            addFolder("exampleFolder");

            expect(fileLines.imports.folders.length).toBe(1);
        });
    });

    describe("#file", () => {
        it("Should add file-related code to fileLines when constants", (): void => {
            const subject = new Subject();

            const addFile = subject.file(fileLines);
            addFile("example.constants.ts");

            expect(fileLines.imports.files.length).toBe(1);
        });

        it("Should add file-related code to fileLines when types", (): void => {
            const subject = new Subject();

            const addFile = subject.file(fileLines);
            addFile("example.types.ts");

            expect(fileLines.imports.files.length).toBe(1);
        });

        it("Should add file-related code to fileLines when other", (): void => {
            const subject = new Subject();

            const addFile = subject.file(fileLines);
            addFile("example.other.ts");

            expect(fileLines.imports.files.length).toBe(1);
        });

        it("Should handle ignored files", (): void => {
            const subject = new Subject();

            const addFile = subject.file(fileLines);
            addFile("index.ts");

            expect(fileLines.imports.files.length).toBe(0);
        });
    });
});
