import { Router} from "express";
import * as controller from './eventsPerformersController';

const eventsPerformersRoutes : Router = Router();


eventsPerformersRoutes.post('/', controller.addEventPerformer);
eventsPerformersRoutes.get('/', controller.getEventsPerformers);
eventsPerformersRoutes.get('/:id', controller.getEventPerformerByEventId);
eventsPerformersRoutes.get('/:id', controller.getEventPerformerByPerformerId);
eventsPerformersRoutes.delete('/:event_id/:performer_id', controller.deleteEventPerformer);

export default eventsPerformersRoutes;
