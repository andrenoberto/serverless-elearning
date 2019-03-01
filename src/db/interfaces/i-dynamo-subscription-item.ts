export interface IDynamoSubscriptionItem {
  Uuid?: {
    S: string
  };
  Active?: {
    BOOL: boolean
  };
  Name?: {
    S: string
  };
  Description?: {
    S: string
  };
  Days?: {
    N: string
  };
  Price?: {
    N: string
  };
  AccessGroup?: {
    SS: Array<string>
  };
}
