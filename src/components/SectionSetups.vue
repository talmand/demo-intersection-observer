<template>
<section id="section_setups" :class="{isIntersecting: entry.isIntersecting}">
  <div class="container">
    <div class="time-seen">{{ timeSeenString }}</div>

    <h2>Different Setups</h2>
    <p>Explain that there are several ways to use observers with targets.</p>
    <p>One observer, many targets.</p>
    <p>Many observers, one target.</p>
    <p>Many observers, one callback.</p>
  </div>
</section>
</template>

<script>
import { value } from 'vue-function-api';
import { timeSeenFunction } from '../functions/utils';

export default {
  name: 'section-setups',

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