<template>
  <section class="section py-0 px-0">
    <div class="tags has-addons mb-0">
      <span class="tag">Debug</span>
      <span class="tag is-warning is-light">State</span>
    </div>
    <pre>{{ this.$store.state }}</pre>
  </section>
</template>

<script>
import customActivity from '@/mixins/customActivity';

export default {
  name: 'Modal',
  mixins: [customActivity]
}
</script>
