const C = console;

const SEVERE = { key: 'SEVERE', level: 0 };
const WARNING = { key: 'WARNING', level: SEVERE.level + 1 };
const INFO = { key: 'INFO', level: WARNING.level + 1 };
const DEBUG = { key: 'DEBUG', level: INFO.level + 1 };
const TRACE = { key: 'DEBUG', level: DEBUG.level + 1 };

const logLevel = DEBUG.level;

class Logger {
  static severe(args) {
    this.logs(SEVERE, args);
  }

  static warn(args) {
    this.logs(WARNING, args);
  }

  static info(args) {
    this.logs(INFO, args);
  }

  static debug(args) {
    this.logs(DEBUG, args);
  }

  static trace(args) {
    this.logs(TRACE, args);
  }

  static logs(level, args) {
    if (logLevel >= level.level) {
      C.log(`[${level.key}]`, args);
    }
  }
}

export default Logger;
