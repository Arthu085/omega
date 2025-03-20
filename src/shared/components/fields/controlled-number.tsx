import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';
import { TextField, TextFieldProps } from '@mui/material';
import { useController, UseControllerProps } from 'react-hook-form';

interface Props extends UseControllerProps<any>, Omit<TextFieldProps, 'defaultValue' | 'name'> {
  scale?: number;
  thousandsSeparator?: string;
  padFractionalZeros?: boolean;
  normalizeZeros?: boolean;
  radix?: string;
  mapToRadix?: Array<string>;
  min?: number;
  max?: number;
}

const NumberMask = forwardRef<HTMLElement, any>(function NumberMask(props, inputRef) {
  const { ...other } = props;
  return (
    <IMaskInput {...other} min={undefined} max={undefined} inputRef={inputRef} unmask={true} />
  );
});

export function ControlledNumber({
  fullWidth = true,
  size = 'small',
  scale = 2,
  thousandsSeparator = '',
  padFractionalZeros = false,
  normalizeZeros = true,
  radix = ',',
  mapToRadix = ['.'],
  min,
  max,
  ...props
}: Props) {
  const {
    field: { onChange, value, ...field },
    fieldState: { error },
  } = useController(props);

  const hasValue = value !== undefined && value !== null;

  return (
    <TextField
      {...props}
      {...field}
      size={size}
      value={hasValue ? `${value}` : ''}
      error={props.error ?? !!error}
      fullWidth={fullWidth}
      helperText={props.helperText ?? error?.message}
      InputProps={{
        ...props.InputProps,
        inputComponent: NumberMask,
        inputProps: {
          mask: Number,
          scale: scale, // digits after point, 0 for integers
          thousandsSeparator: thousandsSeparator, // any single char
          padFractionalZeros: padFractionalZeros, // if true, then pads zeros at end to the length of scale
          normalizeZeros: normalizeZeros, // appends or removes zeros at ends
          radix: radix, // fractional delimiter
          mapToRadix: mapToRadix, // symbols to process as radix

          // save as number
          onAccept: (maskedValue: any) => {
            const numberValue = maskedValue === '' ? undefined : Number(maskedValue);
            if (
              numberValue === undefined ||
              (min && min > numberValue) ||
              (max && max < numberValue)
            ) {
              onChange(undefined);
            } else {
              onChange(numberValue);
            }
          },
        },
      }}
    />
  );
}
