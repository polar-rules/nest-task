import { _Types } from "./messages.types.js";
import { _Chalk } from "./messages.chalk.js";

/**
 * Displays information about found tasks, including their names, descriptions, and expected arguments.
 *
 * @function _FoundTasks
 * @param {Array<_Types.FoundTasks.Options>} tasks - An array of objects representing found tasks.
 * @returns {void}
 */
export function _FoundTasks(tasks: _Types.FoundTasks.Options[]): void {
    console.info("We found the followings tasks:");

    for (const task of tasks) {
        console.info("-", task.name);
        console.info(_Chalk.grey(`  ${task.description}`));

        if (!task.args?.length) {
            continue;
        }

        console.info("  Expected the following arguments:");

        for (const arg of task.args) {
            console.info(_Chalk.grey(`    - ${arg.name} : ${arg.type}`));
        }
    }
}
