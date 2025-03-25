import { ChangeEvent, forwardRef, useCallback, useEffect, useState } from 'react';
import { debounce, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { useController, UseControllerProps } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import { Search } from '@mui/icons-material';

interface Props extends UseControllerProps<any>, Omit<TextFieldProps, 'defaultValue' | 'name'> {
  mask?: string | Array<{ mask: string }>;
}

const TextMask = forwardRef<HTMLElement, any>(function TextMask(props, ref) {
  const { mask, ...other } = props;
  return <IMaskInput {...other} mask={mask} inputRef={ref as any} />;
});

export function ControlledDebounce({ mask, ...props }: Props) {
  const {
    field: { onChange, value, ...field },
    fieldState: { error },
  } = useController(props);

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  const [debounceValue, setDebounceValue] = useState<string>(value);

  const handleDebounce = debounce(handleOnChange, 875);

  const handleOnChangeDebounce = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      event.persist();
      setDebounceValue(event.target.value);
      handleDebounce(event);
    },
    [handleDebounce],
  );

  useEffect(() => {
    if (value && typeof value === 'string') setDebounceValue(value);
  }, [value]);

  return (
    <TextField
      {...props}
      {...field}
      size={props.size ?? 'small'}
      fullWidth={props.fullWidth ?? true}
      error={!!error}
      helperText={error?.message}
      value={debounceValue}
      onChange={handleOnChangeDebounce}
      InputProps={{
        autoComplete: 'off',
        inputComponent: mask ? TextMask : undefined,
        inputProps: {
          mask: mask,
        },
        endAdornment: (
          <InputAdornment position='end'>
            {props.InputProps?.endAdornment ?? <Search />}
          </InputAdornment>
        ),
      }}
    />
  );
}
