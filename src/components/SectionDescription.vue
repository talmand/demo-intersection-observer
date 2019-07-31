<template>
<section id="section_description" :class="{isIntersecting: entry.isIntersecting}">
  <div class="container">
    <div class="time-seen">{{ timeSeenString }}</div>
    
    <h2>What is the Intersection Observer</h2>
    <p>The Intersection Observer API provides the means to observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.</p>
    <p>The Intersection Observer consists of four components:</p>
    <ul>
      <li>the "root", which is the parent element the observer is tied to, can be the viewport</li>
      <li>the "target", which is a child element being observed, there can be more than one target</li>
      <li>the options object, defines certain aspects of the observer's behavior</li>
      <li>the callback function, which is called each time an intersection change is observed</li>
    </ul>
    <p>The most common usage of the Intersection Observer is detecting when a target enters the bounds of the root; mostly by scrolling. Therefore it is a often thought of as a replacement for scroll event based position checking. Although in most cases the Intersection Observer provides a more performant solution than relying on scroll events, it is not necessarily a replacement.</p>
    <p>Even though there is overlap in functionality of the Intersection Observer and scroll events, we must consider the observer as something new with many more and different possibilities than scroll events alone.</p>
  </div>
</section>
</template>

<script>
import { value } from 'vue-function-api';
import { timeSeenFunction } from '../functions/utils';

export default {
  name: 'section-description',

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