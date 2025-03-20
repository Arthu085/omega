import { Button, ButtonProps } from '@mui/material';
import { Link, LinkProps } from 'react-router-dom';

interface LinkButtonProps
  extends Omit<ButtonProps, 'component' & 'LinkComponent' & 'href'>,
    Pick<
      LinkProps,
      'reloadDocument' | 'replace' | 'state' | 'preventScrollReset' | 'relative' | 'to'
    > {}

export function LinkButton({ children, to, ...props }: LinkButtonProps) {
  return (
    <Button component={Link} to={to} {...props}>
      {children}
    </Button>
  );
}
