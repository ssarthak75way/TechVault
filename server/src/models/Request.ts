import mongoose, { Schema, Document } from 'mongoose';

export enum RequestStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
}

export interface IRequest extends Document {
    requester: mongoose.Types.ObjectId;
    assetType: string;
    reason: string;
    status: RequestStatus;
    approvedBy?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const RequestSchema: Schema = new Schema({
    requester: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    assetType: { type: String, required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: Object.values(RequestStatus), default: RequestStatus.PENDING },
    approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model<IRequest>('Request', RequestSchema);
