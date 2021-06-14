
import Config from '@config/index';
import { IGetPipeDriveDealsWithProduct } from '@modules/dealsIntegration/dtos/IGetPipeDriveDealsWithProduct';
import GetDealsWithProductsUseCase from '@modules/dealsIntegration/useCases/getDealsWithProductFromPipeDrivesUseCase';
import AxiosApi from '@shared/providers/requestProvider/implementations/axiosApi';
import { IApiProvider } from '@shared/providers/requestProvider/models/IApiProvider';
import 'reflect-metadata';


describe('getDealsWithProductFromPipedriveUsecase', () => {
  let apiProvider: IApiProvider;
  let getDealsUseCase: IGetPipeDriveDealsWithProduct;
  let config = new Config();

  beforeEach(() => {
    apiProvider = new AxiosApi();
    getDealsUseCase = new GetDealsWithProductsUseCase(
      apiProvider,
    );

  });

  it('should be able to get deals from pipedrive and fetch products', async () => {
    jest.spyOn(config, 'getPiperiveToken').mockReturnValueOnce('teste')
    jest.spyOn(apiProvider, 'call').mockReturnValueOnce(Promise.resolve({
      data: {
        success: true,
        data: [
          {
            id: 1,
            person_id: {
              name: 'john',
            }
          }
        ],
      }
    })).mockReturnValueOnce(Promise.resolve({
      data: {
        success: true,
        data: [
          {
            id: 22,
          },
          {
            id: 23,
          }
        ],
      }
    }))

    const result = await getDealsUseCase.execute();

    console.log(result);
    expect(result).toEqual([{ "id": 1, "person_id": { "name": "john" }, "productData": [{ "id": 22 }, { "id": 23 }] }]);
  });


});
