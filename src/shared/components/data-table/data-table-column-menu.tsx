import { Stack, Theme, useMediaQuery } from '@mui/material';
import { IMenu } from '@/shared/domain/interfaces/menu.interface';
import { MenuIconButton } from '../buttons';

interface Props {
  items: Array<IMenu>;
  vertical?: number | 'bottom' | 'top' | 'center';
  horizontal?: number | 'center' | 'left' | 'right';
}

export function DataTableColumnMenu({ items, vertical = 'top', horizontal = 'right' }: Props) {
  const isMobile: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <Stack flexDirection='row' justifyContent='end' onClick={(e) => e?.stopPropagation()}>
      <MenuIconButton
        options={items}
        vertical={isMobile ? 'bottom' : vertical}
        horizontal={horizontal}
      />
    </Stack>
  );
}
