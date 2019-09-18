<template>
<section id="section_observer_v2" :class="{isIntersecting: entry.isIntersecting}">
  <div class="container">
    <div class="time-seen">{{ timeSeenString }}</div>
    
    <h2>Intersection Observer v2</h2>

    <div class="section">
      <div class="left">
        <h3>Intersection Observer Options</h3>
        <p>Chrome offers two new properties that can be included in the options object passed to the Intersection Observer, which is part of version of the spec referred to as Intersection Observer v2.</p>
        <p>One property to pass is "trackVisibility" which accepts a boolean. The general idea is to offer the ability to determine if the target element reported by the observer is actually visible to the user. One potential use for this feature is the ability to determine if the target element is being obscured in some way by another element positioned above the target.</p>
        <p>The other property is "delay", which accepts a number that must be 100 or higher that represents milliseconds. This property is required for the trackVisibility property. Due to the expensive nature of determining visibility, the delay amount of at least 100 is required.</p>
        <p>This delay does in fact delay the report of the entry by the observer for the listed amount of time.</p>

        <h3>Intersection Observer Entry</h3>
        <p>These new features results in an additional property reported in an entry by the observer.</p>
        <p>This new entry is "isVisible", which is a boolean. The name describes its function, to report whether the target element is actually visible to the user while it is intersecting the root element.</p>
        <p>At this time only Chrome supports this particular feature of the Intersection Observer and should be considered experimental.</p>
      </div>
      <div class="right">
        <h3>Intersection Observer:</h3>
<prism language="javascript">IntersectionObserver
  delay: 500
  root: null
  rootMargin: "0px 0px 0px 0px"
  thresholds: [0]
  trackVisibility: true
  __proto__: IntersectionObserver
</prism>

        <h3>Intersection Observer Entry:</h3>
<prism language="javascript">IntersectionObserverEntry
  boundingClientRect: DOMRectReadOnly
    bottom: 682, top: 570
    height: 112, width: 477
    left: 9, right: 486
    x: 9, y: 570
    __proto__: DOMRectReadOnly
  intersectionRatio: 0
  intersectionRect: DOMRectReadOnly
    bottom: 0, top: 0
    height: 0, width: 0
    left: 0, right: 0
    x: 0, y: 0
    __proto__: DOMRectReadOnly
  isIntersecting: false
  isVisible: false
  rootBounds: null
  target: div.item
  time: 244.26500000117812
  __proto__: IntersectionObserverEntry</prism>
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
  name: 'section-observer-v2',

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
.section {
  display: flex;
}
.left {
  padding-right: 20px;
  width: 60%;
}
.right {
  width: 40%;
}
</style>