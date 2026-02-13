import { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Fade, InputAdornment, TextField, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Download } from 'lucide-react';
import { api } from '../../app/api';
import { useAuthStore } from '../../app/store';
import type { Asset } from '../../shared/types';
import { pageHeader } from '../../shared/styles';
import { exportToCSV, formatDateForCSV } from '../../utils/csvExport';

export default function AssetList() {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const { data } = await api.get<Asset[]>('/assets');
                setAssets(data);
            } catch (err) {
                console.error('Failed to fetch assets:', err);
            }
        };
        fetchAssets();
    }, []);

    const filteredAssets = assets.filter(asset => {
        const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || asset.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleExport = () => {
        const today = new Date().toISOString().split('T')[0];
        exportToCSV(
            filteredAssets,
            `assets-export-${today}.csv`,
            [
                { header: 'Name', accessor: (asset) => asset.name },
                { header: 'Serial Number', accessor: (asset) => asset.serialNumber },
                { header: 'Type', accessor: (asset) => asset.type },
                { header: 'Status', accessor: (asset) => asset.status },
                { header: 'Assigned To', accessor: (asset) => asset.assignedTo?.name || 'Unassigned' },
                { header: 'Location', accessor: (asset) => asset.location || '' },
                { header: 'Purchase Date', accessor: (asset) => formatDateForCSV(asset.purchaseDate) }
            ]
        );
    };

    return (
        <Fade in timeout={500}>
            <Box>
                <Box sx={pageHeader}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Assets Inventory</Typography>
                        <Typography color="text.secondary">Manage and track all hardware assets</Typography>
                    </Box>
                    {(user?.role === 'admin' || user?.role === 'manager') && (
                        <Button
                            variant="contained"
                            startIcon={<Plus size={20} />}
                            component={Link}
                            to="/dashboard/assets/create"
                            sx={{ px: 3 }}
                        >
                            Add New Asset
                        </Button>
                    )}
                </Box>

                <Paper sx={{ mb: 3, p: 2, display: 'flex', gap: 2, alignItems: 'center', bgcolor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(10px)' }}>
                    <TextField
                        size="small"
                        placeholder="Search assets..."
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
                        <MenuItem value="available">Available</MenuItem>
                        <MenuItem value="assigned">Assigned</MenuItem>
                        <MenuItem value="maintenance">Maintenance</MenuItem>
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
                        <TableHead sx={{ bgcolor: 'primary.soft' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700, color: 'primary.dark' }}>Asset Name</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'primary.dark' }}>Serial Number</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'primary.dark' }}>Type</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'primary.dark' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'primary.dark' }}>Assigned To</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredAssets.map((asset) => (
                                <TableRow
                                    key={asset._id}
                                    sx={{ '&:hover': { bgcolor: 'action.hover' }, transition: 'background-color 0.2s' }}
                                >
                                    <TableCell sx={{ fontWeight: 600 }}>{asset.name}</TableCell>
                                    <TableCell sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>{asset.serialNumber}</TableCell>
                                    <TableCell>
                                        <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>{asset.type}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={asset.status}
                                            color={asset.status === 'available' ? 'success' : asset.status === 'assigned' ? 'primary' : 'warning'}
                                            size="small"
                                            sx={{ fontWeight: 600, borderRadius: 1.5, textTransform: 'capitalize' }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {asset.assignedTo ? (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Box sx={{ width: 24, height: 24, borderRadius: 'full', bgcolor: 'primary.soft', color: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
                                                    {asset.assignedTo.name?.[0]}
                                                </Box>
                                                <Typography variant="body2">{asset.assignedTo.name}</Typography>
                                            </Box>
                                        ) : (
                                            <Typography variant="body2" color="text.disabled">Unassigned</Typography>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Fade>
    );
}
