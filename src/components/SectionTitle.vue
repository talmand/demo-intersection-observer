<template>
<section id="section_title" :class="{isIntersecting: entry.isIntersecting}">
  <div class="container">
    <h1>The Intersection Observer</h1>
  </div>
</section>
</template>

<script>
export default {
  name: 'section-title',

  props: {
    entry: Object
  }
}
</script>

<style lang="scss" scoped>

</style>
