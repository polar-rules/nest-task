export class _NoSpecificTaskFound extends Error {
    constructor(taskName: string) {
        super(`Unable to locate task with name: ${taskName}!`);
    }
}
