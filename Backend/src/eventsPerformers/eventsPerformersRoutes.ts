import { Router} from "express";
import * as controller from './eventsPerformersController';

const eventsPerformersRoutes : Router = Router();


eventsPerformersRoutes.post('/', controller.addEventPerformer);
eventsPerformersRoutes.get('/', controller.getEventsPerformers);
eventsPerformersRoutes.get('/event/:id', controller.getEventPerformerByEventId);
eventsPerformersRoutes.get('/performer/:id', controller.getEventPerformerByPerformerId);
eventsPerformersRoutes.delete('/:event_id/:performer_id', controller.deleteEventPerformer);

export default eventsPerformersRoutes;
