import { Components, Theme } from '@mui/material';

export const components: Components<Omit<Theme, 'components'>> = {
  MuiCssBaseline: {
    styleOverrides: (theme) => ({
      '*': {
        scrollBehavior: 'smooth',
      },
      '*::-webkit-scrollbar': {
        height: 8,
        width: 8,
        background: 'transparent',
        borderRadius: 4,
      },
      '*::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.primary.main,
        borderRadius: 4,
      },
    }),
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        textTransform: 'none',
        borderRadius: 42,
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 28,
      },
    },
  },
  MuiInputAdornment: {
    styleOverrides: {
      root: {
        color: 'inherit',
      },
    },
  },
  MuiLink: {
    styleOverrides: {
      root: ({ theme: { palette } }) => ({
        '&:hover': { color: palette.primary.main },
      }),
    },
  },
  MuiAppBar: {
    defaultProps: {
      square: true,
      elevation: 1,
    },
    styleOverrides: {
      root: ({ theme: { palette } }) => ({
        background: palette.mode === 'light' ? palette.background.default : undefined,
      }),
    },
  },
  MuiBreadcrumbs: {
    defaultProps: {
      maxItems: 3,
    },
    styleOverrides: {
      root: ({ theme: { palette } }) => ({
        color: palette.text.primary,
        '& .MuiLink-root': {
          color: palette.text.secondary,
          '&:hover': {
            color: palette.primary.main,
          },
        },
      }),
      separator: ({ theme: { palette } }) => ({
        color: palette.primary.main,
        fontWeight: 'bold',
        marginX: 0,
      }),
    },
  },
  MuiDrawer: {
    styleOverrides: {
      root: ({ theme: { palette } }) => ({
        background: palette.background.default,
        '&.custom-sidebar': {
          '.custom-sidebar-logo': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 48,
            height: 48,
            maxWidth: 192,
            maxHeight: {
              sm: 48,
              xs: 48,
            },
            '& svg': { transform: '0.3s ease' },
          },
          '.custom-sidebar-items': {
            overflowY: 'auto',
            overflowX: 'hidden',
            flexGrow: 1,
            '[open=true]': {
              overflowX: 'auto',
            },
            '& ul.MuiList-root': {
              padding: 8,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            },
            '&::-webkit-scrollbar': {
              width: 0,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'transparent',
            },
          },
          '.custom-sidebar-button': {
            fontWeight: 'bold',
            borderRadius: 36,
            padding: '6px',
            gap: 12,
            '& .MuiListItemIcon-root': {
              backgroundColor: palette.background.paper,
              color: palette.text.primary,
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              borderRadius: '100%',
              minWidth: 0,
              padding: 0,
              height: 36,
              width: 36,
            },
            '& .MuiListItemText-root': {
              color: palette.text.primary,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              '& .MuiTypography-root': {
                fontSize: '1rem',
              },
            },
            '& .custom-sidebar-button-toggle': {
              color: palette.primary.contrastText,
            },
            '&.Mui-selected, &.Mui-selected:hover': {
              backgroundColor: palette.background.paper,
              '.MuiListItemIcon-root': {
                backgroundColor: palette.primary.main,
                color: palette.primary.contrastText,
              },
              '.MuiListItemText-root': {
                color: palette.text.primary,
                '& .MuiTypography-root': {
                  fontWeight: 'bold',
                },
              },
              '.custom-sidebar-button-toggle': {
                color: palette.primary.main,
              },
            },
          },
          '& .MuiDivider-root': {
            marginRight: 8,
            marginLeft: 8,
          },
        },
      }),
    },
  },
};
