import { _Chalk } from "@messages/messages.chalk.js";

export function _Created(directories: string[]): void {
    console.info("The following directories were created:");

    for (const directory of directories) {
        console.info(_Chalk.gray(`- ${directory}`));
    }
}
