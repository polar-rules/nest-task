import { Logger } from "@nestjs/common";

import { Interfaces } from "@interfaces/index.js";
import { Patches } from "@patches/index.js";
import { Errors } from "@errors/index.js";
import { Messages } from "@messages/index.js";

import { _Errors } from "./errors/index.js";
import { _Decorators } from "./decorators/index.js";
import { _Enums } from "./core.enums.js";
import { _Task } from "./core.task.js";
import { _ArgumentsManager } from "./core.arguments-manager.js";
import { _Perform } from "./core.perform.js";
import { _State } from "./core.state.js";

/**
 * Represents the core application class for the NestTask application.
 *
 * @class
 */
export class _App {
    /**
     * Array to store instances of tasks.
     *
     * @private
     * @type {_Task[]}
     */
    private tasks: _Task[] = [];

    /**
     * Logger instance for the application.
     *
     * @private
     * @type {Logger}
     */
    private readonly logger: Logger = new Logger("NestTask::Core::App");

    /**
     * Constructs a new instance of the _App class.
     *
     * @constructor
     */
    public constructor() {
        this.logger.log("Starting NestTask application...");
    }

    /**
     * Asynchronously runs the NestTask application.
     *
     * @async
     * @method
     * @returns {Promise<void>} A Promise that resolves when the application has completed running.
     */
    public async run(): Promise<void> {
        try {
            if (!this.tasks?.length) {
                throw new _Errors.NoTasksFound();
            }

            switch (_ArgumentsManager.runType) {
                case _Enums.RunTypes.Run:
                    await this.handleRun();
                    break;
                case _Enums.RunTypes.Info:
                    this.handleInfo();
                    break;
            }
        } catch (e: unknown) {
            if (Interfaces.InstanceOf<Errors.Base>(e, "custom")) {
                Messages.Errors.Prettify(e);
            }

            Messages.Errors.Unhandled(e);
        }
    }

    /**
     * Asynchronously loads tasks from a specified module.
     *
     * @async
     * @method
     * @param {Interfaces.General.AnyClass} module - The module from which to load tasks.
     * @returns {Promise<void>} A Promise that resolves when tasks are loaded.
     */
    public async load(module: Interfaces.General.AnyClass): Promise<void> {
        this.getTasks(module);

        for (const task of this.tasks) {
            const name = Patches.Reflect.getMetadata<string>(_Decorators.Enums.Metadata.Descriptable.Name, task);

            this.logger.log(`Tasks::Module is loading ${name}`);
        }

        this.logger.log("Tasks::Module tasks have been loaded");
    }

    /**
     * Retrieves tasks from a specified module and populates the tasks array.
     *
     * @method
     * @param {Interfaces.General.AnyClass} module - The module from which to retrieve tasks.
     * @private
     */
    private getTasks(module: Interfaces.General.AnyClass): void {
        const tasks =
            Patches.Reflect.getMetadata<Interfaces.General.AnyClass[]>(
                _Decorators.Enums.Metadata.Module.Tasks,
                module,
            ) ?? [];

        this.tasks = tasks.map((task: Interfaces.General.AnyClass): _Task => new _Task(task));
    }

    /**
     * Locates a task class based on the task name provided in command-line arguments.
     *
     * @method
     * @returns {_Task | undefined} The located task class or undefined if not found.
     * @private
     */
    private locateTaskClass(): _Task | undefined {
        return this.tasks.find((value: _Task): boolean => {
            const name = Patches.Reflect.getMetadata<string>(_Decorators.Enums.Metadata.Descriptable.Name, value.task);

            return name === _ArgumentsManager.taskName;
        });
    }

    /**
     * Handles the execution of tasks when the run type is set to "Run."
     *
     * @async
     * @method
     * @returns {Promise<void>} A Promise that resolves when the tasks have been executed.
     * @private
     */
    private async handleRun(): Promise<void> {
        const taskClass = this.locateTaskClass();

        if (!taskClass) {
            throw new _Errors.NoSpecificTaskFound(_ArgumentsManager.taskName);
        }

        const perform = new _Perform(taskClass);

        await perform.run();
    }

    /**
     * Handles the "Info" run type by updating the tasks list in the application state.
     *
     * @method
     * @private
     */
    private handleInfo(): void {
        _State.tasksList = this.tasks;
    }
}
