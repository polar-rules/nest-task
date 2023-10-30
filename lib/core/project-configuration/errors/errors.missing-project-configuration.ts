export class _MissingProjectConfiguration extends Error {
    constructor(projectName: string) {
        super(`Provided project name: ${projectName} is missing inside of \`nest-cli.json\``);
    }
}
