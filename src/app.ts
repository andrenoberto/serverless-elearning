const moduleAlias = require('module-alias');
moduleAlias.addAliases({
  '@api'  : __dirname + '/context',
  '@config'  : __dirname + '/configuration',
  '@db'  : __dirname + '/db',
  '@libs'  : __dirname + '/libs',
  '@models'  : __dirname + '/models',
  '@src': __dirname
});

import * as MediaServices from '@api/v1/media-services';
import {API} from '@src/api';
import serverlessHttp from 'serverless-http';

export const handler = serverlessHttp(new API().app);
export const encodeVideo = MediaServices.encodeVideo;
export const updateMediaAfterConvertIsDone = MediaServices.updateMediaAfterConvertIsDone;
