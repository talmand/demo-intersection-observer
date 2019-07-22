<template>
<section id="section_browsers" :class="{isIntersecting: entry.isIntersecting}">
  <div class="container">
    <h2>Browser Differences</h2>
    <p>Show animated transform is respected in Firefox but not Chrome.</p>
    <p>Show clip-path, and animated clip-path, is respected in Chrome but not Firefox.</p>
  </div>
</section>
</template>

<script>
export default {
  name: 'section-browsers',

  props: {
    entry: Object
  }
}
</script>

<style lang="scss" scoped>

</style>