import * as Joi from 'joi';

export class SubscriptionControllerValidator {
  public static batchDeleteSubscription(req, res, next): Promise<Error> {
    return Joi.validate(
      req.body,
      Joi.object().keys({
        uuids: Joi.array().items(Joi.string().uuid().required()).required()
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

  public static putSubscription(req, res, next): Promise<Error> {
    return Joi.validate(
      req.body,
      Joi.object().keys({
        active: Joi.boolean().required(),
        name: Joi.string().required(),
        description: Joi.string(),
        days: Joi.number().required(),
        price: Joi.number().required(),
        userGroups: Joi.array().items(Joi.string().min(1).required()).required()
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

  public static updateSubscription(req, res, next): Promise<Error> {
    return Joi.validate(
      req.body,
      Joi.object().keys({
        uuid: Joi.string().uuid().required(),
        active: Joi.boolean(),
        name: Joi.string(),
        description: Joi.string(),
        days: Joi.number().required(),
        price: Joi.number().required(),
        userGroups: Joi.array().items(Joi.string().min(1).required())
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
