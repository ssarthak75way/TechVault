import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, TextField, Button, Typography, Alert, Paper, Container, InputAdornment, IconButton, Fade } from '@mui/material';
import { Mail, Lock, Eye, EyeOff, Laptop } from 'lucide-react';
import { api } from '../../app/api';
import { useAuthStore } from '../../app/store';
import type { User } from '../../shared/types';
import { glassPanel, registrationPage, decorativeBlur } from '../../shared/styles';

interface LoginResponse {
    accessToken: string;
    user: User;
}

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const setAuth = useAuthStore((state) => state.setAuth);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { data } = await api.post<LoginResponse>('/auth/login', { email, password });
            setAuth(data.user, data.accessToken);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={registrationPage}>
            <Box sx={decorativeBlur('primary', 'top')} />
            <Box sx={decorativeBlur('secondary', 'bottom')} />

            <Container maxWidth="sm">
                <Fade in timeout={800}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Box sx={{
                            width: 64,
                            height: 64,
                            borderRadius: 2,
                            bgcolor: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 3,
                            boxShadow: '0 8px 16px rgba(37, 99, 235, 0.2)',
                            backgroundImage: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)'
                        }}>
                            <Laptop size={32} color="white" />
                        </Box>

                        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, letterSpacing: '-0.02em' }}>
                            Welcome to <Box component="span" className="gradient-text">TechVault</Box>
                        </Typography>
                        <Typography color="text.secondary" sx={{ mb: 4, fontWeight: 500 }}>
                            Manage your hardware assets with ease
                        </Typography>

                        <Paper elevation={0} sx={{ ...glassPanel, p: 5, width: '100%' }}>
                            {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

                            <Box component="form" onSubmit={handleSubmit}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Mail size={18} color="#64748b" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock size={18} color="#64748b" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    sx={{ mt: 4, py: 1.5, fontSize: '1rem' }}
                                    disabled={loading}
                                >
                                    {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
                                </Button>

                                <Box sx={{ mt: 3, textAlign: 'center' }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Don't have an account? {' '}
                                        <Link to="/register" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>
                                            Join Now
                                        </Link>
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Box>
                </Fade>
            </Container>
        </Box>
    );
}
