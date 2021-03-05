import axios from '@nuxtjs/axios';
export const deleteImages = (images) => {
  return axios.post('/image/batchDelete', images);
};
