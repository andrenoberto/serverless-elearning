import * as Joi from 'joi';

export class UserGroupControllerValidator {
  public static tableManagementSubscription(req, res, next): Promise<Error> {
    return Joi.validate(
      req.body,
      Joi.object().keys({
        key: Joi.string()
          .uuid({version: ['uuidv4']})
          .required()
      }).required(),
      {
        abortEarly: false,
        allowUnknown: true
      }
    )
      .then(() => next())
      .catch(err => {
        console.error(JSON.stringify(err));
        next(err);
      });
  }
}
