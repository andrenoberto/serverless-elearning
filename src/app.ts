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

const serverless = require('serverless-http');

export const handler: Promise<void> = serverless(new API().app);

module.exports.encodeVideo = MediaServices.encodeVideo;
module.exports.updateMediaAfterConvertIsDone = MediaServices.updateMediaAfterConvertIsDone;
