<template>
<nav id="position_indicator">
  <div
    v-for="entry in entries"
    :key="entry.section"
    class="indicator"
    :class="{current: entry.isIntersecting}"
    :data-target="entry.section"
    @click="scrollToTarget"
  ></div>
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
  cursor: pointer;
  display: flex;
  height: 3rem;
  justify-content: center;
  margin-bottom: 0.5rem;
  width: 3rem;

  &:last-child {
    margin-bottom: 0;
  }
  &::after {
    background-color: rebeccapurple;
    border-radius: 50%;
    content: '';
    display: block;
    height: 50%;
    opacity: 0.25;
    transition: 0.25s;
    width: 50%;
  }
  &.current::after {
    height: 100%;
    opacity: 1;
    width: 100%;
  }
}
</style>
