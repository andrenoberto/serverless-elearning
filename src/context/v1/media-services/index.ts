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

export const updateMediaAfterConvertIsDone = (event, context, callback) => {
  try {
    MediaServicesController.updateMediaAfterConvertIsDone(event);
    context.done();
  } catch (err) {
    callback(err);
  }
};
