import { createLogger } from 'vue-logger-plugin';

const logger = createLogger({
  level: 'debug',
  callerInfo: true,
  prefixFormat: ({ level, caller }) => (
    caller ? `${level}: [${caller.fileName}]` : `${level}: [...]`
  )
});

export default logger;
