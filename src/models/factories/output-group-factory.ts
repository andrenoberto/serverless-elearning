import * as MediaConvert from 'aws-sdk/clients/mediaconvert';

export class OutputGroupFactory {
  public static mp4(destinationSource: string): MediaConvert.OutputGroup {
    return {
      Name: 'File Group',
      OutputGroupSettings: {
        Type: 'FILE_GROUP_SETTINGS',
        FileGroupSettings: {
          Destination: `${destinationSource}/mp4/`
        }
      },
      Outputs: []
    };
  }

  public static hls(destinationSource: string): MediaConvert.OutputGroup {
    return {
      Name: 'HLS Group',
      OutputGroupSettings: {
        Type: 'HLS_GROUP_SETTINGS',
        HlsGroupSettings: {
          SegmentLength: 5,
          MinSegmentLength: 0,
          Destination: `${destinationSource}/hls/`
        }
      },
      Outputs: []
    };
  }

  public static dash(destinationSource: string): MediaConvert.OutputGroup {
    return {
      Name: 'DASH ISO',
      OutputGroupSettings: {
        Type: 'DASH_ISO_GROUP_SETTINGS',
        DashIsoGroupSettings: {
          SegmentLength: 30,
          FragmentLength: 3,
          Destination: `${destinationSource}/dash/`
        }
      }
    };
  }

  public static cmaf(destinationSource): MediaConvert.OutputGroup {
    return {
      Name: 'CMAF',
      OutputGroupSettings: {
        Type: 'CMAF_GROUP_SETTINGS',
        CmafGroupSettings: {
          SegmentLength: 30,
          FragmentLength: 3,
          Destination: `${destinationSource}/cmaf/`
        }
      }
    };
  }

  public static mss(destinationSource: string): MediaConvert.OutputGroup {
    return {
      Name: 'MS Smooth',
      OutputGroupSettings: {
        Type: 'MS_SMOOTH_GROUP_SETTINGS',
        MsSmoothGroupSettings: {
          FragmentLength: 2,
          ManifestEncoding: 'UTF8',
          Destination: `${destinationSource}/mss/`
        }
      }
    };
  }
}
