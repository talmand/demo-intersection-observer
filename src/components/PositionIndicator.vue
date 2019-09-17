<template>
<nav id="position_indicator">
  <button
    v-for="entry in entries"
    :key="entry.section"
    class="indicator"
    :class="{current: entry.isIntersecting}"
    :data-target="entry.section"
    :title="entry.section"
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
    radius: 20px;
    style: solid;
    width: 4px;
  }
  border-left-style: none;
  font-size: 20px;
  padding: 5px;
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
  height: 20px;
  justify-content: center;
  margin: 0 0 5px 0;
  padding: 0;
  width: 30px;
  
  &:last-child {
    margin-bottom: 0;
  }
  &::after {
    background-color: rebeccapurple;
    border-radius: 50%;
    content: '';
    display: block;
    height: 20px;
    opacity: 0.25;
    transition: 0.5s;
    width: 20px;
  }
  &.current::after {
    height: 24px;
    opacity: 1;
    width: 24px;
  }
}
</style>
