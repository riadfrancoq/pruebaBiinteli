import  {Router} from 'express';
const router = Router();
import { uploadData, journeyManager} from './endpoints.js';

router.get('/insert', uploadData)
router.post('/journeys', journeyManager);


export default router;