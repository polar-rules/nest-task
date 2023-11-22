

<p align="center">
    <img src="https://github.com/bear-hugs/nest-task/blob/main/assets/mascot.png?raw=true" width="120" alt="Nest Logo" />
</p>

<p align="center">
    The ultimate solution to execute simple tasks in <a href="https://github.com/nestjs/nest" target="_blank">Nest.js</a>
    environment fully supporting import of <a href="https://github.com/nestjs/nest" target="_blank">Nest.js</a> classes,
    basic tools and approaches.
</p>

<div style="margin: 0 auto; text-align: center;">
  <img src="https://github.com/bear-hugs/nest-task/actions/workflows/main.yml/badge.svg?branch=main" alt="Main" style="max-width: 100%;">
</div>

## Description

@bear-hugs/nest-task is the ultimate tool for generating and executing tasks within 
<a href="https://github.com/nestjs/nest" target="_blank">Nest.js</a> environment using it's 
classes, services, etc. We are fully following <a href="https://github.com/nestjs/nest" target="_blank">Nest.js</a>
conventions, rules and approaches to make our library as simple and as familiar as Nest.js itself.

Under the hood we are using the same tool set as <a href="https://github.com/nestjs/nest" target="_blank">Nest.js</a>
do: Reflect, class-transformer, class-validator, etc.

### Features

- **Easy Setup**: Quickly set up and integrate tasks within your Nest.js environment with a simple setup command.
- **Convention-based**: Follows Nest.js conventions and supports different file naming conventions for flexibility.
- **Interactive Assistant**: Use the interactive assistant (`jarvis`) for a more human-friendly and guided experience.
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

### Installation

Via `NPM`:

```Bash
npm install @bear-hugs/nest-task
```

Via `Yarn`:

```Bash
yarn add @bear-hugs/nest-task
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
npx nest-task jarvis
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
npx nest-task jarvis
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
npx nest-task jarvis
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
npx nest-task jarvis
```

## Documentation

### Nest integration

In purpose to integrate with Nest.js we modify `nest-cli.json` file located inside your root directory. We add 
key `task` in this file on top level. The object should have the following format:

`<root>/nest-cli.json`
```json
{
    "task": {
        "path": "src/tasks",
        "entryPoint": "main.ts",
        "convention": "kebab-case"
    }
}
```

Or if you use `projects` feature from Nest.js then your `nest-cli.json` should look like this:
`<root>/nest-cli.json`

```json
{
    "projects": {
        "example": {
            "task": {
                "path": "src/tasks",
                "entryPoint": "main.ts",
                "convention": "kebab-case"
            }
        }
    }
}
```

------------------------------

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
command. Available options are: `"camel-case"`, `"snake-case"`, `"kebab-case"` or `"bear-hugs"`.

------------------------------

### Entrypoint

Entrypoint file, `main.ts` it's similar to Nest.js `main.ts` file. Basically after you run `npx nest-task setup` you 
don't need to change it, except the cases when you want to use custom paths.

Its implementation is straight forward, and one time. You don't need make changes afterward.

`<root>/src/tasks/main.ts`
```Typescript
import { Factory } from "@bear-hugs/nest-task";

import { TasksModule } from "./tasks.module";

async function main(): Promise<void> {
    const app = await Factory.create(TasksModule);

    await app.run();
}

main();
```

The only thing that you can possibly would like to change here is path to `TasksModule` in case of custom setup.

### TasksModule

The implementation is close to Nest.js `@Module` implementation.

`<root>/src/tasks/tasks.module.ts`
```Typescript
import { Decorators } from "@bear-hugs/nest-task";

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
import { Decorators } from "@bear-hugs/nest-task";

import { AppModule } from "../../app.module";
import { AppService } from "../../app.service";

import { ExampleRunner } from "./example.runner";

@Decorators.Task({
    name: "Example",
    description: "Task created for demonstration how to create basic example of task",
    runner: ExampleRunner,
    module: AppModule,
    providers: [AppService],
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

Main Nest.js application module is required to correctly initialise Nest.js environment.

#### `providers`
Optional.

Array of Nest.js services, entities and just classes that you want to use withing task in a same way as you do this 
within `@Controller`, `@Injectable`, etc.

------------------------------

Defining `Runner` class.

`<root>/src/tasks/example/runner.task.ts`
```Typescript
import { INestApplication } from "@nestjs/common";

import { Decorators } from "@bear-hugs/nest-task";

import { ExampleDto } from "./example.dto";

@Decorators.Runner()
export class _Runner {
    public constructor(private readonly appService: AppService) {}
    
    public async perform(@Decorators.App() app: INestApplication, @Decorators.Arguments() args: ExampleDto): Promise<void> {
        // Your code goes here
    }
}
```
------------------------------

#### `providers`
Are matched from `@Decorators.Task` `providers` field into `constructor` by type. The same way as you do with Nest.js.

#### `app`
By using `@Decorators.App()` for an argument you can pass the Nest.js application variable.

#### `args`
If you need to pass additional arguments from command line to the task you can use `@Decorators.Arguments()` with `DTO`
in a same way as you do for Nest.js `@Controller`.

------------------------------

Defining `DTO` class.

`<root>/src/tasks/example/runner.dto.ts`
```Typescript
import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

import { Decorators } from "@bear-hugs/nest-task";

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

The same way that you do with Nest.js DTO.

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

## Contributing
We welcome contributions! Please read our [Contribution Guidelines](documentation/CONTRIBUTING.md) before submitting a pull request.

## Stay in touch

- Author - [Andrii Drozdov](https://github.com/d4ins)

## Acknowledgments

- The `@nestjs/cli` for providing a solid foundation for Nest.js projects.
- The `class-validator` and `class-transformer` for easy class validation

## License

@bear-hugs/nest-task is [MIT licensed](LICENSE).
