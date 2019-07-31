<template>
<section id="section_performance" :class="{isIntersecting: entry.isIntersecting}">
  <div class="container">    
    <div class="time-seen">{{ timeSeenString }}</div>

    <h2>Intersection Observer vs Scroll Events</h2>
    <p>Discuss the differences from scroll events and the performance benefits of observers.</p>
  </div>
</section>
</template>

<script>
import { value } from 'vue-function-api';
import { timeSeenFunction } from '../functions/utils';

export default {
  name: 'section-performance',

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

</style>
