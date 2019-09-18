import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';

Vue.use(VueCompositionApi);

import { watch } from '@vue/composition-api';

export const timeSeenFunction = (props, timeSeenString) => {
  const stop = watch(
    () => props.entry.time,
    time => {
      if (props.entry.isIntersecting && !timeSeenString.value) {
        let minutes = Math.floor(time / 60000);
        let seconds = Math.floor((time - minutes * 60000) / 1000);

        if (minutes < 1) {
          timeSeenString.value = `It took you ${seconds} seconds to see this!`;
        } else if (minutes >= 1 && minutes < 2) {
          timeSeenString.value = `It took you ${minutes} minute and ${seconds} seconds to see this!`;
        } else {
          timeSeenString.value = `It took you ${minutes} minutes and ${seconds} seconds to see this!`;
        }
      }
    }
  );

  if (timeSeenString.value) {
    stop();
  }
}