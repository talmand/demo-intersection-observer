<template>
<section id="section_callback_entries" :class="{isIntersecting: entry.isIntersecting}">
  <div class="container">
    <div class="time-seen">{{ timeSeenString }}</div>

    <h2>The Callback Entries</h2>
    <div class="demo">
      <div class="demo-left">
        <p>The entry object provides details about the target element and its relationship to the root element.</p>
        <p>The "boundingClientRect", "intersectionRect", and "rootBounds" describes the bounding box details, size, and coordinates of the root and target elements. it also gives the information for the intersection box created between the two.</p>
        <p>The "intersectionRatio" is the percentage of the target's bounding box that is currently intersecting the root's bounding box. It is possible for the target to be taller than the root, in which case the ratio will never reach one. The ratio also increases and decreases while the target enters and leaves the root.</p>
        <p>The "isIntersecting" is a boolean that indicates the target element has made contact with the root element.</p>
        <p>The "time" is the number of milliseconds from the time the observer was created and when this entry was recorded.</p>
      </div>
      <div class="demo-right">
<prism language="javascript">IntersectionObserverEntry
  boundingClientRect: DOMRect
    bottom: 923.3999938964844, top: 771
    left: 9, right: 420
    height: 152.39999389648438, width: 411
    x: 9, y: 771
    &lt;prototype&gt;: DOMRectPrototype { }
  intersectionRatio: 0.11363636363636363
  intersectionRect: DOMRect
    bottom: 471, top: 450
    height: 21, width: 157
    left: 9, right: 166
    x: 9, y: 450
    &lt;prototype&gt;: DOMRectPrototype { }
  isIntersecting: true
  rootBounds: DOMRect
    bottom: 507, top: 8
    height: 499, width: 176
    left: 8, right: 184
    x: 8, y: 8
    &lt;prototype&gt;: DOMRectPrototype { }
  target: &lt;div class="item"&gt;
  time: 522
  &lt;prototype&gt;: IntersectionObserverEntryPrototype { }</prism>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import { ref } from '@vue/composition-api';
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
    let timeSeenString = ref(null);
    
    timeSeenFunction(props, timeSeenString);

    return {
      timeSeenString
    }
  }
}
</script>

<style lang="scss" scoped>
.demo {
  display: flex;
}
.demo-left {
  padding-right: 50px;
  width: 50%;
}
.demo-right {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
}
</style>