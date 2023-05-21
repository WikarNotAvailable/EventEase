import { Router } from 'express';
import * as controller from './performerController';

const performerRoutes: Router = Router();

performerRoutes.post('/', controller.addPerformer);
performerRoutes.get('/', controller.getPerformers);
performerRoutes.get('/:id', controller.getPerformerById);
performerRoutes.delete('/:id', controller.deletePerformer);
performerRoutes.put('/:id', controller.updatePerformer);

export default performerRoutes;

/*
Body for Post

{
    "performertype_id": number,
    "name": string,
    "description": string
}

Body for Update

{
    "performertype_id": number,
    "name": string,
    "description": string
}
*/
