import { Errors } from "@errors/index.js";

export class _MissingProjectConfiguration extends Errors.Base {
    constructor(projectName: string) {
        super(`Provided project name: \`${projectName}\` is missing inside of \`nest-cli.json\`.`);
    }
}
