import { createStore } from 'vuex';
// import jbSchema from './data/jbSchema';

export const store = createStore({
  state () {
    return {
      configModal: {
        sample_input: '',
        dynamic_select: '',
        optional_text: ''
      },
      jbActivity: {},
      jbEndpoints: {},
      jbTokens: {},
      jbCulture: {},
      jbInteractionDefaults: {},
      jbInteraction: {},
      jbTriggerEventDefinition: {},
      // jbSchema: jbSchema
      jbSchema: {}
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
