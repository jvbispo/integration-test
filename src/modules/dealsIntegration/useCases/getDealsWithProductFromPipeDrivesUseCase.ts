import 'reflect-metadata';
import { inject, injectable } from "tsyringe";
import { IApiProvider } from "@shared/providers/requestProvider/models/IApiProvider";
import { map as bluebirdMap } from 'bluebird';
import Config from "@config/index";
import { IGetPipeDriveDealsWithProduct } from "../dtos/IGetPipeDriveDealsWithProduct";

@injectable()
class GetDealsWithProductsUseCase implements IGetPipeDriveDealsWithProduct {
  constructor(
    @inject('ApiProvider')
    private apiProvider: IApiProvider,

  ) { }

  public async execute(): Promise<any[]> {

    const pipeDriveToken = new Config().getPiperiveToken();
    const { data: dealsResult } = await this.apiProvider.call({
      url: `https://companydomain.pipedrive.com/api/v1/deals?status=won&api_token=${pipeDriveToken}`,
      method: 'get'
    });

    const deals = await bluebirdMap(dealsResult.data, async (deal: any) => {
      const { data: productDeal } = await this.apiProvider.call({
        url: `https://companydomain.pipedrive.com/api/v1/deals/${deal.id}/products?api_token=${pipeDriveToken}`,
        method: 'get',
      });

      return {
        ...deal,
        productData: productDeal.data ? productDeal.data : null
      }
    });


    return deals;
  }
}

export default GetDealsWithProductsUseCase;
