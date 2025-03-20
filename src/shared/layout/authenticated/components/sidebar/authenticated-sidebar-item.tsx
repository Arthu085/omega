/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useAuth } from '@/modules/auth/hooks';
import { EAbilityAction } from '@/modules/role/domain/enums/ability-action.enum';
import { ISidebarItem } from '@/shared/domain';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Theme,
  useMediaQuery,
} from '@mui/material';

interface Props {
  item: ISidebarItem;
  openedSidebar: boolean;
  toggleSidebar: () => void;
}

function accessPermission(user?: any, reference?: any): boolean {
  if (user?.role.reference === 'ADMIN') return true;
  if (!reference) return true;

  return (
    user?.role?.permissions?.some(
      (roleAbility: any) =>
        roleAbility.code === reference && roleAbility.action === EAbilityAction.READ
    ) ?? false
  );
}

export function AuthenticatedSidebarItem({ item, openedSidebar, toggleSidebar }: Props) {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [openSubList, setOpenSubList] = useState(false);

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  function toggleSubList() {
    if (!openedSidebar) toggleSidebar();
    setOpenSubList((prev) => !prev);
  }

  const { itemWithAccessPermission, hasChildren, childrenWithAccessPermission } = useMemo(() => {
    return {
      itemWithAccessPermission: accessPermission(user, item.ability),
      hasChildren: Boolean(item.children?.length),
      childrenWithAccessPermission: item.children
        ?.filter(({ ability }) => {
          accessPermission(user, ability)
        }) ?? []
    };
  }, [user, item]);

  useEffect(() => {
    if (!openedSidebar && openSubList) setOpenSubList(false);
  }, [openedSidebar]);

  useEffect(() => {
    if (!isMobile && openedSidebar) toggleSidebar();
  }, [pathname]);

  if (hasChildren && !childrenWithAccessPermission.length) return <></>;

  if (itemWithAccessPermission)
    return (
      <Stack>
        <ListItemButton
          disableGutters
          className='custom-sidebar-button'
          to={!hasChildren ? item.path : undefined}
          component={!hasChildren ? Link : 'button'}
          onClick={hasChildren ? toggleSubList : undefined}
          selected={[item.path, `${item.path}/`].includes(pathname)}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>

          <ListItemText primary={item.name} />

          {hasChildren &&
            (openSubList ? (
              <ExpandLess className='custom-sidebar-button-toggle' />
            ) : (
              <ExpandMore className='custom-sidebar-button-toggle' />
            ))}
        </ListItemButton>

        {Boolean(childrenWithAccessPermission.length) && (
          <Collapse in={openSubList}>
            <List disablePadding component='div' sx={{ marginLeft: '48px', marginTop: 1 }}>
              {childrenWithAccessPermission.map(({ name, path }, index) => {
                return (
                  <ListItemButton
                    className='custom-sidebar-button'
                    key={`${name}-${index}`}
                    component={Link}
                    disableGutters
                    disableRipple
                    to={path}
                  >
                    <ListItemText primary={name} sx={{ paddingLeft: 1 }} />
                  </ListItemButton>
                );
              })}
            </List>
          </Collapse>
        )}
      </Stack>
    );
}
