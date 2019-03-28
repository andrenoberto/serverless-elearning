import * as Joi from 'joi';

import {validateMasterKey} from '@libs/utils';

export class Validators {
  public static masterKey(req, res, next): Promise<Error> {
    return validateMasterKey(req)
      .then(() => next())
      .catch(err => {
        console.error(err);
        res.status(401).send();
      });
  }

  public static tableManagement(req, res, next): Promise<Error> {
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
