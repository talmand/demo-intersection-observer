<template>
<section id="section_title" :class="{isIntersecting: entry.isIntersecting}">
  <div class="container">
    <h1>How the Intersection Observer is Watching</h1>
    <h3>W3C First Public Working Draft Published September 14, 2017</h3>
    <hr />
    <p>Please note that this app was built with the <a href="https://github.com/vuejs/vue-function-api">Vue Function API plugin</a>,<br />the code will appear non-standard as a result.</p>

    <h3>Repo | <a href="https://github.com/talmand/demo-intersection-observer" target="_blank">https://github.com/talmand/demo-intersection-observer</a> |</h3>

    <div class="instructions">CSS Scroll Snap is in use, up/down arrow keys can be used to change slides...</div>
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
  margin: 20px auto;
  width: 75%;
}
h3 {
  text-align: center;
}
p {
  text-align: center;
}

.instructions {
  bottom: 20px;
  font-size: 2rem;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  text-align: center;
  width: 90%;
}
</style>
