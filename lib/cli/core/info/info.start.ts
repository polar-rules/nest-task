import { Core } from "@core/index.js";
import { Messages } from "@messages/index.js";
import { Interfaces } from "@interfaces/index.js";
import { Errors } from "@errors/index.js";

/**
 * Represents start of getting information about tasks
 *
 * @class _Start
 */
export class _Start {
    /**
     * Creates an instance of _Start.
     *
     * @param {string | undefined} projectName - The name of the project.
     */
    public constructor(private readonly projectName: string | undefined) {}

    /**
     * Runs the application and performs necessary tasks.
     *
     * @returns {Promise<void>} A Promise that resolves when the tasks are completed.
     */
    public async run(): Promise<void> {
        try {
            const loader = new Core.Loader(this.projectName);

            await loader.run();
        } catch (e: unknown) {
            if (Interfaces.InstanceOf<Errors.Base>(e, "custom")) {
                Messages.Errors.Prettify(e);
                process.exit(1);
            }

            Messages.Errors.Unhandled(e);
        }
    }
}
