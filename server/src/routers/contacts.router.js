import { Router } from 'express';
import {
  GetListContacts,
  PostCreateContacts,
  GetContactByName,
  PutUpdateContacts,
  DeleteContacts,
} from '../controller/contacts/contact.controller.js';

const routerContacts = Router();

routerContacts.get('/list', GetListContacts);
routerContacts.post('/create', PostCreateContacts);
routerContacts.get('/contact/:name', GetContactByName);
routerContacts.put('/contact/:id', PutUpdateContacts);
routerContacts.delete('/contact/:id', DeleteContacts);

export default routerContacts;
