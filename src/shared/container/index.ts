import 'reflect-metadata'
import {container} from 'tsyringe';
import '../providers/index';

import GetDealsWithProductsUseCase from '@modules/dealsIntegration/useCases/getDealsWithProductFromPipeDrivesUseCase';
import SendNewDealToBlingUseCase from '@modules/dealsIntegration/useCases/sendNewDealToBlingUseCase';
import DealsRepository from '@modules/dealsIntegration/infra/typeorm/repositories/dealsRepository';
import { IDealsRepository } from '@modules/dealsIntegration/repositories/IDealsRepository';
import { IGetPipeDriveDealsWithProduct } from '@modules/dealsIntegration/dtos/IGetPipeDriveDealsWithProduct';
import { ISendNewDealsToBling } from '@modules/dealsIntegration/dtos/ISendNewDealsToBling';


container.registerSingleton<IGetPipeDriveDealsWithProduct>('GetPipeDriveDealsWithProduct', GetDealsWithProductsUseCase)

container.registerSingleton<ISendNewDealsToBling>('SendNewDealToBlingUseCase', SendNewDealToBlingUseCase)

container.registerSingleton<IDealsRepository>("DealsRepository", DealsRepository)
