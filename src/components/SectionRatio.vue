<template>
<section id="section_ratio" :class="{isIntersecting: entry.isIntersecting}">
  <div class="container">
    <div class="time-seen">{{ timeSeenString }}</div>

    <h2>Demo: The Intersection Ratio</h2>
    <div class="demo">
      <div class="demo-left">
        <h3>Understanding the intersectionRatio property</h3>
        <p>The intersectionRatio is the percentage, shown with 0 to 1, of the target element that is visible inside the root element. Since the calculated boundaries are all based on rectangles the math is not difficult, but the observer calculates it automatically.</p>
        <p>By itself the intersectionRatio doesn't indicate anything about the target element itself, such as position. The result is the same 0.5 whether the target is half off the horizontal versus half off the vertical.</p>
        <p>If the target element is larger in some way then the root element, then it's not possible for the intersectionRatio to ever hit 1; or a full 100%. If writing code that depends on that result, then this must be accounted for.</p>
        <p>Also note, the calculation is not always the most accurate. For instance, it's possible to see a result of 1 or 0.9 when the target element is fully intersecting the root element. This may need to be accounted for in code that is dependent on that result.</p>
      </div>
      <div class="demo-right">
        <div ref="root" class="root">
          <div ref="target" class="target" :class="moveTarget"></div>
          <div ref="overlay" class="ratio-overlay"></div>
        </div>
        <div class="output">
          <p>intersectionRatio: {{ intersectionRatio }}</p>
        </div>
        <div class="buttons">
          <button :class="{ active: moveTarget === '' }" @click="moveTarget = ''">center</button>
          <button :class="{ active: moveTarget === 'left' }" @click="moveTarget = 'left'">left</button>
          <button :class="{ active: moveTarget === 'top' }" @click="moveTarget = 'top'">top</button>
          <button :class="{ active: moveTarget === 'corner' }" @click="moveTarget = 'corner'">corner</button>
          <button :class="{ active: moveTarget === 'large' }" @click="moveTarget = 'large'">large</button>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import { onMounted, ref } from '@vue/composition-api';
import { timeSeenFunction } from '../functions/utils';

export default {
  name: 'section-ratio',

  props: {
    entry: Object
  },

  setup (props, context) {
    let timeSeenString = ref(null);
    let moveTarget = ref('');
    let intersectionRatio = ref(null);

    const io_callback = (entries) => {
      entries.forEach(entry => {
        let overlay = context.refs.overlay;
        let intersectionRect = entry.intersectionRect;
        let rootBounds = entry.rootBounds;

        intersectionRatio.value = entry.intersectionRatio;

        if (intersectionRatio.value < 1) {
          overlay.style.opacity = 0.5;
          overlay.style.height = intersectionRect.height + 'px';
          overlay.style.width = intersectionRect.width + 'px';
          overlay.style.top = Math.floor(intersectionRect.top - rootBounds.top - 3) + 'px';
          overlay.style.left = Math.floor(intersectionRect.left - rootBounds.left - 3) + 'px';
        } else {
          overlay.style.opacity = 0;
        }
      });
    };
    
    timeSeenFunction(props, timeSeenString);

    onMounted (() => {
      let io_observer = new IntersectionObserver(io_callback, { root: context.refs.root, threshold: [...Array(100).keys()].map(x => x / 100) });
      io_observer.observe(context.refs.target);
    });

    return {
      timeSeenString,
      moveTarget,
      intersectionRatio
    }
  }
}
</script>

<style lang="scss" scoped>
.demo {
  display: flex;
}
.demo-left {
  padding-right: 50px;
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
  overflow: visible;
  position: relative;
  width: 400px;
}
.target {
  background-color: rebeccapurple;
  background-image: radial-gradient(ellipse at center, #ffffff 0%,#ffffff 14%,#663399 15%,#663399 34%,#ffffff 35%,#ffffff 50%,#663399 51%,#663399 99%);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 200px;
  height: 300px;
  pointer-events: none;
  transition: 0.5s;
  width: 300px;
  
  &.left {
    opacity: 0.5;
    transform: translate3d(-200px, 0, 0);
  }
  &.top {
    opacity: 0.5;
    transform: translate3d(0, -200px, 0);
  }
  &.corner {
    opacity: 0.5;
    transform: translate3d(200px, -200px, 0);
  }
  &.large {
    height: 500px;
    opacity: 0.5;
  }
}
.ratio-overlay {
  background-color: #307B21;
  left: 0;
  opacity: 0.5;
  position: absolute;
  top: 0;
}
.output {
  font-size: 2rem;
  margin: 20px;
}
</style>