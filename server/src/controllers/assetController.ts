import type { Response } from 'express';
import type { AuthRequest } from '../middleware/auth.js';
import Asset from '../models/Asset.js';

export const getAssets = async (req: AuthRequest, res: Response) => {
    try {
        const assets = await Asset.find().populate('assignedTo', 'name email');
        res.json(assets);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getAssetById = async (req: AuthRequest, res: Response) => {
    try {
        const asset = await Asset.findById(req.params['id']).populate('assignedTo', 'name email');
        if (!asset) return res.status(404).json({ message: 'Asset not found' });
        res.json(asset);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const createAsset = async (req: AuthRequest, res: Response) => {
    try {
        const { name, serialNumber, type } = req.body;
        const assetExists = await Asset.findOne({ serialNumber });

        if (assetExists) {
            return res.status(400).json({ message: 'Asset with this serial number already exists' });
        }

        const asset = await Asset.create({ name, serialNumber, type });
        res.status(201).json(asset);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateAsset = async (req: AuthRequest, res: Response) => {
    try {
        const asset = await Asset.findByIdAndUpdate(req.params['id'], req.body, { new: true });
        if (!asset) return res.status(404).json({ message: 'Asset not found' });
        res.json(asset);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteAsset = async (req: AuthRequest, res: Response) => {
    try {
        const asset = await Asset.findByIdAndDelete(req.params['id']);
        if (!asset) return res.status(404).json({ message: 'Asset not found' });
        res.json({ message: 'Asset deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
