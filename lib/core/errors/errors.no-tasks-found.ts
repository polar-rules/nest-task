export class _NoTasksFound extends Error {
    constructor() {
        super("Unable to locate any tasks!");
    }
}
