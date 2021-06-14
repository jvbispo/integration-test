import IntegrateDealPipeDriveBling from '@modules/dealsIntegration/useCases/integrateDealUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class IntegrationController {
  public async call(req: Request, res: Response): Promise<Response> {
    try {
      const integrateDeals = container.resolve(IntegrateDealPipeDriveBling)
      
      await integrateDeals.execute();

      return res.sendStatus(200);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}
