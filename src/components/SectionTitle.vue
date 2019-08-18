<template>
<section id="section_title" :class="{isIntersecting: entry.isIntersecting}">
  <div class="container">
    <h1>The Intersection Observer</h1>
    <h3>W3C First Public Working Draft Published September 14, 2017</h3>
    <hr />
    <p>Please note that this app was built with the <a href="https://github.com/vuejs/vue-function-api">Vue Function API plugin</a>,<br />the code will appear non-standard as a result.</p>

    <h3>Repo | <a href="https://github.com/talmand/demo-intersection-observer">https://github.com/talmand/demo-intersection-observer</a> |</h3>
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
h3 {
  text-align: center;
}
p {
  text-align: center;
}
</style>
