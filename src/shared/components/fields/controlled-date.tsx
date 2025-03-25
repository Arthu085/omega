import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTime } from 'luxon';
import { UseControllerProps, useController } from 'react-hook-form';

interface Props
  extends UseControllerProps<any>,
  Omit<DatePickerProps<any>, 'defaultValue' | 'name'> { }

export function ControlledDate(props: Props) {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  if (typeof field.value === 'string') field.value = DateTime.fromISO(field.value);
  if (field.value instanceof Date) field.value = DateTime.fromJSDate(field.value);

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <DatePicker
        disableFuture
        {...props}
        {...field}
        onChange={(value: DateTime<boolean> | null) => field.onChange(value ? value.toJSDate() : undefined)}
        slotProps={{
          textField: {
            size: 'small',
            fullWidth: true,
            error: !!error,
            helperText: error?.message,
          },
          field: { clearable: true },
        }}
        format='dd/MM/yyyy'
      />
    </LocalizationProvider>
  );
}
