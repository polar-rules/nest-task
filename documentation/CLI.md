# Documentation

---

## CLI

`@bear-hugs/nest-task` is supplied with 2 versions of CLI, basic commands and interactive assistant.

---

### Basic syntax:

`nest-task <command> --<argument-name> <argument-value>`

For example:

`nest-task info --project-name example`

---

### Commands:

#### `help`
List of available commands, AKA this prompt

#### `jarvis`
Interactive assistant. Can perform the same actions as basic commands but in more human friendly way.

#### `info`
Provide a list of tasks names and description.

##### Arguments:
- `project-name` Optional. In case your `nest-cli.json` have `projects` key defined.

#### `run`
Execute the task, can be found by name

##### Arguments:
- `project-name` Optional. In case your `nest-cli.json` have `projects` key defined. This argument should come first before
  name of the task
- `other-arguments` Optional. In case your you need to pass additional arguments to your task you can easily
  achieve this with same syntax as you pass `name` or `project-name`
    - For example: `--userId 3 --bio "I'm awesome"`
- `name` Required. Name of the task defined in `@Decorators.Task` `name` key

#### `create`
Run this command as a generator to create task boilerplate, that includes `@Decorators.Runner` and `@Decorators.Task`.

##### Arguments:
- `project-name` Optional. In case your `nest-cli.json` have `projects` key defined.
- `name` Required. Expect to receive a task name, which should converted to file name and class name.
- `description` Required. Short description of task. In case if it's a long sentence use `"` to screen it.
    - For example: `--description "The task example"`

#### `setup`
Used in purpose to run first initial setup of the @bear-hugs/nest-task. Performs 3 basic actions: modify
`nest-cli.json`, creates an entrypoint for tasks to run and creates an example of task.
- `project-name` Optional. In case your `nest-cli.json` have `projects` key defined.
- `convention` Required. Specify naming convention for files and classes. Options are `camel-case`, `snake-case`, `kebab-case`, `bear-hugs`
    - `camel-case` - tells us to create files with camel case convention. For example: `camelCase.example.ts`
    - `snake-case` - tells us to create files with snake case convention. For example: `snake_case.example.ts`
    - `kebab-case` - tells us to create files with camel case convention. For example: `kebab-case.example.ts`
    - `bear-hugs` - combination of kebab case and specific 
