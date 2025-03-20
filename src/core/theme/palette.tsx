import { PaletteMode, PaletteOptions } from '@mui/material';

export const palette: Record<PaletteMode, PaletteOptions> = {
  light: {
    mode: 'light',
    primary: {
      main: '#0066ff',
    },
    secondary: {
      main: '#282C34',
    },
    success: {
      main: '#2B9535',
    },
    warning: {
      main: '#F3B700',
    },
    text: {
      primary: '#191919',
      secondary: '#404040',
      disabled: '#ABABAB',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FAFAFA',
    },
  },
  dark: {
    mode: 'dark',
    primary: {
      main: '#0066ff',
    },
    secondary: {
      main: '#282C34',
    },
    success: {
      main: '#2B9535',
    },
    warning: {
      main: '#F3B700',
    },
  },
};
