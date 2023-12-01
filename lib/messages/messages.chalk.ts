import * as chalk from "chalk";

/**
 * The `_Chalk` constant provides access to the `chalk` library for colorizing terminal output.
 * It checks if `chalk` is a function, and if not, it uses the default export from the library.
 * In purpose to detect CJS or ESM.
 * @constant {typeof chalk} _Chalk
 */
export const _Chalk: typeof chalk = typeof chalk === "function" ? chalk : (chalk as unknown as chalk.Default).default;
