import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import { Box, Drawer, AppBar, Toolbar, List, Typography, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Container, Avatar, Tooltip } from '@mui/material';
import { LayoutDashboard, Laptop, FileText, LogOut, ChevronRight } from 'lucide-react';
import { useAuthStore } from '../app/store';

const drawerWidth = 280;

export default function AppLayout() {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        { text: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
        { text: 'Assets', icon: <Laptop size={20} />, path: '/dashboard/assets' },
        { text: 'Requests', icon: <FileText size={20} />, path: '/dashboard/requests' },
    ];

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    bgcolor: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(12px)',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    boxShadow: 'none'
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{
                            width: 32,
                            height: 32,
                            borderRadius: 1,
                            bgcolor: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                        }}>
                            <Laptop size={18} color="white" />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
                            TechVault
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'right', flexDirection: 'column', mr: 1 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, lineHeight: 1 }}>
                                {user?.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                                {user?.role}
                            </Typography>
                        </Box>
                        <Avatar sx={{ width: 36, height: 36, bgcolor: 'secondary.soft', color: 'secondary.main', fontWeight: 600 }}>
                            {user?.name?.[0]?.toUpperCase()}
                        </Avatar>
                        <Tooltip title="Logout">
                            <IconButton
                                onClick={handleLogout}
                                sx={{
                                    color: 'text.secondary',
                                    '&:hover': { color: 'error.main', bgcolor: 'error.soft' }
                                }}
                            >
                                <LogOut size={20} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        bgcolor: 'background.paper',
                        borderRight: '1px solid',
                        borderColor: 'divider'
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto', p: 2 }}>
                    <List sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        {menuItems.map((item) => {
                            const active = location.pathname === item.path;
                            return (
                                <ListItem key={item.text} disablePadding>
                                    <ListItemButton
                                        component={Link}
                                        to={item.path}
                                        sx={{
                                            borderRadius: 2,
                                            mb: 0.5,
                                            bgcolor: active ? 'primary.soft' : 'transparent',
                                            color: active ? 'primary.main' : 'text.secondary',
                                            '&:hover': {
                                                bgcolor: active ? 'primary.soft' : 'action.hover',
                                                color: active ? 'primary.main' : 'text.primary',
                                                '& .chevron': { transform: 'translateX(4px)' }
                                            },
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <ListItemIcon sx={{
                                            minWidth: 40,
                                            color: active ? 'primary.main' : 'inherit',
                                            transition: 'all 0.2s'
                                        }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.text}
                                            primaryTypographyProps={{
                                                fontSize: '0.95rem',
                                                fontWeight: active ? 600 : 500
                                            }}
                                        />
                                        {active && <ChevronRight className="chevron" size={16} style={{ transition: 'transform 0.2s' }} />}
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </Box>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 4, minHeight: '100vh', bgcolor: 'background.default' }}>
                <Toolbar />
                <Container maxWidth="xl" sx={{ mt: 2 }}>
                    <Box className="animate-fade-in">
                        <Outlet />
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}
