import { Errors } from "@errors/index.js";

export class _NoSpecificTaskFound extends Errors.Base {
    constructor(taskName: string) {
        super(`Unable to locate task with name: \`${taskName}\`!`);
    }
}
