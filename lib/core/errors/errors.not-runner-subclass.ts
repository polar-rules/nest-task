export class _NotRunnerSubclass extends Error {
    constructor() {
        super(
            "Execution class is not inherited from `Runner::Base` class. Check your `runner` key in @Task definition",
        );
    }
}
