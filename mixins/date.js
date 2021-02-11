import { DateTime } from 'luxon';
export default {
  methods: {
    formatDate(isoDate) {
      return DateTime.fromISO(isoDate).toFormat('DD');
    },
  },
};
