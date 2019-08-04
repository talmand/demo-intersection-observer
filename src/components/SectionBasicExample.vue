<template>
<section id="section_basic_example" :class="{isIntersecting: entry.isIntersecting}">
  <div class="container">
    <div class="time-seen">{{ timeSeenString }}</div>

    <h2>The Basic Example</h2>
    <div class="panel">
      <button @click="show = 'code'" :class="{active: show == 'code'}">observer code</button>
      <button @click="show = 'observer'" :class="{active: show == 'observer'}">observer object</button>
    </div>

<transition name="fade" mode="out-in">

<div v-if="show == 'code'" key="code">
<prism language="javascript">const options = [
  root: document.body,
  rootMargin: '0px',
  threshold: 0
}

function callback (entries, observer) {
  console.log(observer);
  
  entries.forEach(entry => {
    console.log(entry);
  });
}

let observer = new IntersectionObserver(callback, options);
observer.observe(targetElement);
</prism>

<p>The "root" is the ancestor element that contains the target element. The target element must be a child of the root and at some point will intersect the boundaries of the root.</p>
<p>The "rootMargin" grows or shrinks the bounding box of the root element. This influences when intersection is triggered and the percentages of the intersection ratio. Must be a string of pixels or percentages.</p>
<p>The "threshold" is a single number or array of numbers ranging from 0 to 1 representing the intersection ratios (percentages) that should trigger the intersection observer.</p>
<p>A single intersection observer can observe more than one target element that requires the same functionality from the observer's callback function.</p>
</div>

<div v-else-if="show == 'observer'" key="observer">
<prism language="javascript">IntersectionObserver {
  root: &lt;body&gt;,
  rootMargin: '0px 0px 0px 0px',
  threshold: Array [ 0 ]
}</prism>

<p>The observer object can provide details for the particular observer that invoked the callback function. This can be useful if more than one observer uses the same callback.</p>
<p>The different entries inside the object relate to the options object originally provided to the observer when it was created.</p>
</div>
</transition>

  </div>
</section>
</template>

<script>
import { value } from 'vue-function-api';
import { timeSeenFunction } from '../functions/utils';
import Prism from 'vue-prism-component';

export default {
  name: 'section-basic-example',

  props: {
    entry: Object
  },

  components: {
    Prism
  },

  setup (props) {
    let show = value('code');
    let timeSeenString = value(null);

    timeSeenFunction(props, timeSeenString);

    return {
      show,
      timeSeenString
    }
  }
}
</script>

<style lang="scss" scoped>
.panel {
  margin: 2rem 0;
  position: absolute;
  top: 50px;
}
</style>