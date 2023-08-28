<template>
  <section class="section pt-5">
    <p>Modal</p>

    <br />
    <div class="tags has-addons mb-0">
      <span class="tag">Debug</span>
      <span class="tag is-warning is-light">State</span>
    </div>
    <pre>{{ [this.$data, this.$store.state] }}</pre>
  </section>
</template>

<script>
export default {
  name: 'Modal'
}
</script>
