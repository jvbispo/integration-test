import { inject, injectable } from "tsyringe";
import GetDealsWithProductsUseCase from "./getDealsWithProductFromPipeDrivesUseCase";
import SendNewDealToBlingUseCase from "./sendNewDealToBlingUseCase";
import { IDealsRepository } from "../repositories/IDealsRepository";

@injectable()
class IntegrateDealPipeDriveBling {
  constructor(
    @inject('GetPipeDriveDealsWithProduct')
    private getPipeDriveDealsWithProduct: GetDealsWithProductsUseCase,
    @inject('SendNewDealToBlingUseCase')
    private sendNewDealToBling: SendNewDealToBlingUseCase,
    // @inject('DealsRepository')
    // private dealsRepository: IDealsRepository,
  ) { }

  public async execute(): Promise<void> {

    const deals = await this.getPipeDriveDealsWithProduct.execute();
    console.log(deals);
    try {
      await this.sendNewDealToBling.execute(deals);

      // await this.dealsRepository.create({
      //   dealId: deals[0].id,
      //   value: deals[0].value,
      // })

    } catch (err) {
      throw err;
    }

  }
}

export default IntegrateDealPipeDriveBling;
