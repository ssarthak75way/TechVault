import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Paper, Alert } from '@mui/material';
import { api } from '../../app/api';
import type { Asset } from '../../shared/types';

interface AssetFormData {
    name: string;
    serialNumber: string;
    type: string;
}

export default function AssetCreate() {
    const [formData, setFormData] = useState<AssetFormData>({ name: '', serialNumber: '', type: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post<Asset>('/assets', formData);
            navigate('/dashboard/assets');
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create asset';
            setError(errorMessage);
        }
    };

    return (
        <Box sx={{ maxWidth: 500 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Create New Asset</Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>Add a new piece of hardware to the system</Typography>

            <Paper sx={{ p: 4 }}>
                {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Asset Name"
                        margin="normal"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                    <TextField
                        fullWidth
                        label="Serial Number"
                        margin="normal"
                        required
                        value={formData.serialNumber}
                        onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                    <TextField
                        fullWidth
                        label="Type (e.g. Laptop, Monitor)"
                        margin="normal"
                        required
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{ mt: 4, py: 1.5 }}
                    >
                        Create Asset
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
