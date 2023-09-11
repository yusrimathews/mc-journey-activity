const jbActivity = {
  name: "",
  id: null,
  key: "REST-2",
  type: "REST",
  arguments: {
    execute: {
      timeout: 20000,
      retryCount: 0,
      retryDelay: 1000,
      concurrentRequests: 5,
      url: "http://localhost:8081/execute"
    }
  },
  configurationArguments: {
    publish: {
      url: "http://localhost:8081/publish"
    },
    applicationExtensionKey: "91b922b1-34ef-4b82-aa49-90205c88164e"
  },
  metaData: {
    category: "custom",
    icon: "images/fallback-icon-custom-activity.png",
    original_icon: "jb://images/fallback-icon-custom-activity.png",
    iconSmall: null,
    statsContactIcon: null
  },
  editable: true,
  outcomes: [
    {
      next: "WAITBYDURATION-1",
      metaData: {
        invalid: false
      }
    }
  ],
  errors: null
}

module.exports = jbActivity;
