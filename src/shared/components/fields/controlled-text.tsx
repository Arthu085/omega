import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';
import { TextField, TextFieldProps } from '@mui/material';
import { useController, UseControllerProps } from 'react-hook-form';

interface ControlledTextProps
  extends UseControllerProps<any>,
    Omit<TextFieldProps, 'defaultValue' | 'name'> {
  mask?: string | Array<{ mask: string }>;
  maxLength?: number;
  disabledErrorOnValue?: boolean;
}

const TextMask = forwardRef<HTMLElement, any>(function TextMask(props, inputRef) {
  const { mask, onChange, readOnly, ...other } = props;

  return (
    <IMaskInput
      {...other}
      mask={mask}
      unmask={true}
      inputRef={inputRef}
      // DO NOT USE onChange TO HANDLE CHANGES!
      // USE onAccept INSTEAD
      onAccept={
        // depending on prop above first argument is
        // `value` if `unmask=false`,
        // `unmaskedValue` if `unmask=true`,
        // `typedValue` if `unmask='typed'`
        (value, _mask) => onChange(value)
      }
    />
  );
});

export function ControlledText({
  fullWidth = true,
  size = 'small',
  mask,
  maxLength,
  ...props
}: ControlledTextProps) {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return (
    <TextField
      {...props}
      {...field}
      size={size}
      fullWidth={fullWidth}
      minRows={props.minRows ?? 4}
      value={field.value ?? ""}
      error={props.error ?? (!props.disabledErrorOnValue ? !!error : !!error && !field.value)}
      helperText={
        props.helperText ??
        (!props.disabledErrorOnValue
          ? !!error && !field.value
            ? error?.message
            : undefined
          : undefined)
      }
      InputProps={{
        ...props.InputProps,
        inputComponent: mask ? TextMask : undefined,
        inputProps: {
          mask,
          maxLength,
        },
      }}
    />
  );
}
