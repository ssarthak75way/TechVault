export type UserRole = 'admin' | 'manager' | 'employee';

export interface User {
    _id: string;
    name: string;
    email: string;
    role: UserRole;
    team?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Asset {
    _id: string;
    name: string;
    serialNumber: string;
    type: string;
    status: 'available' | 'assigned' | 'maintenance';
    assignedTo?: User;
    location?: string;
    purchaseDate?: string;
    createdAt: string;
    updatedAt: string;
}

export interface AssetRequest {
    _id: string;
    requester: User;
    assetType: string;
    reason: string;
    status: 'pending' | 'approved' | 'rejected';
    approvedBy?: User;
    createdAt: string;
    updatedAt: string;
}

export interface DashboardStats {
    myAssets: number;
    pendingRequests: number;
    totalInventory: number;
}
