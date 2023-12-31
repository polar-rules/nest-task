

<p align="center">
    <img src="https://github.com/polar-rules/nest-task/blob/main/assets/mascot.png?raw=true" width="120" alt="Nest Logo" />
</p>

<p align="center">
    The ultimate solution to execute simple tasks in <a href="https://github.com/nestjs/nest" target="_blank">Nest.js</a>
    environment fully supporting import of <a href="https://github.com/nestjs/nest" target="_blank">Nest.js</a> classes,
    basic tools and approaches.
</p>

<p align="center">
  <img src="https://github.com/polar-rules/nest-task/actions/workflows/branch-main.yml/badge.svg?branch=main" alt="Main" style="max-width: 100%;">
  <a href="https://www.npmjs.com/package/@polar-rules/nest-task?activeTab=versions" target="_blank"><img src="https://img.shields.io/github/release/polar-rules/nest-task?include_prereleases=&sort=semver&color=blue" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/@polar-rules/nest-task?activeTab=versions" target="_blank"><img src="https://img.shields.io/badge/License-MIT-pink" alt="Package License" /></a>
</p>

<p align="center">
  <a href="https://github.com/polar-rules/nest-task/actions" target="_blank"><img src="https://polar-rules.github.io/nest-task/assets/badges/coverage.svg" alt="Coverage" /></a>
</p>

## Preview

<div align="center">
  <div style="display: inline-block; text-align: center;">
    <p><strong>List tasks:</strong></p>
    <img src="https://github.com/polar-rules/nest-task/blob/main/assets/nest-task-list.gif?raw=true" width="800" />
  </div>
  <div style="display: inline-block; text-align: center;">
    <p><strong>Call task:</strong></p>
    <img src="https://github.com/polar-rules/nest-task/blob/main/assets/nest-task-run.gif?raw=true" width="800" /> 
  </div>
</div>

## Description

[`@polar-rules/nest-task`](https://github.com/polar-rules/nest-task) is the ultimate tool for generating and executing tasks within 
<a href="https://github.com/nestjs/nest" target="_blank">Nest.js</a> environment using its 
classes, services, etc. We are fully following <a href="https://github.com/nestjs/nest" target="_blank">Nest.js</a>
conventions, rules and approaches to make our library as simple and as familiar as <a href="https://github.com/nestjs/nest" target="_blank">Nest.js</a>  itself.

Under the hood we are using the same tool set as <a href="https://github.com/nestjs/nest" target="_blank">Nest.js</a>
do: Reflect, class-transformer, class-validator, etc.

More documentation can be found on our [website](https://polar-rules.github.io/nest-task/).

### Features

- **Easy Setup**: Quickly set up and integrate tasks within your Nest.js environment with a simple setup command.
- **Support ESM & CJS**: Fully support latest modules, `CJS` and `ESM`.
- **Convention-based**: Follows Nest.js conventions and supports different file naming conventions for flexibility.
- **Interactive Assistant**: Use the interactive assistant (`bear`) for a more human-friendly and guided experience.
- **CLI Commands**: Execute a variety of commands for task creation, information retrieval, and task execution.
- **Documentation**: Well-documented with examples and explanations to guide users through the process.

### Table of content

- [Getting started](#getting-started)
  - [Installation](#installation)
  - [Help](#help)
  - [Guides](#guides)
  - [Creating task](#creating-task)
  - [Receiving the list of tasks](#receiving-the-list-of-tasks)
  - [Running task](#running-task)
- [Documentation](#documentation)
  - [Nest integration](#nest-integration)
  - [Entrypoint](#entrypoint)
  - [TasksModule](#tasksmodule)
  - [Task](#task)
- [CLI](#cli)
- [Issues](#issues)
- [Contributing](#contributing)
- [Stay in touch](#stay-in-touch)
- [Acknowledgments](#acknowledgments)
- [License](#license)

## Getting started

### Nest.js version

At this point we support only 10.x.x version of Nest.js (at least this is the version that is fully tested), however
this package should theoretically work with 9.x.x and lower, but it wasn't tested.

### Installation

Via `NPM`:

```Bash
npm install @polar-rules/nest-task
```

Via `Yarn`:

```Bash
yarn add @polar-rules/nest-task
```

### Help

From command line you can call help prompt to receive a list of available commands:
```Bash
npx nest-task help
```

### Guides

Once you've installed you will have available `nest-task` binary available to run. We recommend you to run `npx` to run
binary, but you choose whatever suits you the best.

Now you need to run:

```Bash
npx nest-task setup --convention kebab-case
```

In case you have `project` key inside your `nest-cli.json` you need to add `--project-name` flag and specify project 
name. For example:
```Bash
npx nest-task setup --project-name <project> --convention kebab-case
```

Or run interactive assistant and pick `Setup` option, and then just follow installation steps:
```Bash
npx nest-task bear
```

This action will do the following:
- modify the `nest-cli.json` and create new key `task` there
- create the folder `tasks` under `src`
- create `main.ts` and `tasks.module.ts`
- create a simple `example` task for education purposes

### Creating task

To create a task you need to run:
```Bash
npx nest-task create --name <name> --description <description>
```

Or if you have `project` key inside your `nest-cli.json` you need to add `--project-name` flag and specify project
name.
```Bash
npx nest-task create --project-name <project> --name <name> --description <description>
```

You can run interactive assistant and pick `create` option and just follow proposed steps to generate task:
```Bash
npx nest-task bear
```

### Receiving the list of tasks

**IMPORTANT.** In purpose for your tasks run correctly you need to build your project firstly.

To receive a list of tasks
```Bash
npx nest-task info
```

Or if you have `project` key inside your `nest-cli.json` you need to add `--project-name` flag and specify project
name.
```Bash
npx nest-task info --project-name <project>
```

You can run interactive assistant and pick `info` option and just follow proposed steps to generate task:
```Bash
npx nest-task bear
```

### Running task

**IMPORTANT.** In purpose for your tasks run correctly you need to build your project firstly.

To create a task you need to run:
```Bash
npx nest-task run --name <name> <other-arguments>
```

Or if you have `project` key inside your `nest-cli.json` you need to add `--project-name` flag and specify project
name.
```Bash
npx nest-task run --project-name <project> --name <name> <other-arguments>
```

You can run interactive assistant and pick `run` option and just follow proposed steps to generate task:
```Bash
npx nest-task bear
```

### Running task without CLI

Yes, starting from `0.2.0` you can run tasks without CLI and directly using `node` command totally bypassing the case
when default Nest.js configuration is not available. All you need to do is to call compiled `main.js` file with correct
arguments.

_Note_: In case you don't have `package.json` or for some reason you're missing `nest-cli.json` on your server
youre force to run this commands directly.

To pass arguments you need literally to do the same thing as you do with default CLI command.

For example:

```Bash
node ./dist/task/main.js --name <name> <other-arguments>
```

Since you're calling `main.ts` file directly you don't need to handle project name at all, since we assume that you're
that location of `main.js` already in default or under correct directory.

If you want to pass additional arguments, it's easy to do with the following syntax:

```Bash
node ./dist/task/main.js --name <name> --argument1 value
```

_Note_:
`--argument1` - can have any desired name, except pre-defined fields, like `name`, `projectName` and other.

## Documentation

### Nest integration

In purpose to integrate with <a href="https://github.com/nestjs/nest" target="_blank">Nest.js</a> we modify `nest-cli.json` file located inside your root directory. We add 
key `task` in this file on top level. The object should have the following format:

`<root>/nest-cli.json`
```json
{
    "task": {
        "path": "src/tasks",
        "entryPoint": "main.ts",
        "convention": "kebab-case",
        "distDirectory": "dist"
    }
}
```

Or if you use `projects` feature from <a href="https://github.com/nestjs/nest" target="_blank">Nest.js</a> then your `nest-cli.json` should look like this:
`<root>/nest-cli.json`

```json
{
    "projects": {
        "example": {
            "task": {
                "path": "src/tasks",
                "entryPoint": "main.ts",
                "convention": "kebab-case",
                "distDirectory": "dist"
            }
        }
    }
}
```

------------------------------

#### `distDirectory`
Optional.

By default, we assume that your script is compiled to the `"dist"` directory.

So for example, in default setup, you use your `"dist"` folder as compiled folder. This is basically where we will be
looking for tasks when you're using CLI. (This will be ignored when you're using `node` command on entrypoint directly).

But, sometimes your configuration on server may be a bit different, since sometimes you're deploying your project as is, which may
include you dist folder, and in this case you don't need to do anything, but there may the cases when transpiled
code is located in other directory (not the on that is mentioned in `tsconfig`). So in this case we will recommend you
to use specific path to this directory.

We're heavy really on `package.json` location and build our path to task from `package.json` and we assume that this 
is the project root. Then we will use `distDirectory` as a next folder from there.

For example this is how we build path `<package.json root folder>/${distDirectory}/${path.replace("src", "")/${entryPoint}}`

#### `path`
Required.

Refers to directory where tasks will be held. By default, we set it to `src/tasks` but you're free to
change it to another directory as you will.

#### `entryPoint`
Required. 

The main file name entrypoint should be present here, this file should be present with in 
directory specified in `path` key. 

#### `conventions` 
Required.

Directive the specifies what kind of file naming convention we should use when using `create`
command. Available options are: `"camel-case"`, `"snake-case"`, `"kebab-case"` or `"polar-rules"`.

------------------------------

### Entrypoint

Entrypoint file, `main.ts` it's similar to <a href="https://github.com/nestjs/nest" target="_blank">Nest.js</a> `main.ts` file. Basically after you run `npx nest-task setup` you 
don't need to change it, except the cases when you want to use custom paths.

Its implementation is straight forward, and one time. You don't need make changes afterward.

`<root>/src/tasks/main.ts`
```Typescript
import { Factory } from "@polar-rules/nest-task";

import { TasksModule } from "./tasks.module";

async function main(): Promise<void> {
    const app = await Factory.create(TasksModule);

    await app.run();
}

main();
```

The only thing that you can possibly would like to change here is path to `TasksModule` in case of custom setup.

### TasksModule

The implementation is close to <a href="https://github.com/nestjs/nest" target="_blank">Nest.js</a> `@Module` implementation.

`<root>/src/tasks/tasks.module.ts`
```Typescript
import { Decorators } from "@polar-rules/nest-task";

import { ExampleTask } from "./example/example.task";

@Decorators.Module({
    tasks: [
        ExampleTask,
    ],
})
export class _Module {}
```

------------------------

#### `tasks`
Required.

Array of `Task` classes.

------------------------------

### Task

Defining `Task` class.

`<root>/src/tasks/example/example.task.ts`
```Typescript
import { Decorators } from "@polar-rules/nest-task";

import { AppModule } from "../../app.module";
import { AppService } from "../../app.service";

import { ExampleRunner } from "./example.runner";

@Decorators.Task({
    name: "Example",
    description: "Task created for demonstration how to create basic example of task",
    runner: ExampleRunner,
    module: AppModule,
    providers: [AppService],
    deprecated: false,
})
export class ExampleTask {}
```

------------------------------

Overall, you already familiar with the syntax of this approach.

#### `name`
Required.

Unique.

Name of the tasks. Should be unique for `@Decorators.Module`. Used to located task, provider information about the task.

#### `description`
Required.

Short description of the task. Even if we do not have any limitation for length, we still recommend to keep it simple
as possible.

#### `runner`
Required.

Your `@Decorators.Runner` class that will be covered in the next step. This class wil be the only class that will be 
executed by the task.

#### `module`
Required.

Main <a href="https://github.com/nestjs/nest" target="_blank">Nest.js</a> application module is required to correctly initialise <a href="https://github.com/nestjs/nest" target="_blank">Nest.js</a> environment.

#### `providers`
Optional.

Array of <a href="https://github.com/nestjs/nest" target="_blank">Nest.js</a> services, entities and just classes that you want to use withing task in a same way as you do this 
within `@Controller`, `@Injectable`, etc.

#### `deprecated`
Optional.

Boolean value. Literally a flag that blocks you from running the task. Useful in cases when your task is meant to be run
only one time and you want to avoid issues with running it second time.

------------------------------

Defining `Runner` class.

`<root>/src/tasks/example/example.runner.ts`
```Typescript
import { INestApplication, Logger } from "@nestjs/common";

import { Decorators } from "@polar-rules/nest-task";

import { ExampleDto } from "./example.dto";

@Decorators.Runner()
export class _Runner {
    public constructor(private readonly appService: AppService) {}
    
    public async perform(@Decorators.App() app: INestApplication, @Decorators.Logger() logger: Logger, @Decorators.Arguments() args: ExampleDto): Promise<void> {
        // Your code goes here
    }
}
```
------------------------------

#### `providers`
Are matched from `@Decorators.Task` `providers` field into `constructor` by type. The same way as you do with <a href="https://github.com/nestjs/nest" target="_blank">Nest.js</a>.

#### `app`
By using `@Decorators.App()` for an argument you can pass the <a href="https://github.com/nestjs/nest" target="_blank">Nest.js</a> application variable.

#### `logger`
By using `@Decorators.Logger()` for an argument you can pass the <a href="https://github.com/nestjs/nest" target="_blank">Nest.js</a> default logger.

Now you can use as you would use default logger that is coming from <a href="https://github.com/nestjs/nest" target="_blank">Nest.js</a>.
```typescript
logger.log("Example")
```

#### `args`
If you need to pass additional arguments from command line to the task you can use `@Decorators.Arguments()` with `DTO`
in a same way as you do for <a href="https://github.com/nestjs/nest" target="_blank">Nest.js</a> `@Controller`.

------------------------------

Defining `DTO` class.

`<root>/src/tasks/example/example.dto.ts`
```Typescript
import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

import { Decorators } from "@polar-rules/nest-task";

export class ExampleDto {
    @Decorators.Property()
    @Type(() => String)
    @IsString()
    data: string;

    @Decorators.Property()
    @Type(() => IsNumber)
    @IsNumber()
    userId: number;
}
```

The same way that you do with <a href="https://github.com/nestjs/nest" target="_blank">Nest.js</a> DTO.

**However**

Even due `class-transformer` library do support complex types, as array, object, etc. And theoretically we can do this
too, but we still recommend to use simple primitive types like:
- string
- number
- boolean
- null
- undefined

If you want to use more complex type we recommend to use string and JSON combination.

class and variable naming.

## CLI

More details CLI documentation you can read [CLI Documentation](documentation/CLI.md) section.

## Issues

Please make sure to read the [Issue Reporting Checklist](https://github.com/nestjs/nest/blob/master/CONTRIBUTING.md#-submitting-an-issue)
before opening an issue. Issues not conforming to the guidelines may be closed immediately.

- We're heavy really on `package.json` location and build our path to task from `package.json` and we assume that this
is the project root, when you're using our CLI, hence do development be sure that you have package.json inside your
project. Same rules applied when you're running our CLI on server that's why you need to be sure that you have `package.json`
on your server, if you want to use CLI. In case, for some reason you don't have `package.json` on server - then
you can run your tasks with `node entrypoint.js` command.

## Contributing
We welcome contributions! Please read our [Contribution Guidelines](CONTRIBUTING.md) before submitting a pull request.

## Stay in touch

- Author - [Andrii Drozdov](https://github.com/d4ins)

## Acknowledgments

- The `@nestjs/cli` for providing a solid foundation for <a href="https://github.com/nestjs/nest" target="_blank">Nest.js</a> projects.
- The `class-validator` and `class-transformer` for easy class validation

## License

Released under [MIT](/LICENSE) by [@polar-rules](https://github.com/polar-rules).
