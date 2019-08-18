<template>
<section id="section_observer_v2" :class="{isIntersecting: entry.isIntersecting}">
  <div class="container">
    <div class="time-seen">{{ timeSeenString }}</div>
    
    <h2>Intersection Observer v2</h2>

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