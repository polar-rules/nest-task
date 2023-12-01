import { _Types } from "./abstractions.types.js";

/**
 * Abstract class representing a file resolver.
 *
 * @abstract
 * @class _FileResolver
 */
export abstract class _FileResolver {
    /**
     * Creates an instance of `_FileResolver`.
     *
     * @constructor
     * @param {object} task - An object representing the approximate task for the file resolver.
     */
    public constructor(protected readonly task: _Types.FileResolver.ApproximateTask) {}

    /**
     * Abstract property representing the path of the resolved file.
     *
     * @abstract
     * @type {string}
     */
    public abstract get path(): string;

    /**
     * Abstract property representing the directory of the resolved file.
     *
     * @abstract
     * @type {string}
     */
    public abstract get directory(): string;
}
