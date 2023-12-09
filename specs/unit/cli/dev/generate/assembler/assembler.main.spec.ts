import { Cli } from "@cli/index.js";
import { Mocks } from "@specs/mocks/index.js";

describe("Cli::Dev::Generate::Assembler::Main", (): void => {
    const Subject = Cli.Dev.Generate.Assembler.Main;

    beforeEach((): void => {
        Mocks.Fs.merge(Mocks.Templates.mockAssemblerMerge(), {
            [Cli.Dev.Generate.Assembler.Constants.Directories.Paths.lib]: {
                rootDirectory: {},
            },
            [Cli.Dev.Generate.Assembler.Constants.Directories.Paths.specs]: {
                specsRootDirectory: {},
            },
        });
    });

    afterEach((): void => {
        Mocks.Ora.clean();
    });

    describe("#topLevelDirectories", (): void => {
        it("Should return an array of top-level directories", async (): Promise<void> => {
            const subject = new Subject();
            const directories = await subject.topLevelDirectories();

            expect((<any>directories.at(0)).endsWith("rootDirectory")).toBeTruthy();
        });
    });
});
