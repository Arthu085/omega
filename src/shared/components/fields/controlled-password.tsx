import { MouseEvent, useState } from 'react';
import { LockOpenOutlined, LockOutlined } from '@mui/icons-material';
import { useController, UseControllerProps } from 'react-hook-form';
import { IconButton, InputAdornment, TextField, TextFieldProps, Tooltip } from '@mui/material';

interface ControlledPasswordProps
  extends UseControllerProps<any>,
    Omit<TextFieldProps, 'defaultValue' | 'name'> {}

export function ControlledPassword({
  fullWidth = true,
  size = 'small',
  placeholder = '********',
  ...props
}: ControlledPasswordProps) {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  const [show, setShow] = useState(false);

  function handleClickShowPassword() {
    setShow((prev) => !prev);
  }

  function handleMouseDownPassword(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
  }
  

  return (
    <TextField
      {...props}
      {...field}
      size={size}
      fullWidth={fullWidth}
      placeholder={placeholder}
      minRows={props.minRows ?? 4}
      error={props.error ?? !!error}
      helperText={props.helperText ?? error?.message}
      type={show ? 'text' : 'password'}
      InputProps={{
        ...props.InputProps,
        endAdornment: (
          <InputAdornment position={size === 'small' ? 'end' : 'start'}>
            <Tooltip arrow placement='left' title={show ? 'Esconder' : 'Visualizar'}>
              <IconButton
                edge='end'
                size={size}
                color='inherit'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                disabled={props.disabled || field.disabled}
              >
                {show ? <LockOpenOutlined /> : <LockOutlined />}
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      }}
    />
  );
}
