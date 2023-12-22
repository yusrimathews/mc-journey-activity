<template>
  <section class="section pt-5">
    <form>
      <div class="field">
        <label class="label">Sample Input</label>
        <div class="control">
          <input class="input is-small" type="text" v-model="sample_input" :class="[ this.v$.sample_input.$errors.length ? 'is-danger' : '' ]" />
        </div>
      </div>

      <div class="field">
        <label class="label">Dynamic Select</label>
        <div class="control">
          <div class="select is-small is-fullwidth" :class="[
            this.v$.dynamic_select.$errors.length ? 'is-danger' : '',
            !dynamic_options ? 'is-loading' : ''
          ]">
            <select v-model="dynamic_select" :disabled="!dynamic_options.length">

              <option selected disabled hidden value="" v-if="!dynamic_options">Loading...</option>
              <option selected disabled hidden value="" v-if="!dynamic_options.length">No fields available...</option>
              <option selected disabled hidden value="" v-if="dynamic_options.length">Select a field...</option>

              <option v-for="option in dynamic_options" :value="option.key" :key="option.key">
                {{ option.name }}
              </option>
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

      <div class="field is-grouped is-grouped-centered" v-if="isDevelopment">
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
        <span class="tag is-warning is-light">State</span>
      </div>
      <pre>{{ this.$store.state }}</pre>
    </form>
  </section>
</template>

<script>
import customActivity from '@/mixins/customActivity';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

const NODE_ENV = process.env.NODE_ENV || 'development';

export default {
  name: 'Main',
  mixins: [customActivity],
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      isDevelopment: NODE_ENV === 'development'
    }
  },
  computed: {
    sample_input: {
      get () {
        return this.$store.state.configModal.sample_input;
      },
      set (value) {
        this.$store.commit('updateConfigModal', { key: 'sample_input', value });
        this.v$.sample_input.$touch();
      }
    },
    dynamic_select: {
      get () {
        return this.$store.state.configModal.dynamic_select;
      },
      set (value) {
        this.$store.commit('updateConfigModal', { key: 'dynamic_select', value });
        this.v$.dynamic_select.$touch();
      }
    },
    dynamic_options () {
      var schema_array = this.$store.state.jbSchema.schema || false;
      var types_array = ['Text', 'EmailAddress', 'Phone', 'Date'];

      if (schema_array) {
        return schema_array.filter(function (object) {
          var key_format = object.key.replace(/[{}/"]/g, '');
          var key_split = key_format.split('.');

          object.key = `{{${key_split[0]}.${key_split[1]}."${key_split[2]}"}}`;

          return types_array.includes(object.type);
        });
      } else {
        return schema_array;
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
  validations () {
    return {
      sample_input: { required },
      dynamic_select: { required }
    }
  },
  methods: {
    formCancel (element) {
      element.preventDefault();
      this.destroy();
    },
    formSave (element) {
      element.preventDefault();
      this.clickedNext();
    }
  }
}
</script>
