import { ReactNode } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormControlLabelProps,
  Stack,
  Typography,
} from '@mui/material';

interface ControlledCheckboxProps
  extends UseControllerProps<any>,
    Omit<CheckboxProps, 'defaultValue' | 'name'> {
  label?: ReactNode;
  labelProps?: Omit<FormControlLabelProps, 'control' | 'label'>;
  messageError?: string;
}

export function ControlledCheckbox({
  label,
  labelProps,
  messageError,
  ...props
}: ControlledCheckboxProps) {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return (
    <>
      {!error && (
        <FormControlLabel
          {...labelProps}
          label={label}
          control={<Checkbox {...field} checked={field.value ? true : false} />}
        />
      )}
      {error && (
        <Stack>
          <FormControlLabel
            {...labelProps}
            label={label}
            control={<Checkbox {...field} checked={field.value ? true : false} />}
          />
          <Typography variant='body1' color={'error'}>
            {messageError ?? error.message}
          </Typography>
        </Stack>
      )}
    </>
  );
}
