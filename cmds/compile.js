'use strict'

const compile = require('../src/compile')

const EPILOG = `
Supports options forwarding with '--' for more info check https://www.typescriptlang.org/docs/handbook/compiler-options.html
`

module.exports = {
  command: 'compile',
  desc: 'Compile TypeScript to JavaScript',
  builder: (yargs) => {
    yargs
      .options({
        declarations: {
          alias: 'd',
          type: 'boolean',
          describe: 'Should by types declarations be output to "types" folder.',
          default: false
        }
      })
      .epilog(EPILOG)
      .example('npx tasegir compile -- --watch', 'To continuously watch changes.')
  },
  handler (argv) {
    return compile(argv)
  }
}
