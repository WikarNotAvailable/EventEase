import { Router } from 'express';
import * as controller from './companyController';

const companyRoutes: Router = Router();

companyRoutes.post('/', controller.postCompany);

companyRoutes.get('/', controller.getCompany);

companyRoutes.get('/:id', controller.getCompanyById);

companyRoutes.delete('/:id', controller.deleteCompany);

companyRoutes.put('/:id', controller.updateCompany);

export default companyRoutes;

/*
Reponse get
{
    "company_id": int,
    "name": string,
    "description": string,
    "discussion_id": int,

}

Body for Post
{
    "name": string,
    "description": string
}

Body for Update //all fields optional 
{
    "name": string,
    "description": string
}
*/
