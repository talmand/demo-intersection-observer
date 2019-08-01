<template>
<section id="section_callback_entries" :class="{isIntersecting: entry.isIntersecting}">
  <div class="container">
    <div class="time-seen">{{ timeSeenString }}</div>

    <h2>The Callback Entries</h2>
<prism language="javascript">IntersectionObserverEntry {
  boundingClientRect: {
    bottom: 1020.5, left: 0, right: 500, top: 597.5
    height: 513, width: 500
    x: 0, y: 507.5
  }
  intersectionRatio: 0.010721247563352826
  intersectionRect: {
    bottom: 513, left: 0, right: 500, top: 507.5
    height: 5.5, width: 500
    x: 0, y: 507.5
  }
  isIntersecting: false
  rootBounds: {
    bottom: 513, left: 0, right: 500, top: 0
    height: 513, width: 500
    x: 0, y: 0
  }
  target: &lt;div id="spacer"&gt;
  time: 363
}</prism>

<p>The entry object provides details about the target element and its relationship to the root element.</p>
<p>The "boundingClientRect", "intersectionRect", and "rootBounds" describes the bounding box details, size, and coordinates of the root and target elements. it also gives the information for the intersection box created between the two.</p>
<p>The "intersectionRatio" is the percentage of the target's bounding box that is currently intersecting the root's bounding box. It is possible for the target to be taller than the root, which the ratio will never reach one. The ratio also increases and decreases while the target enters and leaves the root.</p>
<p>The "isIntersecting" is a boolean that equates to an intersectionRatio larger than zero.</p>
<p>The "time" is the number of milliseconds from the time the observer was created and when this entry was recorded.</p>
  </div>
</section>
</template>

<script>
import { value } from 'vue-function-api';
import { timeSeenFunction } from '../functions/utils';
import Prism from 'vue-prism-component';

export default {
  name: 'section-callback-entries',

  props: {
    entry: Object
  },

  components: {
    Prism
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