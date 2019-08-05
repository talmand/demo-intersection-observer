<template>
  <div id="app">
    <PositionIndicator :entries="io_entries" />

    <SectionTitle data-section="title" :entry="io_entries.title" />
    <SectionDescription data-section="description" :entry="io_entries.description" />
    <SectionPerformance data-section="performance" :entry="io_entries.performance" />
    <SectionBasicExample data-section="basicExample" :entry="io_entries.basicExample" />
    <SectionCallbackEntries data-section="callbackEntries" :entry="io_entries.callbackEntries" />
    <SectionSetups data-section="setups" :entry="io_entries.setups" />
    <SectionRatio data-section="ratio" :entry="io_entries.ratio" />
    <SectionWhere data-section="where" :entry="io_entries.where" />
    <SectionBrowsers data-section="browsers" :entry="io_entries.browsers" />
    <SectionObserverV2 data-section="observerV2" :entry="io_entries.observerV2" />
  </div>
</template>

<script>
import { onMounted, value } from 'vue-function-api';

import PositionIndicator from './components/PositionIndicator.vue';
import SectionTitle from './components/SectionTitle.vue';
import SectionDescription from './components/SectionDescription.vue';
import SectionPerformance from './components/SectionPerformance.vue';
import SectionBasicExample from './components/SectionBasicExample.vue';
import SectionCallbackEntries from './components/SectionCallbackEntries.vue';
import SectionSetups from './components/SectionSetups.vue';
import SectionRatio from './components/SectionRatio.vue';
import SectionWhere from './components/SectionWhere.vue';
import SectionBrowsers from './components/SectionBrowsers.vue';
import SectionObserverV2 from './components/SectionObserverV2.vue';

export default {
  name: 'app',

  components: {
    PositionIndicator,
    SectionTitle,
    SectionDescription,
    SectionPerformance,
    SectionBasicExample,
    SectionCallbackEntries,
    SectionSetups,
    SectionRatio,
    SectionWhere,
    SectionBrowsers,
    SectionObserverV2
  },

  setup() {
    const io_options = {
      root: document.body,
      rootMargin: '-20px',
      threshold: 0
    };
    let io_observer = null;
    let io_entries = value({
      title: { section: 'title', isIntersecting: false, time: null },
      description: { section: 'description', isIntersecting: false, time: null },
      performance: { section: 'performance', isIntersecting: false, time: null },
      basicExample: { section: 'basicExample', isIntersecting: false, time: null },
      callbackEntries: { section: 'callbackEntries', isIntersecting: false, time: null },
      setups: { section: 'setups', isIntersecting: false, time: null },
      ratio: { section: 'ratio', isIntersecting: false, time: null },
      where: { section: 'where', isIntersecting: false, time: null },
      browsers: { section: 'browsers', isIntersecting: false, time: null },
      observerV2: { section: 'observerV2', isIntersecting: false, time: null }
    });

    const io_callback = (entries) => {
      entries.forEach(entry => {
        io_entries.value[entry.target.dataset.section] = {
          section: entry.target.dataset.section,
          isIntersecting: entry.isIntersecting,
          time: entry.time
        };
      });
    };

    onMounted(() => {
      io_observer = new IntersectionObserver(io_callback, io_options);

      document.querySelectorAll('[data-section]').forEach(element => {
        io_observer.observe(element);
      });
    });

    return {
      io_entries
    }
  }
}
</script>

<style lang="scss">
@import './scss/_reset.scss';
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');

html {
  box-sizing: border-box;
  font-size: 10px;
}
*, *:before, *:after {
  box-sizing: inherit;
}

body {
  background-color: #333333;
  color: #333333;
  height: 100vh;
  overflow: auto;
}

#app {
  font-family: 'Open Sans', sans-serif;
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}

h1 {
  font-size: 5rem;
  margin: 2rem 0;
  text-align: center;
}
h2 {
  font-size: 3rem;
  margin: 2rem 0;
  padding: 0 0 0 2rem;
  position: absolute;
  top: 0;
  width: 75%;

  &::after {
    border-bottom: 2px solid #333333;
    content: '';
    display: block;
    left: -2rem;
    position: relative;
    top: 0.5rem;
    transition: width 1s 0.5s;
    width: 0;
  }
}
h3 {
  font-size: 2rem;
  font-weight: bold;
  margin: 2rem 0;
}
p {
  font-size: 1.8rem;
  line-height: 1.25;
  margin: 0 0 2rem 0;
}
small {
  font-size: 1.2rem;
  margin: 1rem;
}
ul {
  font-size: 2rem;
  line-height: 1.6;
  list-style-type: decimal-leading-zero;
  margin: 1rem 0 2rem;
  padding-left: 5rem;

  li {
    padding-left: 1rem;
  }
}
pre {
  font-size: 1.4rem !important;
  margin: 0 0 3rem 0 !important;
}
button {
    background-color: #F5F5F5;
    border: 3px solid #C5C5C5;
    color: #C5C5C5;
    cursor: pointer;
    font-size: 1.6rem;
    margin: 0 2rem 0 0;
    padding: 0.5rem 1rem;
    transition: 0.25s 0.25s;

    &.active {
      border: 3px solid rebeccapurple;
      color: rebeccapurple;
      transition: 0.25s;
    }
  }

section {
  display: flex;
  height: 100vh;
  justify-content: center;
  scroll-snap-align: start;

  &.isIntersecting h2::after {
    width: 100%;
  }

  .container {
    align-items: stretch;
    background-color: #F5F5F5;
    border: 7px solid rebeccapurple;
    border-radius: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 2rem;
    overflow: auto;
    padding: 2rem;
    position: relative;
    width: 75vw;
  }
}

.time-seen {
  font-size: 1.4rem;
  position: absolute;
  right: 1rem;
  top: 1rem;
}

.fade-enter,
.fade-leave-to { opacity: 0; }
.fade-enter-active,
.fade-leave-active { transition: 0.25s; }
</style>
