# keypunch
NodeJS Logging Module without the fancy bits.

## Setup
`npm install keypunch --save`

```
const console = require('keypunch');
console.log("Hey it works!", "oh thats sick");
```

### Log Functions
`debug` - Logs all function arguments & a stack trace.

`log` - Logs all function arguments.

`info` - Logs all function arguments.

`warn` - Logs all function arguments.

`error`- Logs all function arguments.

`stackTrace` - Logs all function arguments & a stack trace.


### Log Levels
Each log function has an assigned level. When initiating your app remember to set the Keypunch log level.

```
const console = require('../index');
console.logLevel = 3;
...
console.debug("testing the request fired", req); // Won't fire a log message
```

`debug` - 1

`log` - 2

`info` - 3

`warn` - 4

`error`- 5

`stackTrace` - 5

### Message prefixing
Message output by themselves can often require more context. Keypunch lets you add your own functions to modify the start of a log message. Here are some examples,

```
console.addHeaderFunction((type) => `[MyPackage (${type})] `);
console.addHeaderFunction((type) => new Date().toString());
```
