<template>
<section id="section_observer_v2" :class="{isIntersecting: entry.isIntersecting}">
  <div class="container">
    <div class="time-seen">{{ timeSeenString }}</div>
    
    <h2>Intersection Observer v2</h2>
    <p>Explain additions to v2 such as delay and visibility.</p>
  </div>
</section>
</template>

<script>
import { value } from 'vue-function-api';
import { timeSeenFunction } from '../functions/utils';

export default {
  name: 'section-observer-v2',

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