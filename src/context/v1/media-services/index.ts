import {MediaServicesController} from '@api/v1/media-services/controller';

const controller = new MediaServicesController();

export const encodeVideo = (event, context, callback) => {
  controller.convert(event)
    .then(() => {
      context.done();
    })
    .catch(err => {
      callback(err);
    });
};
