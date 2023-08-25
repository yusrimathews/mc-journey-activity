const ACTIVITY_NAME = process.env.ACTIVITY_NAME;
const ACTIVITY_TIMEOUT = process.env.ACTIVITY_TIMEOUT || 20000;
const ACTIVITY_RETRY_COUNT = process.env.ACTIVITY_RETRY_COUNT || 0;
const ACTIVITY_RETRY_DELAY = process.env.ACTIVITY_RETRY_DELAY || 1000;
const ACTIVITY_CONCURRENT_REQUESTS = process.env.ACTIVITY_CONCURRENT_REQUESTS || 5;
const ACTIVITY_BASE_URL = process.env.ACTIVITY_BASE_URL;

const json = {
  workflowApiVersion: '1.1',
  metaData: {
    category: 'custom'
  },
  type: 'REST',
  lang: {
    'en-US': {
      name: ACTIVITY_NAME,
      description: 'Sample Marketing Cloud Journey Builder Activity'
    }
  },
  arguments: {
    execute: {
      timeout: ACTIVITY_TIMEOUT,
      retryCount: ACTIVITY_RETRY_COUNT,
      retryDelay: ACTIVITY_RETRY_DELAY,
      concurrentRequests : ACTIVITY_CONCURRENT_REQUESTS,
      url: `${ACTIVITY_BASE_URL}/execute`
    }
  },
  configurationArguments: {
    publish: {
      url: `${ACTIVITY_BASE_URL}/publish`
    }
  },
  userInterfaces: {
    configModal: {
      url: `${ACTIVITY_BASE_URL}/`
    },
    runningHover: {
      url: `${ACTIVITY_BASE_URL}/hover`
    },
    runningModal: {
      url: `${ACTIVITY_BASE_URL}/modal`
    }
  }
}

module.exports = (req, res) => {
  res.json(json);
}
