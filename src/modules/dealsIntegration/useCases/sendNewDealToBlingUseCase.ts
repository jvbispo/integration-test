import { inject, injectable } from "tsyringe";
import { map as bluebirdMap } from 'bluebird';
import IXmlParserProvider from "@shared/providers/xmlParserProvider/models/IXmlParserProvider";
import { ISendNewDealsToBling } from "../dtos/ISendNewDealsToBling";
import { IApiProvider } from "@shared/providers/requestProvider/models/IApiProvider";
import Config from '@config/index';

@injectable()
class SendNewDealToBlingUseCase implements ISendNewDealsToBling {
  constructor(
    @inject('ApiProvider')
    private axiosProvider: IApiProvider,
    @inject('XmlParserProvider')
    private xmlParserProvider: IXmlParserProvider,

  ) { }

  public async execute(deals: any[]): Promise<void> {
    const blingToken = new Config().getBlingToken();
    const formatedDeals = deals.map(deal => {
      const itens = deal.productData.map((product: any) => {
        return {
          item: {
            codigo: `${product.id}`,
            descricao: product.name,
            un: 'Pç',
            qtde: product.quantity,
            vlr_unit: product.item_price,
          }
        }
      });

      const parserdXMLDeal = {
        cliente: {
          nome: deal.person_id.name
        },
        itens
      }

      return this.xmlParserProvider.parse(parserdXMLDeal, "pedido");
    });

    try {
      await bluebirdMap(formatedDeals, async (deal: string) => {
        const params = new URLSearchParams()
        params.append('apikey', blingToken);
        params.append('xml', deal)
        return this.axiosProvider.call({
          method: 'post',
          url: `https://bling.com.br/Api/v2/pedido/json`,
          params,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })

      });


    } catch (err) {
      throw err
    };

  }
}

export default SendNewDealToBlingUseCase;
