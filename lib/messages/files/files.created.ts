import { _Chalk } from "@messages/messages.chalk.js";

export function _Created(files: string[]): void {
    console.info("The following files was created:");

    for (const file of files) {
        console.info(_Chalk.gray(`- ${file}`));
    }
}
