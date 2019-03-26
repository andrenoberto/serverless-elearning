import {MediaServicesController} from '@api/v1/media-services/controller';

const controller = new MediaServicesController();

export const encodeVideo = (event, context, callback) => {
  controller.createEncodeJob(event)
    .then(() => {
      context.done();
    })
    .catch(err => {
      callback(err);
    });
};

export const notify = (event, context, callback) => {
  try {
    controller.notify(event);
    context.done();
  } catch (err) {
    callback(err);
  }
};
