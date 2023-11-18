import { Errors } from "@errors/index.js";

export class _CannotResolveDependencies extends Errors.Base {
    constructor(index: number) {
        super(`Cannot resolve dependency for \`@Runner()\` at index \`${index}\`.`);
    }
}
