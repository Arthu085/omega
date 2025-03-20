import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '@/core/theme';
import { ConfirmDialog } from '@/shared/components';
import { AuthenticatedHeader } from './components/header/authenticated-header';
import { AuthenticatedSidebar } from './components/sidebar/authenticated-sidebar';

export function Authenticated() {
  const { themeMode } = useTheme();

  return (
    <Box
      paddingLeft={{ sm: '64px', xs: 0 }}
      flexDirection='column'
      minHeight='100vh'
      display='flex'
      width='100%'
      flexGrow={1}
      sx={{
        '.Toastify .Toastify__toast-container .Toastify__toast .Toastify__toast-body': {
          alignItems: 'start',
          whiteSpace: 'pre-line',
        },
      }}
    >
      <ConfirmDialog>
        <AuthenticatedSidebar>
          <AuthenticatedHeader />

          <Box
            component='main'
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: { md: 3, sm: 2, xs: 2 },
              gap: { md: 3, sm: 2, xs: 2 },
            }}
          >
            <Outlet />
          </Box>
        </AuthenticatedSidebar>
      </ConfirmDialog>

      <ToastContainer theme={themeMode} pauseOnHover draggable pauseOnFocusLoss />
    </Box>
  );
}
