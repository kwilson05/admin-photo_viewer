import appClient from '~/service/ApiClient';
export const deleteImages = (ids) => {
  return appClient.post('/image/batchDelete', { imageIds: ids });
};

export const createImage = (file, imageDetails) => {
  const multiPartApi = appClient.create({
    headers: {
      'Content-Type': 'multipart/form-data; boundary=--XXX--;',
    },
  });
  const formData = new FormData();
  formData.append('imageFile', file, file.name);

  formData.append('imageDetails', JSON.stringify(imageDetails));
  return multiPartApi.post('/image', formData);
};

export const editImage = (newImageDetails) => {
  appClient.post(`/image/${newImageDetails.id}`, {
    imageDetails: newImageDetails,
  });
};
