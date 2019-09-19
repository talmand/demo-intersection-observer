<template>
  <div id="app">
    <PositionIndicator :entries="io_entries" />

    <SectionTitle data-section="title" :entry="io_entries.title" />
    <SectionDescription data-section="description" :entry="io_entries.description" />
    <SectionBasicExample data-section="basicExample" :entry="io_entries.basicExample" />
    <SectionCallbackEntries data-section="callbackEntries" :entry="io_entries.callbackEntries" />
    <SectionSetups data-section="setups" :entry="io_entries.setups" />
    <SectionPerformance data-section="performance" :entry="io_entries.performance" />
    <SectionRatio data-section="ratio" :entry="io_entries.ratio" />
    <SectionWhere data-section="where" :entry="io_entries.where" />
    <SectionPositionSticky data-section="sticky" :entry="io_entries.sticky" />
    <SectionTransitions data-section="transitions" :entry="io_entries.transitions" />
    <SectionScrollingEvents data-section="scrolling" :entry="io_entries.scrolling" />
    <SectionLazyImages data-section="images" :entry="io_entries.images" />
    <SectionLazyComponents data-section="components" :entry="io_entries.components" />
    <SectionBrowsers data-section="browsers" :entry="io_entries.browsers" />
    <SectionObserverV2 data-section="observerV2" :entry="io_entries.observerV2" />
    <SectionCredits data-section="credits" :entry="io_entries.credits" />
  </div>
</template>

<script>
import { onMounted, reactive } from '@vue/composition-api';

import PositionIndicator from './components/PositionIndicator.vue';
import SectionTitle from './components/SectionTitle.vue';
import SectionDescription from './components/SectionDescription.vue';
import SectionBasicExample from './components/SectionBasicExample.vue';
import SectionCallbackEntries from './components/SectionCallbackEntries.vue';
import SectionSetups from './components/SectionSetups.vue';
import SectionPerformance from './components/SectionPerformance.vue';
import SectionRatio from './components/SectionRatio.vue';
import SectionWhere from './components/SectionWhere.vue';
import SectionPositionSticky from './components/SectionPositionSticky.vue';
import SectionTransitions from './components/SectionTransitions.vue';
import SectionScrollingEvents from './components/SectionScrollingEvents.vue';
import SectionLazyImages from './components/SectionLazyImages.vue';
import SectionLazyComponents from './components/SectionLazyComponents.vue';
import SectionBrowsers from './components/SectionBrowsers.vue';
import SectionObserverV2 from './components/SectionObserverV2.vue';
import SectionCredits from './components/SectionCredits.vue';

export default {
  name: 'app',

  components: {
    PositionIndicator,
    SectionTitle,
    SectionDescription,
    SectionBasicExample,
    SectionCallbackEntries,
    SectionSetups,
    SectionPerformance,
    SectionRatio,
    SectionWhere,
    SectionPositionSticky,
    SectionTransitions,
    SectionScrollingEvents,
    SectionLazyImages,
    SectionLazyComponents,
    SectionBrowsers,
    SectionObserverV2,
    SectionCredits
  },

  setup() {
    const io_options = {
      root: document.body,
      rootMargin: '-20px',
      threshold: 0
    };
    let io_observer = null;
    let io_entries = reactive({
      title: { section: 'title', isIntersecting: false, time: null },
      description: { section: 'description', isIntersecting: false, time: null },
      basicExample: { section: 'basicExample', isIntersecting: false, time: null },
      callbackEntries: { section: 'callbackEntries', isIntersecting: false, time: null },
      setups: { section: 'setups', isIntersecting: false, time: null },
      performance: { section: 'performance', isIntersecting: false, time: null },
      ratio: { section: 'ratio', isIntersecting: false, time: null },
      where: { section: 'where', isIntersecting: false, time: null },
      sticky: { section: 'sticky', isIntersecting: false, time: null },
      transitions: { section: 'transitions', isIntersecting: false, time: null },
      scrolling: { section: 'scrolling', isIntersecting: false, time: null },
      images: { section: 'images', isIntersecting: false, time: null },
      components: { section: 'components', isIntersecting: false, time: null },
      browsers: { section: 'browsers', isIntersecting: false, time: null },
      observerV2: { section: 'observerV2', isIntersecting: false, time: null },
      credits: { section: 'credits', isIntersecting: false, time: null }
    });

    const io_callback = (entries) => {
      entries.forEach(entry => {
        io_entries[entry.target.dataset.section] = {
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
  font-size: 11px;
}
*, *:before, *:after {
  box-sizing: inherit;
}

body {
  background-color: #F5F5F5;
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
  margin: 20px 0;
  text-align: center;
}
h2 {
  font-size: 30px;
  margin: 20px 0;
  padding: 0 0 0 20px;
  position: absolute;
  top: 0;
  width: 75%;

  &::after {
    border-bottom: 2px solid #333333;
    content: '';
    display: block;
    left: -20px;
    position: relative;
    top: 5px;
    transition: width 1s 0.5s;
    width: 0;
  }
}
h3 {
  font-size: 2rem;
  font-weight: bold;
  margin: 20px 0;
}
p {
  font-size: 1.8rem;
  line-height: 1.25;
  margin: 0 0 20px 0;
}
small {
  font-size: 1.2rem;
  margin: 10px;
}
strong {
  font-weight: 700;
}
ul {
  font-size: 2rem;
  line-height: 1.6;
  list-style-type: decimal-leading-zero;
  margin: 10px 0 20px;
  padding-left: 50px;

  li {
    padding-left: 10px;
  }
}
pre {
  font-size: 1.4rem !important;
  margin: 0 0 30px 0 !important;
}
button {
    background-color: #F5F5F5;
    border: 3px solid #C5C5C5;
    color: #C5C5C5;
    cursor: pointer;
    font-size: 1.6rem;
    margin: 0 20px 0 0;
    padding: 5px 10px;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 20px;
    overflow: auto;
    padding: 20px;
    position: relative;
    width: 90vw;
  }
}

.time-seen {
  font-size: 14px;
  position: absolute;
  right: 10px;
  top: 10px;
}

.fade-enter,
.fade-leave-to { opacity: 0; }
.fade-enter-active,
.fade-leave-active { transition: 0.25s; }

.slide-left-enter { opacity: 0; transform: scale3d(2, 0.5, 1) translate3d(200px, 0, 0); }
.slide-right-enter { opacity: 0; transform: scale3d(2, 0.5, 1) translate3d(-200px, 0, 0); }
.slide-down-enter { opacity: 0; transform: scale3d(2, 0.5, 1) translate3d(0, -200px, 0); }
.slide-down-enter { opacity: 0; transform: scale3d(2, 0.5, 1) translate3d(0, 200px, 0); }
.slide-left-enter-to,
.slide-right-enter-to,
.slide-down-enter-to,
.slide-up-enter-to { transform: scale3d(1, 1, 1); }
.slide-left-enter-active, .slide-left-leave-active,
.slide-right-enter-active, .slide-right-leave-active,
.slide-down-enter-active, .slide-down-leave-active,
.slide-up-enter-active, .slide-up-leave-active { transition: 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
.slide-left-leave { transform: scale3d(1, 1, 1); }
.slide-left-leave-to { opacity: 0; transform: scale3d(2, 0.5, 1) translate3d(-200px, 0, 0); }
.slide-right-leave-to { opacity: 0; transform: scale3d(2, 0.5, 1) translate3d(200px, 0, 0); }
.slide-down-leave-to { opacity: 0; transform: scale3d(2, 0.5, 1) translate3d(0, 200px, 0); }
.slide-down-leave-to { opacity: 0; transform: scale3d(2, 0.5, 1) translate3d(0, -200px, 0); }

.rotate-enter { transform: perspective(2000px) rotate3d(0, 1, 0, 90deg); }
.rotate-enter-active, .rotate-leave-active { transition: 0.5s cubic-bezier(0.645, 0.045, 0.355, 1); }
.rotate-leave-to { transform: perspective(2000px) rotate3d(0, 1, 0, -90deg); }

.spin-enter { transform: perspective(500px) rotate3d(0, 0, 1, 90deg); }
.spin-enter-active, .spin-leave-active { transition: 0.5s cubic-bezier(0.645, 0.045, 0.355, 1); }
.spin-leave-to { transform: perspective(500px) rotate3d(0, 0, 1, -90deg); }
</style>
