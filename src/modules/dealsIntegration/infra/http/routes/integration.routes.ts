import { Router } from 'express';
import IntegrationController from '../controllers/integrationController';


const integrationRouter = Router();
const callsController = new IntegrationController();


integrationRouter.post('/',callsController.call);


export default integrationRouter;
