import type { Response } from 'express';
import type { AuthRequest } from '../middleware/auth.js';
import RequestModel, { RequestStatus } from '../models/Request.js';
import User, { UserRole } from '../models/User.js';

export const getRequests = async (req: AuthRequest, res: Response) => {
    try {
        let query = {};
        if (req.user?.role === UserRole.EMPLOYEE) {
            query = { requester: req.user._id };
        } else if (req.user?.role === UserRole.MANAGER) {
            // Managers might see their team's requests or all if requested
            // For simplicity, let's say managers see all for now or we can filter by team
            query = {};
        }

        const requests = await RequestModel.find(query)
            .populate('requester', 'name email team')
            .populate('approvedBy', 'name email');
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const createRequest = async (req: AuthRequest, res: Response) => {
    try {
        const { assetType, reason } = req.body;

        if (!req.user?._id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const request = await RequestModel.create({
            requester: req.user._id,
            assetType,
            reason,
        });
        res.status(201).json(request);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateRequestStatus = async (req: AuthRequest, res: Response) => {
    try {
        const { status } = req.body;
        if (!Object.values(RequestStatus).includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const request = await RequestModel.findById(req.params['id']);
        if (!request) return res.status(404).json({ message: 'Request not found' });

        request.status = status;
        request.approvedBy = req.user?._id as any;
        await request.save();

        res.json(request);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
