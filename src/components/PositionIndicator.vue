<template>
<nav id="position_indicator">
  <button
    v-for="entry in entries"
    :key="entry.section"
    class="indicator"
    :class="{current: entry.isIntersecting}"
    :data-target="entry.section"
    @click="scrollToTarget"
  ></button>
</nav>
</template>

<script>
export default {
  name: 'position-indicator',

  props: {
    entries: Object
  },

  setup () {
    const scrollToTarget = (e) => {
      let target = e.target.dataset.target;

      document.querySelector(`[data-section="${target}"]`).scrollIntoView({behavior: 'smooth', block: 'start'});
    };

    return {
      scrollToTarget
    }
  }
}
</script>

<style lang="scss" scoped>
nav {
  background-color: #fff;
  border: {
    color: rebeccapurple;
    radius: 2rem;
    style: solid;
    width: 4px;
  }
  border-left-style: none;
  font-size: 2rem;
  padding: 0.5rem;
  position: absolute;
  top: 50%;
  transform: translate3d(0, -50%, 0);
}
.indicator {
  align-items: center;
  background: none;
  border-style: none;
  cursor: pointer;
  display: flex;
  height: 3rem;
  justify-content: center;
  margin: 0 0 0.5rem 0;
  padding: 0;
  width: 3rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  &::after {
    background-color: rebeccapurple;
    border-radius: 50%;
    content: '';
    display: block;
    height: 2rem;
    opacity: 0.25;
    transition: 0.5s;
    width: 2rem;
  }
  &.current::after {
    height: 3rem;
    opacity: 1;
    width: 3rem;
  }
}
</style>
