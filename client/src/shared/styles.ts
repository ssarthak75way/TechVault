import type { SxProps, Theme } from '@mui/material';

export const glassPanel: SxProps<Theme> = {
    bgcolor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
};

export const cardHover: SxProps<Theme> = {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 20px -10px rgba(0,0,0,0.15)'
    }
};

export const gradientIcon = (color: string): SxProps<Theme> => ({
    p: 1.5,
    borderRadius: 2,
    bgcolor: `${color}.soft`,
    color: `${color}.main`,
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'scale(1.1)'
    }
});

export const pageHeader: SxProps<Theme> = {
    mb: 4,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
};

export const registrationPage: SxProps<Theme> = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    position: 'relative',
    overflow: 'hidden'
};

export const decorativeBlur = (color: string, position: 'top' | 'bottom'): SxProps<Theme> => ({
    position: 'absolute',
    [position === 'top' ? 'top' : 'bottom']: -100,
    [position === 'top' ? 'right' : 'left']: -100,
    width: 400,
    height: 400,
    borderRadius: 'full',
    bgcolor: `${color}.soft`,
    filter: 'blur(100px)',
    opacity: 0.5
});
