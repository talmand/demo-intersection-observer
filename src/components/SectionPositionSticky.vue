<template>
<section id="section_position_sticky" :class="{isIntersecting: entry.isIntersecting}">
  <div class="container">
    <div class="time-seen">{{ timeSeenString }}</div>

    <h2>Demo: Faking a Position Sticky Event</h2>
    <div class="panel">
      <button @click="show = 'explain'" :class="{active: show === 'explain'}">explanation</button>
      <button @click="show = 'js'" :class="{active: show === 'js'}">javascript</button>
      <button @click="show = 'html'" :class="{active: show === 'html'}">html</button>
    </div>

    <div class="demo">
      <div class="demo-left">
        <transition name="fade" mode="out-in">
          <div v-if="show === 'explain'" key="explain">
            <h3>We don't know when an element is "sticky"</h3>
            <p>The "position: sticky" CSS property is a very useful but shy feature; it does not inform the browser of the stickiness state of the element. A needed feature is something like a sticky event.</p>
            <p>Using Intersection Observer a sticky event can be faked so that the element can be altered via CSS and JavaScript based on its current stickiness state.</p>
            <p>To accomplish this requires creative use of the rootMargin of the root element.</p>
          </div>
          <div v-else-if="show === 'js'" key="js">
            <h3>Javascript:</h3>
<prism language="javascript">const io_callback = (entries) => {
  entries.forEach(entry => {
    let boundingRect = entry.boundingClientRect;
    let intersectionRect = entry.intersectionRect;

    if (stickyCodeActive.value) {
      targetSticky.value = boundingRect.top === intersectionRect.top || boundingRect.top &gt; intersectionRect.top;
      targetText.value = targetSticky.value ? 'sticky' : 'not sticky';
    } else {
      targetText.value = 'not awesome';
    }
  });
};

let io_observer = new IntersectionObserver(io_callback, {
  root: context.refs.root,
  rootMargin: '0px 0px -100% 0px',
  threshold: 0
});
</prism>
            <p>The code checks to see if the "top" of the target is either equal to (scrolling up) or less than (scrolling down) the "top" of the intersection box.</p>
            <p>The "rootMargin" forces the bottom of the root's bounding box to be equal with the top of the box. With a theshold of zero this would trigger the observer's callback when the target's bounding box just comes in contact with the top of the root element.</p>
          </div>
          <div v-else-if="show === 'html'" key="html">
            <h3>HTML:</h3>
<prism language="html">&lt;div class=&quot;target-container&quot;&gt;
  &lt;div ref=&quot;target&quot;  class=&quot;sticky&quot; :class=&quot;{ event: targetSticky }&quot;&gt;
    &lt;transition name=&quot;slide-left&quot; mode=&quot;out-in&quot;&gt;
      &lt;div :key=&quot;&grave;target-${targetSticky}&grave;&quot;&gt;{{ targetText }}&lt;/div&gt;
    &lt;/transition&gt;
  &lt;/div&gt;
&lt;/div&gt;
</prism>
            <p>The element with class "target-container" is the parent of the sticky element, which has the purple target background.</p>
            <p>The element with class "sticky" is the target element the observer is observing. It has a dynamic class that changes the opacity of the background color when it is in the sticky state.</p>
            <p>The inner element with the key attribute with the sticky element's text is made to allow for the slide-left transition with a dynamic key.</p>
          </div>
        </transition>
      </div>
      <div class="demo-right">
        <small>Scroll the target into view and watch for the sticky element.</small>
        <div ref="root" class="root">
          <div class="buffer"></div>
          <div class="target-container">
            <div ref="target"  class="sticky" :class="{ event: targetSticky }">
              <transition name="slide-left" mode="out-in">
                <div :key="`target-${targetSticky}`">{{ targetText }}</div>
              </transition>
            </div>
          </div>
          <div class="buffer"></div>
        </div>
        <div class="buttons">
          <button :class="{ active: stickyCodeActive} " @click="stickyCodeActive = !stickyCodeActive">make it work!</button>
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
  name: 'section-position-sticky',

  props: {
    entry: Object
  },

  components: {
    Prism
  },

  setup (props, context) {
    let timeSeenString = value(null);
    let show = value('explain');
    let targetSticky = value(false);
    let targetText = value('not sticky');
    let stickyCodeActive = value(false);

    const io_callback = (entries) => {
      entries.forEach(entry => {
        let boundingRect = entry.boundingClientRect;
        let intersectionRect = entry.intersectionRect;

        if (stickyCodeActive.value) {
          targetSticky.value = boundingRect.top === intersectionRect.top || boundingRect.top < intersectionRect.top;
          targetText.value = targetSticky.value ? 'sticky' : 'not sticky';
        } else {
          targetText.value = 'not awesome';
        }
      });
    };
    
    timeSeenFunction(props, timeSeenString);

    onMounted(() => {
      let io_observer = new IntersectionObserver(io_callback, { root: context.refs.root, rootMargin: '0px 0px -100% 0px', threshold: 0 });
      io_observer.observe(context.refs.target);
    });

    return {
      timeSeenString,
      show,
      targetSticky,
      targetText,
      stickyCodeActive
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
.target-container {
  background-color: rebeccapurple;
  background-image: radial-gradient(ellipse at center, #ffffff 0%,#ffffff 14%,#663399 15%,#663399 34%,#ffffff 35%,#ffffff 50%,#663399 51%,#663399 99%);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 300px 300px;
  height: 500px;
  margin: auto;
  transition: 0.25s;
  width: 300px;

  .sticky {
    background-color: rgba(0, 128, 0, 1);
    color: #fff;
    font-size: 3rem;
    overflow: hidden;
    padding: 2rem 0;
    position: sticky;
    text-align: center;
    top: 0;
    transition: 200ms;

    &.event {
      background-color: rgba(0, 128, 0, 0.5);
    }
    span {
      position: absolute;
    }
  }
}
.buffer {
  height: 600px;
}
.buttons {
  margin: 2rem 0;
}
</style>