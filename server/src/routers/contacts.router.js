import { Router } from 'express';
import {
  GetListContacts,
  PostCreateContacts,
} from '../controller/contacts/contact.controller.js';

const routerContacts = Router();

routerContacts.get('/list', GetListContacts);
routerContacts.post('/create', PostCreateContacts);

export default routerContacts;
