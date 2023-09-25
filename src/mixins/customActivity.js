import Postmonger from 'postmonger';

// Required environment variable
const VUE_APP_URL = process.env.VUE_APP_URL.replace(/\/+$/, '');

export default {
  components: { Postmonger },
  computed: {
    configModal: {
      get () {
        return this.$store.state.configModal;
      },
      set (value) {
        this.$store.commit('updateState', { key: 'configModal', value });
      }
    },
    jbActivity: {
      get () {
        return this.$store.state.jbActivity;
      },
      set (value) {
        this.$store.commit('updateState', { key: 'jbActivity', value });
      }
    },
    jbEndpoints: {
      get () {
        return this.$store.state.jbEndpoints;
      },
      set (value) {
        this.$store.commit('updateState', { key: 'jbEndpoints', value });
      }
    },
    jbTokens: {
      get () {
        return this.$store.state.jbTokens;
      },
      set (value) {
        this.$store.commit('updateState', { key: 'jbTokens', value });
      }
    },
    jbCulture: {
      get () {
        return this.$store.state.jbCulture;
      },
      set (value) {
        this.$store.commit('updateState', { key: 'jbCulture', value });
      }
    },
    jbInteractionDefaults: {
      get () {
        return this.$store.state.jbInteractionDefaults;
      },
      set (value) {
        this.$store.commit('updateState', { key: 'jbInteractionDefaults', value });
      }
    },
    jbInteraction: {
      get () {
        return this.$store.state.jbInteraction;
      },
      set (value) {
        this.$store.commit('updateState', { key: 'jbInteraction', value });
      }
    },
    jbTriggerEventDefinition: {
      get () {
        return this.$store.state.jbTriggerEventDefinition;
      },
      set (value) {
        this.$store.commit('updateState', { key: 'jbTriggerEventDefinition', value });
      }
    },
    jbSchema: {
      get () {
        return this.$store.state.jbSchema;
      },
      set (value) {
        this.$store.commit('updateState', { key: 'jbSchema', value });
      }
    }
  },
  methods: {
    initActivity (payload) {
      this.$log.debug(`[customActivity.js] initActivity | ${JSON.stringify(payload)}`);

      this.jbActivity = payload;

      // Optional Postmonger trigger request
      // this.postmonger.trigger('requestEndpoints');
      // this.postmonger.trigger('requestTokens');
      // this.postmonger.trigger('requestCulture');
      // this.postmonger.trigger('requestInteractionDefaults');
      // this.postmonger.trigger('requestInteraction');
      // this.postmonger.trigger('requestTriggerEventDefinition');
      this.postmonger.trigger('requestSchema');

      if (payload.metaData.isConfigured) {
        this.configModal = payload.metaData.configModal;
      }
    },
    initActivityRunningHover (payload) {
      this.$log.debug(`[customActivity.js] initActivityRunningHover | ${JSON.stringify(payload)}`);

      this.jbActivity = payload;

      if (payload.metaData.isConfigured) {
        this.configModal = payload.metaData.configModal;
      }
    },
    initActivityRunningModal (payload) {
      this.$log.debug(`[customActivity.js] initActivityRunningModal | ${JSON.stringify(payload)}`);

      this.jbActivity = payload;

      if (payload.metaData.isConfigured) {
        this.configModal = payload.metaData.configModal;
      }
    },
    requestedEndpoints (payload) {
      this.$log.debug(`[customActivity.js] requestedEndpoints | ${JSON.stringify(payload)}`);

      this.jbEndpoints = payload;
    },
    requestedTokens (payload) {
      this.$log.debug(`[customActivity.js] requestedTokens | ${JSON.stringify(payload)}`);

      this.jbTokens = payload;
    },
    requestedCulture (payload) {
      this.$log.debug(`[customActivity.js] requestedCulture | ${JSON.stringify(payload)}`);

      this.jbCulture = payload;
    },
    requestedInteractionDefaults (payload) {
      this.$log.debug(`[customActivity.js] requestedInteractionDefaults | ${JSON.stringify(payload)}`);

      this.jbInteractionDefaults = payload;
    },
    requestedInteraction (payload) {
      this.$log.debug(`[customActivity.js] requestedInteraction | ${JSON.stringify(payload)}`);

      this.jbInteraction = payload;
    },
    requestedTriggerEventDefinition (payload) {
      this.$log.debug(`[customActivity.js] requestedTriggerEventDefinition | ${JSON.stringify(payload)}`);

      this.jbTriggerEventDefinition = payload;
    },
    requestedSchema (payload) {
      this.$log.debug(`[customActivity.js] requestedSchema | ${JSON.stringify(payload)}`);

      this.jbSchema = payload;
    },
    async clickedNext () {
      const result = await this.v$.$validate();

      if (!result) {
        this.postmonger.trigger('ready');
      } else {
        const configModal = this.$store.state.configModal;
        const inArguments = [];

        Object.keys(configModal).forEach(key => {
          inArguments.push({
            [key]: configModal[key]
          });
        });

        this.postmonger.trigger('updateActivity', {
          ...this.$store.state.jbActivity,
          metaData: {
            ...this.$store.state.jbActivity.metaData,
            configModal: configModal,
            isConfigured: true
          },
          arguments: {
            ...this.$store.state.jbActivity.arguments,
            execute: {
              ...this.$store.state.jbActivity.arguments.execute,
              inArguments: inArguments
            }
          },
          configurationArguments: {
            ...this.$store.state.jbActivity.configurationArguments,
            validate: {
              url: `${VUE_APP_URL}/validate`
            }
          }
        });
      }
    },
    destroy () {
      this.postmonger.trigger('destroy');

      this.$log.info('[customActivity.js] destroy');
    }
  },
  created () {
    this.postmonger = new Postmonger.Session();

    this.postmonger.trigger('ready');

    this.$log.info('[customActivity.js] init');
  },
  beforeMount () {
    this.postmonger.on('initActivity', this.initActivity);
    this.postmonger.on('initActivityRunningHover', this.initActivityRunningHover);
    this.postmonger.on('initActivityRunningModal', this.initActivityRunningModal);
    this.postmonger.on('requestedEndpoints', this.requestedEndpoints);
    this.postmonger.on('requestedTokens', this.requestedTokens);
    this.postmonger.on('requestedCulture', this.requestedCulture);
    this.postmonger.on('requestedInteractionDefaults', this.requestedInteractionDefaults);
    this.postmonger.on('requestedInteraction', this.requestedInteraction);
    this.postmonger.on('requestedTriggerEventDefinition', this.requestedTriggerEventDefinition);
    this.postmonger.on('requestedSchema', this.requestedSchema);
    this.postmonger.on('clickedNext', this.clickedNext);
  }
}
