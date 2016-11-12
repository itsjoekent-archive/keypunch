"use strict";

const colors = require('colors/safe');

const logLevels = {
  debug: {
    level: 1,
    color: 'cyan'
  },
  log: {
    level: 2,
    color: 'blue'
  },
  info: {
    level: 3,
    color: 'green'
  },
  warn: {
    level: 4,
    color: 'yellow'
  },
  error: {
    level: 5,
    color: 'red'
  },
  stackTrace: {
    level: 5,
    color: 'red'
  }
}

const headerGenerators = [];

/**
 * Should we output a log for the given log level & type?
 * @param  {int} logLevel - Log level to compare for.
 * @param  {string} type - Type to compare against.
 * @return {boolean}
 */
function shouldLog(logLevel, type) {
  return logLevels[type].level >= logLevel;
}

/**
 * Generate a log header from the arguments supplied.
 * @return {string}
 */
function generateLogHeader(type) {
  let header = '';
  headerGenerators.forEach(generator => header += generator(type));
  header += '\n';
  return colors[logLevels[type].color](header);
}

const gatewayConsole = {
  logLevel: 1,

  /**
   * Add a function which runs on every log.
   * Suplied function should return a string.
   * @param {Function} fn - Function that generates a string.
   */
  addHeaderFunction(fn) {
    if (typeof fn !== 'function') return;
    headerGenerators.push(fn);
  },

  /**
   * Generate a log message with the level of debug.
   * @param {*} - All parameters passed in will be logged.
   */
  debug() {
    const type = 'debug'
    if (!shouldLog(this.logLevel, type)) return;

    console.trace(generateLogHeader(type), ...arguments);
  },

  /**
   * Generate a log message with the level of log.
   * @param {*} - All parameters passed in will be logged.
   */
  log() {
    const type = 'log'
    if (!shouldLog(this.logLevel, type)) return;

    console.log(generateLogHeader(type), ...arguments);
  },

  /**
   * Generate a log message with the level of info.
   * @param {*} - All parameters passed in will be logged.
   */
  info() {
    const type = 'info'
    if (!shouldLog(this.logLevel, type)) return;

    console.info(generateLogHeader(type), ...arguments);
  },

  /**
   * Generate a log message with the level of warning.
   * @param {*} - All parameters passed in will be logged.
   */
  warn() {
    const type = 'warn'
    if (!shouldLog(this.logLevel, type)) return;

    console.warn(generateLogHeader(type), ...arguments);
  },

  /**
   * Generate a log message with the level of error.
   * @param {*} - All parameters passed in will be logged.
   */
  error() {
    const type = 'error'
    if (!shouldLog(this.logLevel, type)) return;

    console.error(generateLogHeader(type), ...arguments);
  },

  /**
   * Generates a stack trace & a log message with the level of error.
   * @param {*} - All parameters passed in will be logged.
   */
  stackTrace() {
    const type = 'stackTrace'
    if (!shouldLog(this.logLevel, type)) return;

    this.error(...arguments);

    const stack = new Error().stack;
    const stackLog = stack.error ? stack.error : stack;
    console.error(stackLog);
  }
}

module.exports = gatewayConsole;
