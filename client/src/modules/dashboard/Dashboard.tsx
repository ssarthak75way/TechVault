import { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Box, Card, CardContent } from '@mui/material';
import { useAuthStore } from '../../app/store';
import { Laptop, Clock, Database, TrendingUp, type LucideIcon } from 'lucide-react';
import { cardHover, gradientIcon } from '../../shared/styles';
import type { DashboardStats } from '../../shared/types';
import { api } from '../../app/api';

interface StatCardProps {
    title: string;
    value: string | number;
    color: 'primary' | 'secondary' | 'warning' | 'success';
    icon: LucideIcon;
}

const StatCard = ({ title, value, color, icon: Icon }: StatCardProps) => (
    <Card sx={cardHover}>
        <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                    <Typography color="text.secondary" variant="overline" sx={{ fontWeight: 700, letterSpacing: '0.1em' }}>
                        {title}
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800, mt: 0.5 }}>
                        {value}
                    </Typography>
                </Box>
                <Box className="icon-bg" sx={gradientIcon(color)}>
                    <Icon size={24} />
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <TrendingUp size={16} color="#10b981" />
                <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 600 }}>
                    +12% <Typography component="span" variant="caption" sx={{ color: '#64748b', fontWeight: 400 }}>from last month</Typography>
                </Typography>
            </Box>
        </CardContent>
    </Card>
);

export default function Dashboard() {
    const { user } = useAuthStore();
    const [stats, setStats] = useState<DashboardStats | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get<DashboardStats>('/dashboard/stats');
                setStats(data);
            } catch (err) {
                console.error('Failed to fetch stats:', err);
            }
        };
        fetchStats();
    }, []);

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                    Dashboard Overview
                </Typography>
                <Typography color="text.secondary" variant="body1">
                    Welcome back, <Typography component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>{user?.name}</Typography>. Here's what's happening today.
                </Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <StatCard title="My Assets" value={stats?.myAssets ?? 0} color="primary" icon={Laptop} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <StatCard title="Pending Requests" value={stats?.pendingRequests ?? 0} color="secondary" icon={Clock} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <StatCard title="Global Inventory" value={stats?.totalInventory ?? 0} color="warning" icon={Database} />
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper sx={{ p: 0, overflow: 'hidden', height: '100%' }}>
                        <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>Recent Activity</Typography>
                        </Box>
                        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
                            <Typography color="text.secondary" sx={{ textAlign: 'center' }}>
                                Activity feed will be visualised here soon.
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3, bgcolor: 'primary.soft', border: 'none', boxShadow: 'none', height: '100%' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
                            Quick Actions
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <Card sx={{ p: 2, cursor: 'pointer', '&:hover': { bgcolor: 'background.paper', transform: 'translateX(4px)' }, transition: 'all 0.2s' }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Request New Asset</Typography>
                                <Typography variant="caption" color="text.secondary">Order a new laptop or peripheral</Typography>
                            </Card>
                            <Card sx={{ p: 2, cursor: 'pointer', '&:hover': { bgcolor: 'background.paper', transform: 'translateX(4px)' }, transition: 'all 0.2s' }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Report Issue</Typography>
                                <Typography variant="caption" color="text.secondary">Flag a hardware malfunction</Typography>
                            </Card>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
