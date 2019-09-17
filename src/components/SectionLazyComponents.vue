<template>
<section id="section_lazy_components" :class="{isIntersecting: entry.isIntersecting}">
  <div class="container">
    <div class="time-seen">{{ timeSeenString }}</div>

    <h2>Demo: Lazy Loading Vue Components</h2>
    <div class="demo">
      <div class="demo-left">
        <h3>Load components on demand</h3>
        <p>Much like lazy loading images, the same can be done with components.</p>
<prism language="html">&lt;div class="lazy-component-container" data-comp="compB"&gt;
  &lt;lazy-component-b v-if="componentStates.compB" /&gt;
&lt;/div&gt;
&lt;div class="buffer"&gt;&lt;/div&gt;
&lt;div class="lazy-component-container" data-comp="compC"&gt;
  &lt;transition name="slide-right"&gt;
    &lt;lazy-component-c v-if="componentStates.compC" /&gt;
  &lt;/transition&gt;
&lt;/div&gt;
</prism>
<prism language="javascript">components: {
  LazyComponentA: () => import('./LazyComponentA.vue'),
  LazyComponentB: () => import('./LazyComponentB.vue'),
  LazyComponentC: () => import('./LazyComponentC.vue')
},

const io_callback = (entries) => {
  entries.forEach(entry => {
    if (entry.target.dataset.comp === 'compA') {
      componentStates.value.compA = entry.isIntersecting;
    } else if (entry.isIntersecting) {
      componentStates.value[entry.target.dataset.comp] = true;
      io_observer.unobserve(entry.target);
    }
  });
};
</prism>
      </div>
      <div class="demo-right">
        <small>Scroll the components into view to see them load.</small>
        <div ref="root" class="root">
          <div class="buffer"></div>
          <div class="lazy-component-container" data-comp="compA">
            <lazy-component-a v-if="componentStates.compA" />
          </div>
          <div class="buffer"></div>
          <div class="lazy-component-container" data-comp="compB">
            <lazy-component-b v-if="componentStates.compB" />
          </div>
          <div class="buffer"></div>
          <div class="lazy-component-container" data-comp="compC">
            <transition name="slide-right">
              <lazy-component-c v-if="componentStates.compC" />
            </transition>
          </div>
          <div class="buffer"></div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import { value, onMounted } from 'vue-function-api';
import { timeSeenFunction } from '../functions/utils';
import Prism from 'vue-prism-component';

export default {
  name: 'section-lazy-components',

  props: {
    entry: Object
  },

  components: {
    Prism,
    LazyComponentA: () => import('./LazyComponentA.vue'),
    LazyComponentB: () => import('./LazyComponentB.vue'),
    LazyComponentC: () => import('./LazyComponentC.vue')
  },

  setup (props, context) {
    let timeSeenString = value(null);
    let io_observer = null;
    let componentStates = value({
      compA: false,
      compB: false,
      compC: false
    });

    const io_callback = (entries) => {
      entries.forEach(entry => {
        if (entry.target.dataset.comp === 'compA') {
          componentStates.value.compA = entry.isIntersecting;
        } else if (entry.isIntersecting) {
          componentStates.value[entry.target.dataset.comp] = true;
          io_observer.unobserve(entry.target);
        }
      });
    };
    
    timeSeenFunction(props, timeSeenString);

    onMounted(() => {
      io_observer = new IntersectionObserver(io_callback, { root: context.refs.root, rootMargin: '0px 0px -75% 0px', threshold: 0 });

      document.querySelectorAll('.lazy-component-container').forEach(lazy => {
        io_observer.observe(lazy);
      });
    });

    return {
      timeSeenString,
      componentStates
    }
  }
}
</script>

<style lang="scss" scoped>
.demo {
  display: flex;
}
.demo-left {
  width: 60%;
}
.demo-right {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40%;
}
.root {
  border: 3px solid rebeccapurple;
  height: 400px;
  overflow-x: scroll;
  transition: 0.25s;
  width: 400px;
}

.buffer {
  height: 110%;
}
.lazy-component-container {
  background-color: rebeccapurple;
  display: block;
  min-height: 20px;
  width: 100%;
}
</style>