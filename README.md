# tAsEgir

[![Travis CI](https://flat.badgen.net/travis/auhau/tasegir)](https://travis-ci.com/auhau/tasegir)
[![Dependency Status](https://david-dm.org/auhau/tasegir.svg?style=flat-square)](https://david-dm.org/auhau/tasegir)
[![Managed by tAsEgir](https://img.shields.io/badge/%20managed%20by-tasegir-blue)](https://github.com/auhau/tasegir)

> Automated TypeScript project management.

*Fork of [aegir](https://github.com/ipfs/aegir) specializing on TypeScript projects. Thanks [Protocol Labs](https://protocol.ai/) for all the work!* 

**Warning: this project is still in quite active transition phase to support TypeScript. Things might break, please report them!**

## Lead Maintainer

[Adam Uhlíř](https://github.com/AuHau)

## Table of Content

## Overview

tasegir tries to be the only toolkit you need for TypeScript development, but different people may have different needs, it has to stay 
flexible to give space to customization without big complexity. It is by default biased, but if you want you can customize a lot of behavior for price of extra work.

The flexibility goal is achieved through two concepts: tasks and targets. 
Tasks are tightly linked to what tasegir do. While targets are environments where these tasks are executed. 
There might be tasks that do not have any target linked.

### Supported tasks and targets  

Overview of tasks:

 - Target specific tasks
    - `run`: executes a given file or  entrypoint in specified or default environment
    - `build`: builds artifacts for each enabled target (for example browser bundle, compile TS files etc)
    - `test`: run tests for each enabled target
 - General tasks
    - `lint`: lint the code and other project's components (for example `package.json`)
    - `types-check`: perform types check on the TypeScript code
    - `release`: release a new version of the package
    - `docs`: generates documentation  

Overview of tasks that depend on target:

| Task | NodeJS | Browser | React | Electron | 
| ---- | ------ | ------- | ----- | -------- |
| `run` | ✔ | ✔ | ✔ | ✔ |
| `build` | ✔ | ✔ | ✔ | ✔ |
| `test` | ✔ | ✔ | ✔ | ✔ |

### Conventions

tasegir brings you lot of goodies for free, but it also expects that you follow some conventions:

 - Source code
    - All source code placed in `/src`
    - Code written in TypeScript using Ecmascript modules
    - If you need to use custom typings they have to be placed in `/src/@types/` folder
 - Tests
    - Tests placed in `/test`
    - General cross-target tests written in files `*.spec.ts`
    - Target custom tests placed in the target's file (eq. Node only in `node.ts`, browser only in `browser.ts`)

## Commands

### `init`

Initialize usage of tasegir for the current repository. As part of this setup it will:

 - add tasegir as dev dependency
 - add tasegir's targets packages based on user's selection
 - (optional) add Git hooks
 - (optional) create symlinks to configuration files (like `tsconfig.json` etc) for IDE support  

### `ci`

Generates configurations for CI support. Currently, supported providers are: CircleCI and Travis.

#### Parameters

 - `--update` (`boolean`): updates the provider's configuration to the latest template's version  

### `run`
TODO

### `build`
TODO

### `test`
TODO

### `lint`
TODO

### `types-check`
TODO

### `release`

#### Supported configurations

```ts
// TODO: WIP
interface ReleaseConfiguration {

  /**
   * Specifies if the documentation should be generated prior release
   * @default true
   */
  docs: boolean
}
```

### `docs`
TODO

## Customization

tasegir's main vision is to provide a working toolkit from the point you install it, therefore it brings bias into
the configuration and dependencies used. In the same time it supports high level of customization, so in case of need you can
tweak it to your vision and needs. **Currently, it is possible to customize the configuration of the tools used, not the tools themselves.**  

There are few levels on how you can customize tasegir's behavior:

 - local configuration in `.tasegir.ts`
 - custom targets packages
 - custom configuration packages

### Custom targets packages

You can create your own targets (share them with the community!).

Create a package and in its `package.json` create `tasegir` section that has following schema:

```ts
interface TasegirCustomPackage {
  type: 'target'

  /**
   * Specifies which tasks are supported by the target
   */
  tasks: Array<'run' | 'test' | 'build'>

  /**
   * Semver version range of what tasegir's version is supported 
   */
  supportedVersion: string
}
``` 

The `main` file specified in the `package.json` then will be called upon invocation of the supported task. It should follow this schema:

```ts
// TODO: WIP
export default async function (task: 'run' | 'test' | 'build', cwd: string): Promise<void>  {
  ...
}
```

### Custom configuration packages

If you create your custom configuration for the tools, you might want to manage it separately for example when you have 
multiple projects where you use this configuration. You can then create a custom package where you extract all the configuration into.

Create a package and in the `package.json` create `tasegir` section that has following schema:

```ts
interface TasegirCustomConfiguration {
  type: 'config'
  extends?: string // You can link another package that this package extends 
  supportedVersion: string // Semver version range of what tasegir's version is supported
}
```

Then the package should have following structure:

```
.
├── configs
│   ├── babelrc.js
│   ├── eslintrc.js
│   ├── global.js
│   ├── karma-entry.js
│   ├── karma.conf.js
│   ├── tsconfig.js
│   ├── tsconfig.json
│   └── webpack.config.js
└── templates
    ├── ci
    │   ├── circleci.ts
    │   └── travis.ts
    └── docs
        └── home.md.ts
```

**NOTE: All files are optional, if not specified then tasegir's defaults are used.** 

## License

MIT
