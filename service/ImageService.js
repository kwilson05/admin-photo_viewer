import appClient from '~/service/ApiClient';
export const deleteImages = (ids) => {
  return appClient.post('/image/batchDelete', { imageIds: ids });
};
