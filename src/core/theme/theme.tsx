import { PropsWithChildren, createContext, useCallback, useContext, useMemo } from 'react';
import {
  CssBaseline,
  PaletteMode,
  ThemeProvider as MUIThemeProvider,
  createTheme,
  useMediaQuery,
  Theme,
} from '@mui/material';
import { ptBR } from '@mui/material/locale';
import { useLocalStorage } from 'usehooks-ts';

import { components } from './components';
import { palette } from './palette';

interface ITheme {
  themeMode: PaletteMode;
  theme?: Theme;
  changeThemeMode: (_mode: PaletteMode) => void;
  toggleThemeMode: () => void;
}

const ThemeContext = createContext<ITheme>({
  themeMode: 'light',
  changeThemeMode: () => { },
  toggleThemeMode: () => { },
});

export function ThemeProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useLocalStorage<PaletteMode>(
    '@omega/theme-mode',
    useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light',
  );

  const toggleThemeMode = useCallback(
    () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark')),
    [setMode],
  );

  const changeThemeMode = useCallback((value: PaletteMode) => setMode(value), [setMode]);

  const theme = useMemo(
    () =>
      createTheme(
        {
          palette: palette[mode],
          components,
        },
        ptBR,
      ),
    [mode],
  );

  return (
    <ThemeContext.Provider value={{ themeMode: mode, changeThemeMode, toggleThemeMode, theme }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  return useContext(ThemeContext);
}
