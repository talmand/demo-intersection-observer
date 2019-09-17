<template>
<section id="section_credits" :class="{isIntersecting: entry.isIntersecting}">
  <div class="container">
    <div class="time-seen">{{ timeSeenString }}</div>

    <h2>Credits</h2>

    <div id="more">
      <h3>For more information:</h3>
      <p><a href="https://css-tricks.com/the-power-of-named-transitions-in-vue/">CSS-Tricks: The Power of Named Transitions</a></p>
    </div>
    <div class="demo">
      <div class="demo-left">
        <p><strong>Technologies:</strong></p>
        <p><a href="https://cli.vuejs.org/">Vue CLI</a></p>
        <p><a href="https://github.com/vuejs/composition-api">Vue Composition API</a></p>
        <p><a href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API">Intersection Observer</a></p>
        <p><a href="https://developers.google.com/web/updates/2019/02/intersectionobserver-v2">Intersection Observer v2</a></p>
      </div>
      <div class="demo-right">    
        <p><strong>CSS/DOM Techniques:</strong></p>
        <p><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap/Basic_concepts">CSS Scroll Snapping</a></p>

        <p><strong>Libraries:</strong></p>
        <p><a href="https://prismjs.com/">Prism</a></p>
        <p><a href="https://www.chartjs.org/">Chart.js</a></p>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import { value } from 'vue-function-api';
import { timeSeenFunction } from '../functions/utils';

export default {
  name: 'section-credits',

  props: {
    entry: Object
  },

  setup (props) {
    let timeSeenString = value(null);
    
    timeSeenFunction(props, timeSeenString);

    return {
      timeSeenString
    }
  }
}
</script>

<style lang="scss" scoped>
#more {
  margin-bottom: 50px;
  text-align: center;
}
.demo {
  display: flex;
  text-align: center;
}
.demo-left {
  width: 50%;
}
.demo-right {
  width: 50%;
}
</style>