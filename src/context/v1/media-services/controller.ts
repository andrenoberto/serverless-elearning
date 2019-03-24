import * as AWS from 'aws-sdk';
import {v4 as uuidv4} from 'uuid';

import {Config} from '@config/environment';
import {OutputGroupFactory} from '@models/factories/output-group-factory';
import {IConfig} from '@models/interfaces';

export class MediaServicesController {
  private readonly config: IConfig;

  constructor() {
    this.config = Config.factory();
  }

  /* tslint:disable-next-line no-any */
  public async convert(event): Promise<any> {
    const {s3} = event.Records[0];
    const sourceS3Bucket = s3.bucket.name;
    const sourceS3Key = s3.object.key;
    const inputSource = `s3://${sourceS3Bucket}/${sourceS3Key}`;
    const destinationSource = `s3://${this.config.mediaConvert.outputBucket}/${uuidv4()}`;
    const mediaConvert = new AWS.MediaConvert({
      ...this.config.aws,
      ...this.config.mediaConvert.options
    });
    try {
      const job: AWS.MediaConvert.CreateJobRequest = {
        JobTemplate: this.config.mediaConvert.jobTemplate,
        Role: this.config.mediaConvert.role,
        Settings: {
          Inputs: [
            {
              AudioSelectors: {
                'Audio Selector 1': {
                  Offset: 0,
                  DefaultSelection: 'NOT_DEFAULT',
                  ProgramSelection: 1,
                  SelectorType: 'TRACK',
                  Tracks: [
                    1
                  ]
                }
              },
              VideoSelector: {
                ColorSpace: 'FOLLOW'
              },
              FilterEnable: 'AUTO',
              PsiControl: 'USE_PSI',
              FilterStrength: 0,
              DeblockFilter: 'DISABLE',
              DenoiseFilter: 'DISABLE',
              TimecodeSource: 'EMBEDDED',
              FileInput: inputSource
            }
          ],
          OutputGroups: []
        }
      };
      const params: AWS.MediaConvert.GetJobTemplateRequest = {
        Name: this.config.mediaConvert.jobTemplate
      };
      const template = await mediaConvert.getJobTemplate(params).promise();

      template.JobTemplate.Settings.OutputGroups.forEach(output => {
        switch (output.OutputGroupSettings.Type) {
          case 'FILE_GROUP_SETTINGS':
            job.Settings.OutputGroups.push(OutputGroupFactory.mp4(destinationSource));
            break;
          case 'HLS_GROUP_SETTINGS':
            job.Settings.OutputGroups.push(OutputGroupFactory.hls(destinationSource));
            break;
          case 'DASH_ISO_GROUP_SETTINGS':
            job.Settings.OutputGroups.push(OutputGroupFactory.dash(destinationSource));
            break;
          case 'MS_SMOOTH_GROUP_SETTINGS':
            job.Settings.OutputGroups.push(OutputGroupFactory.mss(destinationSource));
            break;
          case 'CMAF_GROUP_SETTINGS':
            job.Settings.OutputGroups.push(OutputGroupFactory.cmaf(destinationSource));
            break;
        }
      });

      const data = await mediaConvert.createJob(job).promise();
      event.encodingJob = job;
      event.encodeJobId = data.Job.Id;
    } catch (err) {
      console.error(err);
      throw err;
    }
    return event;
  }
}
