import { setClient } from '~/service/ApiClient';

export default ({ app, store }) => {
  setClient(app.$axios);
};
