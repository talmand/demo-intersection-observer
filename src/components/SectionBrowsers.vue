<template>
<section id="section_browsers" :class="{isIntersecting: entry.isIntersecting}">
  <div class="container">
    <div class="time-seen">{{ timeSeenString }}</div>

    <h2>Browser Differences</h2>
    <div class="panel">
      <button @click="show = 'transform'" :class="{active: show === 'transform'}">transform</button>
      <button @click="show = 'clip'" :class="{active: show === 'clip'}">clip-path</button>
    </div>

    <div class="demo">
      <transition name="fade" mode="out-in" @after-enter="updateObserver">
        <div v-if="show === 'transform'" key="transform_text" class="demo-left">
          <h3>Intersection while transforming an element</h3>
          <p>Consider using the transform CSS property to animate the target element in relation to the root element.</p>
          <p>In Firefox this behavior works as expected, the intersectionRatio amount updates as the target element animates in and out of the root element.</p>
          <p>In Chrome this behavior is a bit different. Left to its own the intersectionRatio does not update as the target element animates. Although, if you were to move the mouse when the target element is intersecting the root element, then the amount updates. This suggests that Chrome often requires some sort of user interaction to happen within the browser for the Intersection Observer to fire its callback function.</P>
        </div>
        <div v-else-if="show === 'clip'" key="clip_text" class="demo-left">
          <h3>Root element has a clip-path</h3>
          <p>Consider having an animated clip-path property on the target element that alters the visible bounding box of the target.</p>
          <p>In Firefox the initial intersection ratio is calculated and reported. As the clip-path is animated the intersection ratio is not updated.</p>
          <p>In Chrome the intersection ratio is updated as the clip-path animates forcing the target's perceived bounding box in and out of the root element.</p>
        </div>
      </transition>
      <transition name="fade" mode="out-in">
        <div v-if="show === 'transform'" key="transform_demo" class="demo-right">
          <div ref="root" class="root">
            <div ref="target" class="target transform" :class="{active: show === 'transform' && entry.isIntersecting}"></div>
          </div>
          <div class="output">
            intersectionRatio: <br /> {{ intersectionRatio }}
          </div>
        </div>
        <div v-else-if="show === 'clip'" key="clip_demo" class="demo-right">
          <div ref="root" class="root">
            <div ref="target" class="target clip" :class="{active: show === 'clip' && entry.isIntersecting}"></div>
          </div>
          <div class="output">
            intersectionRatio: <br /> {{ intersectionRatio }}
          </div>
        </div>
      </transition>
    </div>
  </div>
</section>
</template>

<script>
import { onMounted, ref } from '@vue/composition-api';
import { timeSeenFunction } from '../functions/utils';

export default {
  name: 'section-browsers',

  props: {
    entry: Object
  },

  setup (props, context) {
    let show = ref('transform');
    let timeSeenString = ref(null);
    let intersectionRatio = ref(null);
    let io_observer = null;

    const io_callback = entries => {
      entries.forEach(entry => {
        intersectionRatio.value = entry.intersectionRatio;
      });
    };

    const updateObserver = () => {
      io_observer = new IntersectionObserver(io_callback, { root: context.refs.root, threshold: [...Array(100).keys()].map(x => x / 100) });
      io_observer.observe(context.refs.target);
    };

    onMounted(() => {
      io_observer = new IntersectionObserver(io_callback, { root: context.refs.root, threshold: [...Array(100).keys()].map(x => x / 100) });
      io_observer.observe(context.refs.target);
    });
    
    timeSeenFunction(props, timeSeenString);

    return {
      show,
      timeSeenString,
      intersectionRatio,
      updateObserver
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
  align-items: center;
  border: 3px solid rebeccapurple;
  display: flex;
  height: 400px;
  justify-content: center;
  overflow: hidden;
  position: relative;
  width: 400px;
}
.target {
  background-color: rebeccapurple;
  background-image: radial-gradient(ellipse at center, #ffffff 0%,#ffffff 14%,#663399 15%,#663399 34%,#ffffff 35%,#ffffff 50%,#663399 51%,#663399 99%);
  background-position: center;
  background-repeat: no-repeat;
  height: 300px;
  pointer-events: none;
  transition: 0.5s;
  width: 300px;
}
.output {
  font-size: 2rem;
  margin: 20px;
  text-align: center;
  width: 100%;
}

.panel {
  margin: 20px 0;
  position: absolute;
  top: 50px;
}

.target.transform.active {
  animation: sidetoside 5s linear infinite alternate;
}
@keyframes sidetoside {
  0% {
    transform: translate3d(-400px, 0, 0);
  }
  100% {
    transform: translate3d(400px, 0, 0);
  }
}

.target.clip {
  height: 400px;
  width: 400px;
}
.target.clip.active {
  animation: grow 3s linear infinite alternate;
}
@keyframes grow {
  0% {
    clip-path: circle(100%);
  }
  100% {
    clip-path: circle(25%);
  }
}
</style>