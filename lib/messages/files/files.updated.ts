import { _Chalk } from "@messages/messages.chalk.js";

export function _Updated(files: string[]): void {
    console.info("We updated the following files:");

    for (const file of files) {
        console.info(_Chalk.gray(`- ${file}`));
    }
}
