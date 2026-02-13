import express from 'express';
import { getRequests, createRequest, updateRequestStatus } from '../controllers/requestController.js';
import { protect, authorize } from '../middleware/auth.js';
import { UserRole } from '../models/User.js';

const router = express.Router();

router.use(protect);

router.get('/', getRequests);
router.post('/', createRequest);

// Managers and Admins can update status
router.patch('/:id/status', authorize(UserRole.MANAGER, UserRole.ADMIN), updateRequestStatus);

export default router;
