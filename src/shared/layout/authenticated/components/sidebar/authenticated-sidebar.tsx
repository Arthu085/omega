import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import {
  Box,
  ClickAwayListener,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Theme,
  useMediaQuery,
} from '@mui/material';
import { Logout } from '@mui/icons-material';

import { AUTHENTICATED_ROUTES, toSidebar } from '@/core/router';

import { Logo } from '@/shared/components/logo';

import { useAuth } from '@/modules/auth/hooks';

import { AuthenticatedSidebarItem } from './authenticated-sidebar-item';

interface ISidebarContext {
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<ISidebarContext>({
  openSidebar: () => { },
  closeSidebar: () => { },
  toggleSidebar: () => { },
});

function SidebarPaper(open: boolean, isMobile?: boolean) {
  const style = {
    overflow: 'hidden',
    maxWidth: 280,
    width: 280,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    border: 'none',
    backgroundColor: 'background.default',
  };

  if (!isMobile) {
    Object.assign(style, {
      minWidth: open ? 280 : 64,
      width: open ? 280 : 64,
      transition: '0.3s ease',
    });
  }

  return style;
}

export function AuthenticatedSidebar({ children }: { children: ReactNode }) {
  const { logout } = useAuth();

  const [open, setOpen] = useState<boolean>(false);

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const items = useMemo(() => toSidebar(AUTHENTICATED_ROUTES), []);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleToggle() {
    setOpen(!open);
  }

  function handleConfirmLogout() {
    logout();
  }

  return (
    <SidebarContext.Provider
      value={{
        openSidebar: handleOpen,
        closeSidebar: handleClose,
        toggleSidebar: handleToggle,
      }}
    >
      {children}
      <ClickAwayListener onClickAway={!isMobile ? handleClose : () => { }}>
        <Drawer
          className='custom-sidebar'
          variant={isMobile ? 'temporary' : 'permanent'}
          onMouseEnter={!isMobile ? handleOpen : undefined}
          onMouseLeave={!isMobile ? handleClose : undefined}
          onClose={isMobile ? handleClose : undefined}
          open={open}
          anchor='left'
          PaperProps={{
            elevation: 1,
            sx: SidebarPaper(open, isMobile),
          }}
        >
          <Stack
            justifyContent='center'
            alignItems='center'
            flexWrap='nowrap'
            direction='row'
            padding={1}
            gap={1}
          >
            <Box className='custom-sidebar-logo'>
              <Logo />
            </Box>
          </Stack>

          <Divider flexItem />

          <Box className='custom-sidebar-items' data-open={open}>
            <List dense disablePadding>
              {items.map((item, index) => (
                <AuthenticatedSidebarItem
                  key={`sidebar-item-${index}`}
                  toggleSidebar={handleToggle}
                  openedSidebar={open}
                  item={item}
                />
              ))}
            </List>
          </Box>

          <Divider flexItem />

          <List dense disablePadding>
            <ListItemButton
              className='custom-sidebar-button'
              onClick={handleConfirmLogout}
              sx={{ margin: 1 }}
              disableGutters
            >
              <ListItemIcon>
                <Logout />
              </ListItemIcon>

              <ListItemText primary='Sair' />
            </ListItemButton>
          </List>
        </Drawer>
      </ClickAwayListener>
    </SidebarContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSidebar() {
  return useContext(SidebarContext);
}
