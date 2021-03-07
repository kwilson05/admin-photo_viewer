import appClient from '~/service/ApiClient';
export const deleteImages = (imageIds) => {
  return appClient.post('/image/batchDelete', imageIds);
};
