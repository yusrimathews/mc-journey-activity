const jbActivity = {
  name: "",
  id: "b2a7f81d-6e35-4f9c-bd40-8c13a25f6d7b",
  key: "REST-1",
  type: "REST",
  arguments: {
    executionMode: "{{Context.ExecutionMode}}",
    definitionId: "{{Context.DefinitionId}}",
    activityId: "{{Activity.Id}}",
    contactKey: "{{Context.ContactKey}}",
    execute: {
      timeout: 20000,
      retryCount: 0,
      retryDelay: 1000,
      concurrentRequests: 5,
      url: "http://localhost:8081/execute?stackKey=S50&eid=500000000&mid=500000000&uid=951827403",
      inArguments: [
        {
          "sample_input": "Sample input"
        },
        {
          "dynamic_select": "{{Event.DEAudience-ee51a166-8c63-2436-fcf8-91c30358bee1.\"Field Name\"}}"
        },
        {
          "optional_text": "Optional input"
        }
      ]
    },
    testExecute: "",
    startActivityKey: "{{Context.StartActivityKey}}",
    definitionInstanceId: "{{Context.DefinitionInstanceId}}",
    requestObjectId: "{{Context.RequestObjectId}}"
  },
  configurationArguments: {
    save: "",
    testSave: "",
    publish: {
      url: "http://localhost:8081/publish?stackKey=S50&eid=500000000&mid=500000000&uid=951827403"
    },
    testPublish: "",
    unpublish: "",
    stop: "",
    testStop: "",
    testUnpublish: "",
    partnerActivityId: "",
    validate: {
      url: "http://localhost:8081/validate?stackKey=S50&eid=500000000&mid=500000000&uid=951827403"
    },
    testValidate: "",
    outArgumentSchema: "",
    executeSchema: ""
  },
  metaData: {
    category: "custom",
    icon: "images/fallback-icon-custom-activity.png",
    original_icon: "jb://images/fallback-icon-custom-activity.png",
    iconSmall: "",
    statsContactIcon: "",
    configModal: {
      sample_input: "Sample input",
      dynamic_select: "{{Event.DEAudience-ee51a166-8c63-2436-fcf8-91c30358bee1.\"Field Name\"}}",
      optional_text: "Optional input"
    },
    isConfigured: true
  },
  schema: {
    arguments: {
      execute: {
        inArguments: [
          {
            sample_input: {
              dataType: "text",
              direction: "in"
            },
            dynamic_select: {
              dataType: "text",
              direction: "in"
            },
            optional_text: {
              dataType: "text",
              direction: "in"
            }
          }
        ],
        outArguments: [
          {
            result: {
              dataType: "text",
              direction: "out",
              access: "visible"
            }
          }
        ]
      }
    }
  },
  editable: true,
  outcomes: [
    {
      key: "b313ca1a-91c0-43a1-b46f-6ae9e6ba9aab",
      next: "WAITBYDURATION-1",
      arguments: {},
      metaData: {
        invalid: false
      }
    }
  ],
  errors: null
}

module.exports = jbActivity;
