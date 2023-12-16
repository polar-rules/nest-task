import path from "node:path";

export namespace _Constants {
    export namespace Project {
        export const sampleDirectory: Readonly<string> = "sample-projects";
    }

    export namespace Folders {
        export const specs: Readonly<string> = "specs";

        export const tmp: Readonly<string> = path.join(specs, "tmp");
    }
}
