import { DateTime } from 'luxon';
import flatPickr from 'vue-flatpickr-component';
export default {
  components: { flatPickr },
  data() {
    return {
      flatpickrConfig: {
        altFormat: 'M j, Y',
        altInput: true,
        static: true,
      },
    };
  },
  methods: {
    formatDate(isoDate) {
      return DateTime.fromISO(isoDate).toFormat('DD');
    },
  },
};
