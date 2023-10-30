export class _TaskIsPresentInConfig extends Error {
    constructor() {
        super("The `task` key declaration is already present in `nest-cli.json`");
    }
}
