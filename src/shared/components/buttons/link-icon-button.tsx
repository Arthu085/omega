import { IconButton, IconButtonProps } from '@mui/material';
import { Link, LinkProps } from 'react-router-dom';

interface LinkIconButtonProps
  extends Omit<IconButtonProps, 'component' & 'LinkComponent' & 'href'>,
    Pick<
      LinkProps,
      'reloadDocument' | 'replace' | 'state' | 'preventScrollReset' | 'relative' | 'to'
    > {}

export function LinkIconButton({ children, to, ...props }: LinkIconButtonProps) {
  return (
    <IconButton component={Link} to={to} {...props}>
      {children}
    </IconButton>
  );
}
