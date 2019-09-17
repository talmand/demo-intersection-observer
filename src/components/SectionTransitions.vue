<template>
<section id="section_transitions" :class="{isIntersecting: entry.isIntersecting}">
  <div class="container">
    <div class="time-seen">{{ timeSeenString }}</div>

    <h2>Demo: Vue Transitions While Intersecting</h2>
    <div class="panel">
      <button @click="show = 'mounted'" :class="{active: show === 'mounted'}">onMounted()</button>
      <button @click="show = 'callback'" :class="{active: show === 'callback'}">callback</button>
      <button @click="show = 'html'" :class="{active: show === 'html'}">html</button>
    </div>

    <div class="demo">
      <div class="demo-left">
        <transition name="fade" mode="out-in">
          <div v-if="show === 'mounted'" key="mounted">
            <p>This is the onMounted function for this component.</p>
<prism language="javascript">onMounted(() => {
  let io_observer = new IntersectionObserver(io_callback, {
    root: context.refs.root, rootMargin: '-100px 0px -150px 0px', threshold: 0 
  });
  io_observer.observe(context.refs.target);

  context.refs.target.querySelectorAll('.target-child').forEach(child => {
    io_observer.observe(child);
  });
});
</prism>
            <p>The IntersectionObserver is setup with negative vertical values on the rootMargin so the transitions can be seen.</p>
            <p>The context refs is used to observe the target container which has the ref attribute value of "target".</p>
            <p>Then a loop is done on all the children of the target container that have the class "target-child" so that each of those can be observed by the same observer.</p>
          </div>
          <div v-else-if="show === 'callback'" key="callback">
            <p>This is the callback function of the IntersectionObserver of this component.</p>
<prism language="javascript">const io_callback = (entries) => {
  entries.forEach(entry => {
    if (entry.target.classList.contains('target')) {
      targetKey.value = entry.isIntersecting ? 'active' : 'inactive';
      targetString.value = entry.isIntersecting ? 
        'intersecting!' : 'not intersecting...';
    }

    children_isIntersecting.value[`child${entry.target.dataset.child}`]
       = entry.isIntersecting;
  });
};
</prism>
            <p>Each time an IntersectionObserverEntry is provided, two things happen:</p>
            <p>If the entry has the class "target" then the targetKey and targetString variables are updated to change the key and text of the headlines of the target container. The key has to be updated with the text so that the transition effect will trigger. </p>
            <p>Then an object is updated to reflect the current state of the target children so that each will trigger their transitions as needed.</p>
          </div>
          <div v-else-if="show === 'html'" key="html">
            <p>Here is the HTML of the target container and its children.</p>
<prism language="html">&lt;div ref="target" class="target"&gt;
  &lt;transition name="fade" mode="out-in"&gt;
    &lt;h3 :key="targetKey" class="targetKey"&gt;{{ targetString }}&lt;/h3&gt;
  &lt;/transition&gt;

  &lt;div class="target-child" 
    :class="{active: children_isIntersecting['child1']}" 
    data-child="1"
  &gt;
    &lt;transition name="slide-left"&gt;
      &lt;div v-if="children_isIntersecting['child1']"&gt;sliding to the left&lt;/div&gt;
    &lt;/transition&gt;
  &lt;/div&gt;
&lt;/div&gt;
</prism>
            <p>Notice that the parent has the ref attribute that is used within the JavaScript.</p>
            <p>The headline is wrapped in a transition component with the appropriate dynamic key attribute and text changed from the callback function.</p>
            <p>The target children (only one is shown) are themselves a container with a dynamic class showing intersection status, this changes the background and text color.</p>
            <p>Each target child has a div with a v-if check wrapped in a transition, once the boolean is flipped the transition reacts accordingly.</p>
          </div>
        </transition>
      </div>
      <div class="demo-right">
        <small>Scroll the target into view to see different transition effects.</small>
        <div ref="root" class="root">
          <div class="buffer"></div>
          <div ref="target" class="target">
            <h3 class="targetKey">This is the target container and it's...</h3>
            <transition name="fade" mode="out-in">
              <h3 :key="targetKey" class="targetKey">{{ targetString }}</h3>
            </transition>

            <div class="target-child" :class="{active: children_isIntersecting['child1']}" data-child="1">
              <transition name="slide-left">
                <div v-if="children_isIntersecting['child1']">sliding to the left</div>
              </transition>
            </div>
            <div class="target-child" :class="{active: children_isIntersecting['child2']}" data-child="2">
              <transition name="slide-right">
                <div v-if="children_isIntersecting['child2']">sliding to the right</div>
              </transition>
            </div>
            <div class="target-child" :class="{active: children_isIntersecting['child3']}" data-child="3">
              <transition name="rotate">
                <div v-if="children_isIntersecting['child3']">rotating in</div>
              </transition>
            </div>
            <div class="target-child" :class="{active: children_isIntersecting['child4']}" data-child="4">
              <transition name="spin">
                <div v-if="children_isIntersecting['child4']">spinning in</div>
              </transition>
            </div>
            <div class="target-child" :class="{active: children_isIntersecting['child5']}" data-child="5">
              <transition name="slide-left">
                <div v-if="children_isIntersecting['child5']">sliding to the left</div>
              </transition>
            </div>
            <div class="target-child" :class="{active: children_isIntersecting['child6']}" data-child="6">
              <transition name="slide-right">
                <div key="wait" v-if="!children_isIntersecting['child6']">wait for it...</div>
                <div key="bye" v-else>goodbye!</div>
              </transition>
            </div>

            <h3 class="targetKey">This is the target container and it's...</h3>
            <transition name="fade" mode="out-in">
              <h3 :key="targetKey" class="targetKey">{{ targetString }}</h3>
            </transition>
          </div>
          <div class="buffer"></div>
        </div>
        <div class="demo-output">
          
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
  name: 'section-transitions',

  props: {
    entry: Object
  },

  components: {
    Prism
  },

  setup (props, context) {
    let show = value('mounted');
    let timeSeenString = value(null);
    let targetKey = value('inactive');
    let targetString = value('');
    let children_isIntersecting = value({
      child1: false,
      child2: false,
      child3: false,
      child4: false,
      child5: false,
      child6: false
    });

    const io_callback = (entries) => {
      entries.forEach(entry => {
        if (entry.target.classList.contains('target')) {
          targetKey.value = entry.isIntersecting ? 'active' : 'inactive';
          targetString.value = entry.isIntersecting ? 'intersecting!' : 'not intersecting...';
        }

        children_isIntersecting.value[`child${entry.target.dataset.child}`] = entry.isIntersecting;
      });
    };

    timeSeenFunction(props, timeSeenString);

    onMounted(() => {
      let io_observer = new IntersectionObserver(io_callback, { root: context.refs.root, rootMargin: '-100px 0px -150px 0px', threshold: 0 });
      io_observer.observe(context.refs.target);

      context.refs.target.querySelectorAll('.target-child').forEach(child => {
        io_observer.observe(child);
      });
    });
    
    return {
      show,
      timeSeenString,
      targetKey,
      children_isIntersecting,
      targetString
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
  width: 400px;
}
.target {
  border-bottom: 7px solid rebeccapurple;
  border-top: 7px solid rebeccapurple;
  margin: auto;
  width: 350px;
}
.target-child {
  align-items: center;
  display: flex;
  font-size: 3rem;
  height: 150px;
  justify-content: center;
  overflow: hidden;
  transition: 0.5s;
  width: 100%;

  &.active {
    background-color: rebeccapurple;
    color: #fff;
  }
}
.buffer {
  height: 600px;
}
.output {
  font-size: 2rem;
  margin: 20px;
}

.targetKey {
  text-align: center;
}

.panel {
  margin: 20px 0;
  position: absolute;
  top: 50px;
}
</style>