export interface IDynamoVideoItem {
  Uuid?: {
    S: string
  };
  InputFileName?: {
    S: string
  };
  InputSource?: {
    S: string
  };
  OutputDetails?: {
    L: IDynamoVideoOutputDetails[]
  };
  OutputSource?: {
    S: string
  };
  Size?: {
    N: string
  };
  Status?: {
    S: string
  };
  Type?: {
    S: string
  };
}

export interface IDynamoVideoOutputDetails {
  M: {
    DurationInMS?: {
      N: string
    };
    VideoDetails?: {
      M: {
        WidthInPx?: {
          N: string
        },
        HeightInPx?: {
          N: string
        }
      }
    };
  };
}
