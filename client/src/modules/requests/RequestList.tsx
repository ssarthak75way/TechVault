import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Fade, IconButton, Tooltip, TextField, InputAdornment, MenuItem, Button } from '@mui/material';
import { CheckCircle, XCircle, Clock, Search, Filter, Download } from 'lucide-react';
import { api } from '../../app/api';
import { useAuthStore } from '../../app/store';
import type { AssetRequest } from '../../shared/types';
import { pageHeader } from '../../shared/styles';
import { exportToCSV, formatDateForCSV } from '../../utils/csvExport';

export default function RequestList() {
    const [requests, setRequests] = useState<AssetRequest[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const user = useAuthStore((state) => state.user);

    const fetchRequests = async () => {
        try {
            const { data } = await api.get<AssetRequest[]>('/requests');
            setRequests(data);
        } catch (err) {
            console.error('Failed to fetch requests:', err);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleAction = async (id: string, status: string) => {
        try {
            await api.patch(`/requests/${id}/status`, { status });
            fetchRequests();
        } catch (err) {
            console.error('Action failed:', err);
        }
    };

    const filteredRequests = requests.filter(request => {
        const matchesSearch = request.requester?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.assetType.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleExport = () => {
        const today = new Date().toISOString().split('T')[0];
        exportToCSV(
            filteredRequests,
            `requests-export-${today}.csv`,
            [
                { header: 'Requester', accessor: (req) => req.requester?.name || '' },
                { header: 'Asset Type', accessor: (req) => req.assetType },
                { header: 'Reason', accessor: (req) => req.reason },
                { header: 'Status', accessor: (req) => req.status },
                { header: 'Approved By', accessor: (req) => req.approvedBy?.name || '' },
                { header: 'Created Date', accessor: (req) => formatDateForCSV(req.createdAt) }
            ]
        );
    };

    return (
        <Fade in timeout={500}>
            <Box>
                <Box sx={pageHeader}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Asset Requests</Typography>
                        <Typography color="text.secondary">Review and manage hardware allocation requests</Typography>
                    </Box>
                </Box>

                <Paper sx={{ mb: 3, p: 2, display: 'flex', gap: 2, alignItems: 'center', bgcolor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(10px)' }}>
                    <TextField
                        size="small"
                        placeholder="Search requests..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search size={18} color="#64748b" />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ flexGrow: 1, '& .MuiOutlinedInput-root': { bgcolor: 'background.paper' } }}
                    />
                    <TextField
                        select
                        size="small"
                        label="Status"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        sx={{ minWidth: 120 }}
                    >
                        <MenuItem value="all">All Status</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="approved">Approved</MenuItem>
                        <MenuItem value="rejected">Rejected</MenuItem>
                    </TextField>
                    <Button
                        variant="outlined"
                        startIcon={<Download size={18} />}
                        onClick={handleExport}
                        sx={{ color: 'text.secondary', borderColor: 'divider' }}
                    >
                        Export CSV
                    </Button>
                    <Button variant="outlined" startIcon={<Filter size={18} />} sx={{ color: 'text.secondary', borderColor: 'divider' }}>
                        More Filters
                    </Button>
                </Paper>

                <TableContainer component={Paper} sx={{ boxShadow: 'var(--shadow-lg)', border: 'none' }}>
                    <Table>
                        <TableHead sx={{ bgcolor: 'secondary.soft' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700, color: 'secondary.dark' }}>Requester</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'secondary.dark' }}>Asset Type</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'secondary.dark' }}>Reason</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'secondary.dark' }}>Status</TableCell>
                                {user?.role !== 'employee' && (
                                    <TableCell sx={{ fontWeight: 700, color: 'secondary.dark', textAlign: 'right' }}>Actions</TableCell>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRequests.map((request) => (
                                <TableRow key={request._id} sx={{ '&:hover': { bgcolor: 'action.hover' }, transition: 'all 0.2s' }}>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <Box sx={{ width: 32, height: 32, borderRadius: 'full', bgcolor: 'secondary.soft', color: 'secondary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                                                {request.requester?.name?.[0]}
                                            </Box>
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{request.requester?.name}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>{request.assetType}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 200 }}>
                                            {request.reason}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={request.status}
                                            color={request.status === 'approved' ? 'success' : request.status === 'rejected' ? 'error' : 'warning'}
                                            size="small"
                                            icon={request.status === 'pending' ? <Clock size={14} /> : undefined}
                                            sx={{ fontWeight: 600, borderRadius: 1.5, textTransform: 'capitalize' }}
                                        />
                                    </TableCell>
                                    {user?.role !== 'employee' && (
                                        <TableCell sx={{ textAlign: 'right' }}>
                                            {request.status === 'pending' ? (
                                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                                    <Tooltip title="Approve">
                                                        <IconButton
                                                            size="small"
                                                            color="success"
                                                            onClick={() => handleAction(request._id, 'approved')}
                                                            sx={{ bgcolor: 'success.soft', '&:hover': { bgcolor: 'success.main', color: 'white' } }}
                                                        >
                                                            <CheckCircle size={18} />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Reject">
                                                        <IconButton
                                                            size="small"
                                                            color="error"
                                                            onClick={() => handleAction(request._id, 'rejected')}
                                                            sx={{ bgcolor: 'error.soft', '&:hover': { bgcolor: 'error.main', color: 'white' } }}
                                                        >
                                                            <XCircle size={18} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                            ) : (
                                                <Typography variant="caption" color="text.disabled">No actions</Typography>
                                            )}
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Fade>
    );
}
