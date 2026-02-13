import mongoose, { Schema, Document } from 'mongoose';

export enum AssetStatus {
    AVAILABLE = 'available',
    ASSIGNED = 'assigned',
    MAINTENANCE = 'maintenance',
}

export interface IAsset extends Document {
    name: string;
    serialNumber: string;
    type: string;
    status: AssetStatus;
    assignedTo?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const AssetSchema: Schema = new Schema({
    name: { type: String, required: true },
    serialNumber: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    status: { type: String, enum: Object.values(AssetStatus), default: AssetStatus.AVAILABLE },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model<IAsset>('Asset', AssetSchema);
