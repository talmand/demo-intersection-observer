<template>
<section id="section_title" :class="{isIntersecting: entry.isIntersecting}">
  <div class="container">
    <h1>The Intersection Observer</h1>
    <hr />
    <p>Please note that this app was built with the <a href="https://github.com/vuejs/vue-function-api">Vue Function API plugin</a>,<br />the code will appear non-standard as a result.</p>
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
hr {
  border-bottom: 1px solid rebeccapurple;
  margin: 2rem auto;
  width: 75%;
}
p {
  text-align: center;
}
</style>
