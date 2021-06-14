
import { IDealsCreate } from '@modules/dealsIntegration/dtos/IDealsCreate';
import { IDealsRepository } from '@modules/dealsIntegration/repositories/IDealsRepository';
import { MongoRepository, getMongoRepository, getManager, MongoEntityManager, getMongoManager, EntityRepository } from 'typeorm';
import Deal from '../schemas/Deal';


@EntityRepository(Deal)
export default class DealsRepository implements IDealsRepository{
  private dealsRepository: MongoRepository<Deal>;
  constructor() {
    this.dealsRepository = getMongoRepository(Deal, 'mongo');
  }

  public async create({
      dealId,
      value,
  }: IDealsCreate): Promise<Deal> {
    const d = await this.dealsRepository.find();
    console.log(d);
    const deal = this.dealsRepository.create({
      value,
      dealId,
    });

    await this.dealsRepository.save(deal);
    return deal;
  }
}