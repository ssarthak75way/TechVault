import type { Response } from 'express';
import type { AuthRequest } from '../middleware/auth.js';
import Asset from '../models/Asset.js';
import RequestModel, { RequestStatus } from '../models/Request.js';

export const getStats = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?._id;
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });

        // Statistics for the logged-in user
        const myAssetsCount = await Asset.countDocuments({ assignedTo: userId } as any);
        const pendingRequestsCount = await RequestModel.countDocuments({
            requester: userId,
            status: RequestStatus.PENDING
        } as any);

        // Global statistics
        const globalInventoryCount = await Asset.countDocuments();

        res.json({
            myAssets: myAssetsCount,
            pendingRequests: pendingRequestsCount,
            totalInventory: globalInventoryCount
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
