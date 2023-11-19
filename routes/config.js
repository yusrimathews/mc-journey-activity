// Required environment variables
const VUE_APP_TITLE = process.env.VUE_APP_TITLE;
const VUE_APP_URL = process.env.VUE_APP_URL.replace(/\/+$/, '');

// Optional environment variables
const JB_TIMEOUT = process.env.JB_TIMEOUT || 20000;
const JB_RETRY_COUNT = process.env.JB_RETRY_COUNT || 0;
const JB_RETRY_DELAY = process.env.JB_RETRY_DELAY || 1000;
const JB_CONCURRENT_REQUESTS = process.env.JB_CONCURRENT_REQUESTS || 5;

// Configuration definition
const json = {
  workflowApiVersion: '1.1',
  metaData: {
    category: 'custom'
  },
  type: 'REST',
  lang: {
    'en-US': {
      name: VUE_APP_TITLE,
      description: 'Sample Marketing Cloud Journey Builder Activity'
    }
  },
  arguments: {
    execute: {
      timeout: JB_TIMEOUT,
      retryCount: JB_RETRY_COUNT,
      retryDelay: JB_RETRY_DELAY,
      concurrentRequests: JB_CONCURRENT_REQUESTS,
      url: `${VUE_APP_URL}/execute`
    }
  },
  configurationArguments: {
    validate: {
      url: `${VUE_APP_URL}/validate`
    },
    publish: {
      url: `${VUE_APP_URL}/publish`
    }
  },
  userInterfaces: {
    configModal: {
      url: `${VUE_APP_URL}/`
    },
    runningHover: {
      url: `${VUE_APP_URL}/hover`
    },
    runningModal: {
      url: `${VUE_APP_URL}/modal`
    }
  },
  schema: {
    arguments: {
      execute: {
        inArguments: [{
          sample_input: {
            dataType: 'text',
            direction: 'in'
          },
          dynamic_select: {
            dataType: 'text',
            direction: 'in'
          },
          optional_text: {
            dataType: 'text',
            direction: 'in'
          }
        }],
        outArguments: [{
          result: {
            dataType: 'text',
            direction: 'out',
            access: 'visible'
          }
        }]
      }
    }
  }
}

module.exports = (req, res) => {
  res.json(json);
}
