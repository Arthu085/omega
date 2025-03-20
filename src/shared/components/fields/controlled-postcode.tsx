/* eslint-disable react-hooks/exhaustive-deps */
import { forwardRef, useEffect, useState } from 'react';
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
  Tooltip,
} from '@mui/material';
import { useController, UseControllerProps, useFormContext } from 'react-hook-form';
import { LocationOff, LocationOn } from '@mui/icons-material';
import { IMaskInput } from 'react-imask';

import { Address } from '@/shared/domain';
import { BrazilRepository } from '@/shared/repositories';

interface ControlledPostcodeProps
  extends UseControllerProps<any>,
  Omit<TextFieldProps, 'defaultValue' | 'name'> {
  initialDisabledAutofill?: boolean;
}

const TextMask = forwardRef<HTMLElement, any>(function TextMask(props, inputRef) {
  const { mask, onChange, ...other } = props;

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

export function ControlledPostcode({
  fullWidth = true,
  size = 'small',
  initialDisabledAutofill = false,
  ...props
}: ControlledPostcodeProps) {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  const { setValue } = useFormContext();

  const repository = new BrazilRepository();

  const [loading, setLoading] = useState<boolean>(false);
  const [disabledAutofill, setDisabledAutofill] = useState<boolean>(initialDisabledAutofill);

  async function getAddress(postcode: string): Promise<void> {
    if (loading) return;
    try {
      setLoading(true);

      const address: Partial<Address> = await repository.address(postcode);

      const { name } = props;

      const prefixHasDots = name.includes('.');
      const hasPrefix = name !== 'postcode' || prefixHasDots;
      const prefix = prefixHasDots ? name.replace('postcode', '') : name.replace('Postcode', '');

      const addressFields: Array<keyof Partial<Address>> = [
        'state',
        'city',
        'complement',
        'street',
      ];

      addressFields.forEach((field) => {
        const fieldName = hasPrefix
          ? prefix + (prefixHasDots ? field : field.charAt(0).toUpperCase() + field.slice(1))
          : field;

        if (address[field]) {
          setValue(fieldName, address[field]);
        }
      });
    } catch {
      setDisabledAutofill(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (
      field.value?.length === 8 &&
      !disabledAutofill &&
      !props.disabled &&
      !props.InputProps?.readOnly
    ) {
      getAddress(field.value);
    }
  }, [field.value, disabledAutofill]);

  return (
    <TextField
      {...props}
      {...field}
      size={size}
      fullWidth={fullWidth}
      minRows={props.minRows ?? 4}
      error={props.error ?? !!error}
      helperText={props.helperText ?? error?.message}
      InputProps={{
        ...props.InputProps,
        inputComponent: TextMask,
        inputProps: {
          mask: '00000-000',
        },
        endAdornment: (
          <InputAdornment position={size === 'small' ? 'end' : 'start'}>
            {loading && (
              <CircularProgress
                size={size === 'small' ? '2rem' : '3rem'}
                sx={{
                  width: '100%',
                  position: 'absolute',
                  right: size === 'small' ? undefined : 6,
                }}
              />
            )}
            <Tooltip
              arrow
              placement='left'
              title={
                disabledAutofill ? 'Ativar auto preenchimento' : 'Desativar auto preenchimento'
              }
            >
              <span>
                <IconButton
                  onClick={() => setDisabledAutofill((prev) => !prev)}
                  size={size}
                  edge='end'
                  disabled={props.disabled || props.InputProps?.readOnly}
                >
                  {disabledAutofill ? <LocationOff /> : <LocationOn />}
                </IconButton>
              </span>
            </Tooltip>
          </InputAdornment>
        ),
      }}
    />
  );
}
