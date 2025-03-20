import { ReactNode } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import {
  Switch,
  SwitchProps,
  FormControlLabel,
  FormControlLabelProps,
  Stack,
  Typography,
} from '@mui/material';

interface ControlledSwitchProps
  extends UseControllerProps<any>,
    Omit<SwitchProps, 'defaultValue' | 'name'> {
  label?: ReactNode;
  labelProps?: Omit<FormControlLabelProps, 'control' | 'label'>;
  messageError?: string;
}

export function ControlledSwitch({
  label,
  labelProps,
  messageError,
  ...props
}: ControlledSwitchProps) {
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
          control={<Switch {...field} checked={field.value ? true : false} />}
        />
      )}
      {error && (
        <Stack>
          <FormControlLabel
            {...labelProps}
            label={label}
            control={<Switch {...field} checked={field.value ? true : false} />}
          />
          <Typography variant="body1" color="error">
            {messageError ?? error.message}
          </Typography>
        </Stack>
      )}
    </>
  );
}
