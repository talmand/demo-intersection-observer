<template>
<section id="section_setups" :class="{isIntersecting: entry.isIntersecting}">
  <div class="container">
    <div class="time-seen">{{ timeSeenString }}</div>

    <h2>Setup is Flexible</h2>
    <p>There are different ways of setting up Intersection Observers for one or more callbacks and targets.</p>

    <p>An intersection observer can observe several elements that share the functionality of the callback.</p>
<prism language="javascript">let observer = new IntersectionObserver(callback, options);

document.querySelectorAll('section').forEach(element => {
  observer.observe(element);
});
</prism>

    <p>Many observers, one target.</p>
<prism language="javascript">let observer1 = new IntersectionObserver(callback1, options1);
let observer2 = new IntersectionObserver(callback2, options2);
let observer3 = new IntersectionObserver(callback3, options3);

observer1.observe(element);
observer2.observe(element);
observer3.observe(element);
</prism>

    <p>Many observers, one callback.</p>
<prism language="javascript">let observer1 = new IntersectionObserver(callback, options1);
let observer2 = new IntersectionObserver(callback, options2);
let observer3 = new IntersectionObserver(callback, options3);
</prism>
  </div>
</section>
</template>

<script>
import { ref } from '@vue/composition-api';
import { timeSeenFunction } from '../functions/utils';
import Prism from 'vue-prism-component';

export default {
  name: 'section-setups',

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
p {
  text-align: center;
}
.language-javascript {
  margin: 0 auto 20px !important;
  width: 75%;
}
</style>