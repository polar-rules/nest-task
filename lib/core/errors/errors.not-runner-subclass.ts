import { Errors } from "@errors/index.js";

export class _NotRunnerSubclass extends Errors.Base {
    constructor() {
        super(
            "Execution class is not inherited from `Abstractions::Runner` class. Check your `runner` key in `@Task` definition",
        );
    }
}
