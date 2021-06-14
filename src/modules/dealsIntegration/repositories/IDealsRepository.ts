import Deals from "../infra/typeorm/schemas/Deal";
import { IDealsCreate } from "../dtos/IDealsCreate";

export interface IDealsRepository {
  create(data: IDealsCreate): Promise<Deals>
}