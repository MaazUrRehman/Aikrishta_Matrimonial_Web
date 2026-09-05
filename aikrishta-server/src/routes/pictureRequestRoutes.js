import express from 'express';
import { 
  sendPictureRequest, 
  approvePictureRequest,
  rejectPictureRequest, 
  checkPicturePermission 
} from '../controllers/pictureRequestController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/send', protect, sendPictureRequest);
router.get('/approve/:requestId', approvePictureRequest);
router.get('/reject/:requestId', rejectPictureRequest);
router.get('/permission/:ownerId', protect, checkPicturePermission);

export default router;
