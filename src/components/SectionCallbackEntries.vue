<template>
<section id="section_callback_entries" :class="{isIntersecting: entry.isIntersecting}">
  <div class="container">
    <div class="time-seen">{{ timeSeenString }}</div>

    <h2>The Callback Entries</h2>
    <p>Give a breakdown of what is provided in the entries array for the callback.</p>
    <p>Explain the different bounds: boundingClientRect, intersectionRect, rootBounds.</p>
    <p>Explain intersectionRatio and isIntersecting.</p>
    <p>Explain the target.</p>
    <p>Explain time.</p>
  </div>
</section>
</template>

<script>
import { value } from 'vue-function-api';
import { timeSeenFunction } from '../functions/utils';

export default {
  name: 'section-callback-entries',

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