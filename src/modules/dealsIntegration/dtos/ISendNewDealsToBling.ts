export interface ISendNewDealsToBling {
  execute(data: any[]): Promise<void>;
}