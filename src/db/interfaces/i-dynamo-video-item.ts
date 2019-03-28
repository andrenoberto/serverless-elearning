export interface IDynamoVideoItem {
  Uuid?: {
    S: string
  };
  inputFileName: {
    S: string
  };
  inputSource: {
    S: string
  };
  outputDetails: {
    L: Array<IDynamoVideoOutputDetails>
  };
  outputSource: {
    S: string
  };
  size: {
    N: number
  };
  status: {
    S: string
  };
  type: {
    S: string
  };
}

export interface IDynamoVideoOutputDetails {
  durationInMS: {
    N: number
  };
  videoDetails: {
    M: {
      widthInPx: {
        N: number
      },
      heightInPx: {
        N: number
      }
    }
  };
}
