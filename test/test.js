const console = require('../index');

console.log('log test', console);

console.addHeaderFunction((type) => `[MyPackage (${type})] `);
console.addHeaderFunction((type) => new Date().toString() + '\n');

console.debug('debug test', console);
console.log('log test', console);
console.info('info test', console);
console.warn('warn test', console);
console.error('error test', console);
console.stackTrace('stack test', console);
