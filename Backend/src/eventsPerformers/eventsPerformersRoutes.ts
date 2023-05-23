import { Router} from "express";
import * as controller from './eventsPerformersController';

const eventsPerformersRoutes : Router = Router();

eventsPerformersRoutes.post('/', controller.addEventPerformer);
eventsPerformersRoutes.get('/', controller.getEventsPerformers);
eventsPerformersRoutes.delete('/:event_id/:performer_id', controller.deleteEventPerformer);
eventsPerformersRoutes.put('/:event_id/:performer_id', controller.updateEventPerformer);

export default eventsPerformersRoutes;

/* 
BODY FOR POST
{
  "event_id": 1,
  "performer_id": 19
}

Body for UPDATE
{
    "new_event_id": number,
    "new_performer_id": number
}
*/