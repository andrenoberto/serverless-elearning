import * as BodyParser from 'body-parser';
import * as Express from 'express';

import cors from '@libs/cors';
import Routes from '@src/routes';

export class API {
  constructor(public readonly expressApp: Express.Application = Express()) {
    this.configureApi();
  }

  private configureApi(): void {
    this.expressApp.use(BodyParser.json());
    this.expressApp.use(cors);
    this.expressApp.use('/api', Routes);
    this.expressApp.use(API.errorHandling);
  }

  private static errorHandling(err, req, res, next): void {
    console.error(err);
    if (req.headersSent) {
      next(err);
    }

    if (err.isJoi) {
      res.status(422).json({
        type: 'validation error',
        errors: err.details.map(obj => {
          return {
            key: obj.path.join('.'),
            message: obj.message
          };
        })
      });
    } else {
      res.status(500).json({ error: err });
    }
  }

  public get app(): Express.Application {
    return this.expressApp;
  }
}
