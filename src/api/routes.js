import  {Router} from 'express';
const router = Router();
import { uploadData } from './endpoints.js';

router.get('/insert', uploadData)
router.post('/journeys', uploadData);


export default router;