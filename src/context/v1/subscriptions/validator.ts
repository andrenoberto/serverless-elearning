import * as Joi from 'joi';

export class SubscriptionControllerValidator {
  public static newSubscription(req, res, next): Promise<Error> {
    return Joi.validate(
      req.body,
      Joi.object().keys({
        active: Joi.boolean().required(),
        name: Joi.string().required(),
        description: Joi.string(),
        plans: Joi.array().required(),
        accessGroup: Joi.array().required()
      }).required(),
      {
        abortEarly: false,
        allowUnknown: true,
      }
    )
      .then(() => next())
      .catch(err => {
        console.error(JSON.stringify(err));
        next(err);
      });
  }
}
