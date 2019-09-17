<template>
<section id="section_scrolling_events" :class="{isIntersecting: entry.isIntersecting}">
  <div class="container">
    <div class="time-seen">{{ timeSeenString }}</div>

    <h2>Demo: Combining with Scrolling Events</h2>
    <div class="demo">
      <div class="demo-left">
        <h3>Triggering scrolling events</h3>
          <p>In cases where the more precise, yet expensive, scrolling events is required, it is easy enough enable and disable based on the IntersectionObserver.</p>
<prism language="javascript">const io_callback = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      context.refs.root.addEventListener('scroll', scrollingEvents);
    } else {
      context.refs.root.removeEventListener('scroll', scrollingEvents);
    }
  });
};
</prism>
        <p>In the callback function an event listener is enabled and disabled for the root element based on the target's isIntersecting property. The callback for the event listener is then invoked on scroll only when the target element is intersecting the root element.</p>
        <p>In this example the timestamp of the scroll event is displayed, but just about any traditional scroll event functionality would be possible.</p>
      </div>
      <div class="demo-right">
        <small>Scroll the target into view and scrolling events will trigger.</small>
        <div ref="root" class="root">
          <div class="buffer"></div>
          <div ref="target" class="target"></div>
          <div class="buffer"></div>
        </div>
        <div class="output">
          {{ scrollEventTimestamp }}
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
  name: 'section-scrolling-events',

  props: {
    entry: Object
  },

  components: {
    Prism
  },

  setup (props, context) {
    let timeSeenString = value(null);
    let scrollEventTimestamp = value(0);

    const scrollingEvents = (e) => {
      scrollEventTimestamp.value = e.timeStamp;
    };

    const io_callback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          context.refs.root.addEventListener('scroll', scrollingEvents);
        } else {
          context.refs.root.removeEventListener('scroll', scrollingEvents);
          scrollEventTimestamp.value = 0;
        }
      });
    };
    
    timeSeenFunction(props, timeSeenString);

    onMounted(() => {
      let io_observer = new IntersectionObserver(io_callback, { root: context.refs.root, threshold: 0 });
      io_observer.observe(context.refs.target);
    });

    return {
      timeSeenString,
      scrollEventTimestamp
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
.target {
  background-color: rebeccapurple;
  background-image: radial-gradient(ellipse at center, #ffffff 0%,#ffffff 14%,#663399 15%,#663399 34%,#ffffff 35%,#ffffff 50%,#663399 51%,#663399 99%);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 300px 300px;
  height: 1000px;
  margin: auto;
  transition: 0.25s;
  width: 300px;
}
.buffer {
  height: 600px;
}
.output {
  font-size: 2rem;
  margin: 20px;
}
</style>