<template>
<section id="section_lazy_images" :class="{isIntersecting: entry.isIntersecting}">
  <div class="container">
    <div class="time-seen">{{ timeSeenString }}</div>

    <h2>Demo: Lazy Loading Images</h2>
    <div class="demo">
      <div class="demo-left">
        <h3>Load images on demand</h3>
        <p>This <a href="https://css-tricks.com/native-lazy-loading/">feature</a> may eventually be native to browsers in the future, but here's an easy way to do it today.</p>
<prism language="html">&lt;img class="target-img" src="base64 data" data-src="/images/image_a.png" alt="image a" /&gt;
&lt;img class="target-img" src="/images/dialexa_small.jpg"
    data-src="/images/dialexa.jpg" alt="dialexa" /&gt;
</prism>
<prism language="javascript">onMounted(() => {
  io_observer = new IntersectionObserver(io_callback, {
    root: context.refs.root,
    rootMargin: '0px 0px -75% 0px',
    threshold: 0
  });

  document.querySelectorAll('.target-img').forEach(img => {
    io_observer.observe(img);
  });
});

const io_callback = (entries) => {
  entries.forEach(entry => {
    if (entry.target.dataset.src && entry.isIntersecting) {
      entry.target.setAttribute('src', entry.target.dataset.src);
      entry.target.removeAttribute('data-src');
      io_observer.unobserve(entry.target);
    }
  });
};
</prism>
      </div>
      <div class="demo-right">
        <small>Scroll the images into view to see them load.</small>
        <div ref="root" class="root">
          <div class="buffer"></div>
          <img class="target-img" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="/images/image_a.png" alt="image a" />
          <div class="buffer"></div>
          <img class="target-img" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="/images/image_b.png" alt="image b" />
          <div class="buffer"></div>
          <img class="target-img" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="/images/image_c.png" alt="image c" />
          <div class="buffer"></div>
          <img class="target-img" src="/images/dialexa_small.jpg" data-src="/images/dialexa.jpg" alt="dialexa" />
          <div class="buffer"></div>
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
  name: 'section-lazy-images',

  props: {
    entry: Object
  },

  components: {
    Prism
  },

  setup (props, context) {
    let timeSeenString = ref(null);
    let io_observer = null;

    const io_callback = (entries) => {
      entries.forEach(entry => {
        if (entry.target.dataset.src && entry.isIntersecting) {
          entry.target.setAttribute('src', entry.target.dataset.src);
          entry.target.removeAttribute('data-src');
          io_observer.unobserve(entry.target);
        }
      });
    };
    
    timeSeenFunction(props, timeSeenString);

    onMounted(() => {
      io_observer = new IntersectionObserver(io_callback, { root: context.refs.root, rootMargin: '0px 0px -75% 0px', threshold: 0 });

      document.querySelectorAll('.target-img').forEach(img => {
        io_observer.observe(img);
      });
    });

    return {
      timeSeenString
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

.buffer {
  height: 110%;
}
.target-img {
  border-top: 1px solid rebeccapurple;
  color: #fff;
  font-size: 2rem;
  display: block;
  width: 100%;
}
</style>