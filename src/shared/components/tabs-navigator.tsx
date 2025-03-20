import { Link, useLocation } from 'react-router-dom';
import { Tab, Tabs as MUITabs, useMediaQuery, Theme } from '@mui/material';
import { IOption } from '../domain/interfaces';

interface TabsNavigatorProps {
  tabs: Array<IOption<string>>;
  rootPath?: string;
}

export function TabsNavigator({ tabs, rootPath }: TabsNavigatorProps) {
  const isMobile: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  function useCurrentTabByRoutePath(pathDefault?: string) {
    const { pathname } = useLocation();
    const pathnameSplit = pathname.split('/');
    const lastPath = pathnameSplit.at(-1);

    if (lastPath && lastPath !== 'novo' && isNaN(lastPath as any)) {
      return lastPath;
    }

    return pathDefault ?? '';
  }

  const currentTab = useCurrentTabByRoutePath(rootPath);

  return (
    <MUITabs
      value={currentTab === rootPath ? '' : currentTab}
      variant={isMobile ? 'scrollable' : 'fullWidth'}
      sx={{
        width: '100%',
        '.MuiTabs-scrollButtons': {
          transition: '0.3s ease',
          '&.Mui-disabled': {
            opacity: '0.3',
          },
        },
      }}
      allowScrollButtonsMobile
      scrollButtons
    >
      {tabs.map(({ value, label }) => {
        return <Tab key={label} label={label} value={value} component={Link} to={value} />;
      })}
    </MUITabs>
  );
}
