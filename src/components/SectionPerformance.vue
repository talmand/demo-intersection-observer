<template>
<section id="section_performance" :class="{isIntersecting: entry.isIntersecting}">
  <div class="container">
    <h2>Intersection Observer vs Scroll Events</h2>
    <p>Discuss the differences from scroll events and the performance benefits of observers.</p>
  </div>
</section>
</template>

<script>
export default {
  name: 'section-performance',

  props: {
    entry: Object
  }
}
</script>

<style lang="scss" scoped>

</style>
