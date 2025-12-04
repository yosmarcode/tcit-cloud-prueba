import {Router} from 'express'
import routerContacts from './contacts.router.js';

const router = Router()

router.use('/contacts', routerContacts)

export default router;