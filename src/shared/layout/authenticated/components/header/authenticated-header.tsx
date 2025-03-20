import { AppBar, IconButton, Stack, Theme, Toolbar, useMediaQuery } from '@mui/material';
import { Menu } from '@mui/icons-material';

import { AuthenticatedHeaderBreadcrumbs } from './authenticated-header-breadcrumbs';
import { AuthenticatedHeaderProfile } from './authenticated-header-profile';
import { useSidebar } from '../sidebar/authenticated-sidebar';

export function AuthenticatedHeader() {
  const { openSidebar } = useSidebar();

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <AppBar position='static'>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        {isMobile && (
          <IconButton onClick={openSidebar} title='Menu'>
            <Menu sx={{ color: 'primary.main' }} />
          </IconButton>
        )}

        {!isMobile && <AuthenticatedHeaderBreadcrumbs />}

        <Stack flexDirection='row' alignItems='center' gap={2}>
          <AuthenticatedHeaderProfile />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
