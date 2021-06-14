import {Router} from 'express'

import integrationRouter from '@modules/dealsIntegration/infra/http/routes/integration.routes'

const routes = Router()

routes.use('/integration', integrationRouter)


export default routes;
