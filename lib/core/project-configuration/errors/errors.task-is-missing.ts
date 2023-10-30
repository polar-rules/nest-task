export class _TaskIsMissing extends Error {
    constructor() {
        super("The `task` key declaration is missing in `nest-cli.json`");
    }
}
