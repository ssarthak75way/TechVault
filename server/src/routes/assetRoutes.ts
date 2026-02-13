import express from 'express';
import { getAssets, getAssetById, createAsset, updateAsset, deleteAsset } from '../controllers/assetController.js';
import { protect, authorize } from '../middleware/auth.js';
import { UserRole } from '../models/User.js';

const router = express.Router();

router.use(protect);

router.get('/', getAssets);
router.get('/:id', getAssetById);

// Admin only routes
router.post('/', authorize(UserRole.ADMIN), createAsset);
router.put('/:id', authorize(UserRole.ADMIN), updateAsset);
router.delete('/:id', authorize(UserRole.ADMIN), deleteAsset);

export default router;
