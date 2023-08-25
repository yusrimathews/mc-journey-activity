<template>
  <section class="section">
    <form>
      <div class="field">
        <label class="label">Sample Input</label>
        <div class="control">
          <input class="input is-small" type="text" v-model="sample_input" />
        </div>
      </div>

      <div class="field">
        <label class="label">Dynamic Select</label>
        <div class="control">
          <div class="select is-small is-fullwidth is-loading">
            <select disabled v-model="dynamic_select">
              <option selected disabled hidden value="">Loading...</option>
            </select>
          </div>
        </div>
        <p class="help">Dynamically populated based on the entry source.</p>
      </div>

      <div class="field">
        <label class="label">Optional Text</label>
        <div class="control">
          <textarea class="textarea is-small" v-model="optional_text"></textarea>
        </div>
      </div>

      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <button class="button is-small is-light" v-on:click="formCancel">Cancel</button>
        </div>

        <div class="control">
          <button class="button is-small is-primary" v-on:click="formSave">Save</button>
        </div>
      </div>

      <br />
      <div class="tags has-addons mb-0">
        <span class="tag">Debug</span>
        <span class="tag is-warning is-light">Data</span>
      </div>
      <pre>{{ this.$data }}</pre>

      <br />
      <div class="tags has-addons mb-0">
        <span class="tag">Debug</span>
        <span class="tag is-warning is-light">State</span>
      </div>
      <pre>{{ this.$store.state }}</pre>
    </form>
  </section>
</template>

<style>
  @import 'https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css';
</style>

<script>
import customActivity from '@/mixins/customActivity';

export default {
  name: 'Main',
  mixins: [customActivity],
  data: () => ({
    sample_input_error: false,
    dynamic_select_error: false
  }),
  computed: {
    sample_input: {
      get () {
        return this.$store.state.configModal.sample_input;
      },
      set (value) {
        this.$store.commit('updateConfigModal', { key: 'sample_input', value });
      }
    },
    dynamic_select: {
      get () {
        return this.$store.state.configModal.dynamic_select;
      },
      set (value) {
        this.$store.commit('updateConfigModal', { key: 'dynamic_select', value });
      }
    },
    optional_text: {
      get () {
        return this.$store.state.configModal.optional_text;
      },
      set (value) {
        this.$store.commit('updateConfigModal', { key: 'optional_text', value });
      }
    }
  },
  methods: {
    formCancel (element) {
      element.preventDefault();
    },
    formSave (element) {
      element.preventDefault();
    }
  }
}
</script>
