<template>
<section id="section_basic_example" :class="{isIntersecting: entry.isIntersecting}">
  <div class="container">
    <h2>The Basic Example</h2>
    <p>Show a basic example of the observer with options and a callback.</p>
    <p>Explain the methods: disconnect, observe, takeRecords, unobserve.</p>
    <p>Explain the options array.</p>
    <p>Explain the observer info passed into callback.</p>
  </div>
</section>
</template>

<script>
export default {
  name: 'section-basic-example',

  props: {
    entry: Object
  }
}
</script>

<style lang="scss" scoped>

</style>