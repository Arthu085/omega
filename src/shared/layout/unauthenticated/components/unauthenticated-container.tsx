import { ReactNode, useMemo } from 'react';
import { Paper, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { EUnauthenticatedPath } from '@/core/router';

interface Props {
  children: ReactNode;
}

export function UnauthenticatedContainer({ children }: Props) {
  const { pathname } = useLocation();

  const maxWidth = useMemo(
    () => (pathname === EUnauthenticatedPath.SIGN_UP ? '600px' : '400px'),
    [pathname],
  );

  return (
    <Paper
      component='main'
      elevation={3}
      sx={{
        width: '100%',
        maxWidth: maxWidth,
        borderRadius: 4,
      }}
    >
      <Box
        sx={{
          gap: 3,
          padding: 3,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {children}
      </Box>
    </Paper>
  );
}
