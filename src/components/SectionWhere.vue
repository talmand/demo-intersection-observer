<template>
<section id="section_where" :class="{isIntersecting: entry.isIntersecting}">
  <div class="container">
    <div class="time-seen">{{ timeSeenString }}</div>

    <h2>Demo: Where Is It?</h2>
    <div class="demo">
      <div class="demo-left">
        <h3>Finding the position</h3>
        <p>Data from the IntersectionObserverEntry can be used to determine where the target element is in relation to the root element.</p>
<prism language="javascript">const io_callback = (entries) => {
  entries.forEach(entry => {
    let ratio = entry.intersectionRatio;
    let boundingRect = entry.boundingClientRect;
    let intersectionRect = entry.intersectionRect;
    
    if (ratio === 0) {
      positionString.value = 'outside';
    } else if (ratio &lt; 1) {
      if (boundingRect.top &lt; intersectionRect.top) {
        positionString.value = 'on the top';
      } else {
        positionString.value = 'on the bottom';
      }
    } else {
      positionString.value = 'inside';
    }
  });
};
</prism>
        <p>Keep in mind that the size of the target element in relation to the root element will influence the results. If the target element is the same height or taller than the root element then it can't be seen as "inside". Only when the target element is smaller than the root element can it be seen as inside.</p>
      </div>
      <div class="demo-right">
        <small>Scroll the target into view and its position will be displayed below.</small>
        <div ref="root" class="root" :class="{ large: isRootLarge }">
          <div class="buffer"></div>
          <div ref="target" class="target" :class="{ small: isTargetSmall }"></div>
          <div class="buffer"></div>
        </div>
        <div class="output">
          {{ positionString }}
        </div>
        <div>
          <button @click="isTargetSmall = !isTargetSmall" class="active">toggle target size</button>
          <button @click="isRootLarge = !isRootLarge" class="active">toggle root size</button>
        </div>
      </div>
    </div>

  </div>
</section>
</template>

<script>
import { onMounted, ref } from '@vue/composition-api';
import { timeSeenFunction } from '../functions/utils';
import Prism from 'vue-prism-component';

export default {
  name: 'section-where',

  props: {
    entry: Object
  },

  components: {
    Prism
  },

  setup (props, context) {
    let isRootLarge = ref(false);
    let isTargetSmall = ref(false);
    let timeSeenString = ref(null);
    let positionString = ref(null);

    const io_callback = (entries) => {
      entries.forEach(entry => {
        let ratio = entry.intersectionRatio;
        let boundingRect = entry.boundingClientRect;
        let intersectionRect = entry.intersectionRect;
        
        if (ratio === 0) {
          positionString.value = 'outside';
        } else if (ratio < 1) {
          if (boundingRect.top < intersectionRect.top) {
            positionString.value = 'on the top';
          } else {
            positionString.value = 'on the bottom';
          }
        } else {
          positionString.value = 'inside';
        }
      });
    };
    
    timeSeenFunction(props, timeSeenString);

    onMounted(() => {
      let io_observer = new IntersectionObserver(io_callback, { root: context.refs.root, threshold: [0, 0.5, 1] });
      io_observer.observe(context.refs.target);
    });

    return {
      isTargetSmall,
      isRootLarge,
      timeSeenString,
      positionString
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

  &.large {
    height: 600px;
  }
}
.target {
  background-color: rebeccapurple;
  background-image: radial-gradient(ellipse at center, #ffffff 0%,#ffffff 14%,#663399 15%,#663399 34%,#ffffff 35%,#ffffff 50%,#663399 51%,#663399 99%);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 300px 300px;
  height: 500px;
  margin: auto;
  transition: 0.25s;
  width: 300px;

  &.small {
    background-size: 200px;
    height: 200px;
  }
}
.buffer {
  height: 600px;
}
.output {
  font-size: 2rem;
  margin: 20px;
}
</style>