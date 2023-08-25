import Postmonger from 'postmonger';

export default {
  components: { Postmonger },
  data: () => ({
    postmonger: null
  }),
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
    }
  },
  methods: {
    initActivity (payload) {
      this.jbActivity = payload;

      this.postmonger.trigger('requestEndpoints');

      if (payload.metaData.isConfigured) {
        this.configModal = payload.metaData.configModal;
      }

      this.postmonger.trigger('updateButton', { enabled: false });
    },
    initActivityRunningHover (payload) {
      this.jbActivity = payload;

      this.postmonger.trigger('requestEndpoints');
    },
    initActivityRunningModal (payload) {
      this.jbActivity = payload;

      this.postmonger.trigger('requestEndpoints');
    },
    requestedTokens (payload) {
      this.jbTokens = payload;

      this.postmonger.trigger('requestCulture');
      this.postmonger.trigger('requestInteractionDefaults');
      this.postmonger.trigger('requestInteraction');
      this.postmonger.trigger('requestTriggerEventDefinition');
      this.postmonger.trigger('requestSchema');
    },
    requestedEndpoints (payload) {
      this.jbEndpoints = payload;

      this.postmonger.trigger('requestTokens');
    },
    requestedCulture (payload) {
      this.jbCulture = payload;
    },
    requestedInteractionDefaults (payload) {
      this.jbInteractionDefaults = payload;
    },
    requestedInteraction (payload) {
      this.jbInteraction = payload;
    },
    requestedTriggerEventDefinition (payload) {
      this.jbTriggerEventDefinition = payload;
    },
    requestedSchema (payload) {
      this.jbSchema = payload;
    }
  },
  created () {
    this.postmonger = new Postmonger.Session();

    this.postmonger.trigger('ready');
  },
  beforeMount () {
    this.postmonger.on('initActivity', this.initActivity);
    this.postmonger.on('initActivityRunningHover', this.initActivityRunningHover);
    this.postmonger.on('initActivityRunningModal', this.initActivityRunningModal);
    this.postmonger.on('requestedTokens', this.requestedTokens);
    this.postmonger.on('requestedEndpoints', this.requestedEndpoints);
    this.postmonger.on('requestedCulture', this.requestedCulture);
    this.postmonger.on('requestedInteractionDefaults', this.requestedInteractionDefaults);
    this.postmonger.on('requestedInteraction', this.requestedInteraction);
    this.postmonger.on('requestedTriggerEventDefinition', this.requestedTriggerEventDefinition);
    this.postmonger.on('requestedSchema', this.requestedSchema);
  }
}
