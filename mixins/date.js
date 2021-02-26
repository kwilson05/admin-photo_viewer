import { DateTime } from 'luxon';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
export default {
  components: { flatPickr },
  data() {
    return {
      flatpickrConfig: {
        altFormat: 'M j, Y',
        altInput: true,
        static: true,
        disableMobile: true,
      },
    };
  },
  methods: {
    formatDate(isoDate) {
      return DateTime.fromISO(isoDate).toFormat('DD');
    },
  },
};
