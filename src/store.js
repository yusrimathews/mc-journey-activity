import { createStore } from 'vuex';

export const store = createStore({
  state () {
    return {
      configModal: {
        sample_input: '',
        dynamic_select: '',
        optional_text: ''
      },
      jbActivity: {},
      jbTokens: {},
      jbEndpoints: {},
      jbCulture: {},
      jbInteractionDefaults: {},
      jbInteraction: {},
      jbTriggerEventDefinition: {},
      jbSchema: []
    }
  },
  mutations: {
    updateConfigModal (state, object) {
      state.configModal[object.key] = object.value;
    },
    updateState (state, object) {
      state[object.key] = object.value;
    }
  }
});

export default store;
