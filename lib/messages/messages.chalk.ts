import * as chalk from "chalk";

export const _Chalk: typeof chalk = typeof chalk === "function" ? chalk : (chalk as unknown as chalk.Default).default;
