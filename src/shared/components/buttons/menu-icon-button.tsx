import { Fragment, MouseEvent, PropsWithChildren, useState } from 'react';
import { IconButton, Menu as MuiMenu, MenuItem, PopoverOrigin } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { IMenu } from '@/shared/domain';

interface MenuIconButtonProps extends PropsWithChildren {
  options: Array<IMenu>;
  vertical?: number | 'bottom' | 'top' | 'center';
  horizontal?: number | 'center' | 'left' | 'right';
}

export function MenuIconButton({
  children,
  options,
  vertical = 'top',
  horizontal = 'right',
}: MenuIconButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const origin: PopoverOrigin = {
    vertical,
    horizontal,
  };

  function handleClick(event: MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <Fragment>
      <IconButton onClick={handleClick}>{children || <MoreVert />}</IconButton>

      <MuiMenu
        elevation={1}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={origin}
        transformOrigin={origin}
      >
        {options.map(({ label, action, disabled }) => (
          <MenuItem
            key={label}
            onClick={() => {
              handleClose();
              action();
            }}
            disabled={disabled}
          >
            {label}
          </MenuItem>
        ))}
      </MuiMenu>
    </Fragment>
  );
}
