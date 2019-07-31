<template>
<section id="section_basic_example" :class="{isIntersecting: entry.isIntersecting}">
  <div class="container">
    <div class="time-seen">{{ timeSeenString }}</div>

    <h2>The Basic Example</h2>
    <div class="panel">
      <button @click="show = 'code'">observer code</button>
      <button @click="show = 'observer'">observer object</button>
      <button @click="show = 'entry'">observer entry object</button>
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
</div>

<div v-else-if="show == 'observer'" key="observer">
<prism language="javascript">IntersectionObserver {
  root: &lt;body&gt;,
  rootMargin: '0px 0px 0px 0px',
  threshold: Array [ 0 ]
}</prism>
</div>

<div v-else-if="show == 'entry'" key="entry">
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
section .container {
  justify-content: flex-start;
}

.panel {
  margin: 2rem 0;

  button {
    cursor: pointer;
    font-size: 1.6rem;
    margin: 0 2rem 0 0;
    padding: 0.5rem 1rem;
  }
}
</style>