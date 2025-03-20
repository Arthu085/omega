import { Fragment, MouseEvent, useEffect, useState } from 'react';
import { Bedtime, Logout, Person, WbSunny } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Avatar,
  ClickAwayListener,
  Divider,
  Fade,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography,
} from '@mui/material';

import { useTheme } from '@/core/theme/theme';
import { useAuth } from '@/modules/auth/hooks';
import { EAuthenticatedPath } from '@/core/router';

export function AuthenticatedHeaderProfile() {
  const navigate = useNavigate();
  const { themeMode, toggleThemeMode } = useTheme();
  const { pathname } = useLocation();
  const { logout, user } = useAuth();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  function handleToggle(event: MouseEvent<HTMLElement>) {
    setOpen((previousValue) => !previousValue);
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setOpen(false);
    setAnchorEl(null);
  }

  function configurate() {
    navigate(EAuthenticatedPath.USER_SETTINGS);
  }

  const avatar = undefined;

  useEffect(() => {
    if (pathname) handleClose();
  }, [pathname]);

  return (
    <Fragment>
      <Avatar
        title='Perfil'
        alt='Foto de Perfil'
        src={avatar}
        onClick={handleToggle}
        data-mode={themeMode}
        sx={{
          boxShadow: 1,
          backgroundColor: 'background.paper',
          color: 'primary.main',
          transition: '0.3s ease',
          cursor: 'pointer',
          '&:hover': {
            filter: 'brightness(0.85)',
          },
          '&[data-mode="dark"]': {
            color: 'text.primary',
          },
        }}
      >
        <Person />
      </Avatar>

      <Popper
        placement='bottom-end'
        open={open}
        anchorEl={anchorEl}
        transition
        disablePortal
        sx={{ zIndex: 9 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 4,
                minWidth: 240,
                maxWidth: 300,
                marginTop: 1,
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <Stack gap={2} padding={2}>
                  <Stack direction='row' gap={2} alignItems='center'>
                    <Avatar
                      alt='Foto de Perfil'
                      src={undefined}
                      data-mode={themeMode}
                      sx={{
                        width: 60,
                        height: 60,
                        boxShadow: 2,
                        backgroundColor: 'background.paper',
                        color: 'primary.main',
                        '&[data-mode="dark"]': {
                          color: 'text.primary',
                        },
                      }}
                    >
                      <Person fontSize='large' />
                    </Avatar>

                    <Stack width='calc(100% - 80px)'>
                      <Typography>{user?.name ?? 'Nome do usuário'}</Typography>

                      <Typography fontSize='0.75rem' fontWeight='bold' color='primary'>
                        {user?.role?.name ?? 'Perfil do Usuário'}
                      </Typography>

                      <Typography fontSize='0.75rem' textOverflow='ellipsis' overflow='hidden'>
                        {user?.email ?? 'usuario@email.com'}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Divider flexItem />

                  <List dense disablePadding sx={{ borderRadius: 3, overflow: 'hidden' }}>
                    <ListItem disablePadding disableGutters>
                      <ListItemButton onClick={toggleThemeMode}>
                        <ListItemIcon sx={{ minWidth: '20px', marginRight: 2 }}>
                          {themeMode === 'dark' ? (
                            <WbSunny fontSize='small' sx={{ color: 'text.primary' }} />
                          ) : (
                            <Bedtime fontSize='small' sx={{ color: 'text.primary' }} />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={themeMode === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
                        />
                      </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding disableGutters>
                      <ListItemButton onClick={configurate}>
                        <ListItemIcon sx={{ minWidth: '20px', marginRight: 2 }}>
                          <SettingsIcon fontSize='small' sx={{ color: 'text.primary' }} />
                        </ListItemIcon>
                        <ListItemText primary='Configurações' />
                      </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding disableGutters>
                      <ListItemButton onClick={logout}>
                        <ListItemIcon sx={{ minWidth: '20px', marginRight: 2 }}>
                          <Logout fontSize='small' sx={{ color: 'text.primary' }} />
                        </ListItemIcon>
                        <ListItemText primary='Sair' />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Stack>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Fragment>
  );
}
