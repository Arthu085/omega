import { Chip, ChipProps } from '@mui/material';
import { IStatus } from '@/shared/domain';

interface Props<T> extends Omit<ChipProps, 'label' | 'color' | 'icon'> {
  status: Array<IStatus<T>>;
  value: T;
}

export function DataTableColumnStatus<T>({ status, value, ...props }: Props<T>) {
  const { label, color, icon } = status.find((item) => item.value === value) ?? ({} as IStatus<T>);

  return <Chip icon={icon} color={color} label={label} {...props} />;
}
