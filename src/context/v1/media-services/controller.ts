import * as AWS from 'aws-sdk';
import {v4 as uuidv4} from 'uuid';

import {Config} from '@config/environment';
import {OutputGroupFactory} from '@models/factories';
import {IConfig} from '@models/interfaces';

export class MediaServicesController {
  private readonly config: IConfig;

  constructor() {
    this.config = Config.factory();
  }

  public async createEncodeJob(event): Promise<void> {
    const {s3} = event.Records[0];
    const sourceS3Bucket = s3.bucket.name;
    const sourceS3Key = s3.object.key;
    const uuid = uuidv4();
    const fileInput = `s3://${sourceS3Bucket}/${sourceS3Key}`;
    const destinationSource = `s3://${this.config.mediaConvert.outputBucket}/${uuid}`;
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
              FileInput: fileInput
            }
          ],
          OutputGroups: []
        },
        UserMetadata: {
          application: this.config.env.serverless,
          uuid
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
      // TODO: create registry in DynamoDB
      const {FileInput: inputSource} = event.encodingJob.Settings.Inputs[0];
      const {key: inputFileName, size} = event.Records[0].s3.object;
      const media = {
        inputFileName,
        inputSource,
        size,
        uuid
      };
      console.log(JSON.stringify(media));
    } catch (err) {
      console.error(err);
      throw err;
    }
    return event;
  }

  public static updateMediaAfterConvertIsDone(event): void {
    const eventMessage = JSON.parse(event.Records[0].Sns.Message);
    const {status, outputGroupDetails, userMetadata} = eventMessage.detail;
    const {outputDetails, playlistFilePaths, type} = outputGroupDetails[0];
    const media = {
      outputDetails,
      outputSource: playlistFilePaths[0],
      status,
      type,
      uuid: userMetadata.uuid
    };
    // TODO: update database, it depends on video controller to be created
    console.log(JSON.stringify(media));
  }
}
