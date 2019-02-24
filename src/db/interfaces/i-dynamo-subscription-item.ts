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
  Plans?: {
    SS: Array<string>
  };
  AccessGroup?: {
    SS: Array<string>
  };
}
