import { _Types } from "./messages.types.js";
import { _Chalk } from "./messages.chalk.js";

export function _FoundTasks(tasks: _Types.FoundTasks.Options[]): void {
    console.info("We found the followings tasks:");

    for (const task of tasks) {
        console.info(_Chalk.grey("-"), _Chalk.white(task.name));
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
