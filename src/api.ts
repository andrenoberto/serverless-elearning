import * as BodyParser from 'body-parser';
import * as Express from 'express';

import cors from '@libs/cors';
import Routes from '@src/routes';

export class API {
  constructor(public readonly app: Express.Application = Express()) {
    this.configureApi();
  }

  private configureApi(): void {
    this.app.use(BodyParser.json());
    this.app.use(cors);
    this.app.use('/api', Routes);
    this.app.use(API.errorHandling);
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
}

export const Api = new API().app;
