import { createLogger } from 'vue-logger-plugin';

const logger = createLogger({
  level: 'debug',
  callerInfo: true,
  prefixFormat: ({ level }) => ( `${level}:` )
});

export default logger;
