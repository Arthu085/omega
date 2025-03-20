import { Fragment, useEffect, useState } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';
import {
  Autocomplete,
  AutocompleteProps,
  CircularProgress,
  TextField,
  Tooltip,
} from '@mui/material';
import { Info } from '@mui/icons-material';

interface ControlledAutocompleteProps
  extends UseControllerProps<any>,
    Omit<AutocompleteProps<any, any, any, any>, 'defaultValue' | 'name' | 'renderInput'> {
  label?: string;
  placeholder?: string;
  tooltip?: () => string;
}

export function ControlledAutocomplete({
  options,
  multiple,
  placeholder,
  getOptionLabel,
  isOptionEqualToValue,
  tooltip,
  ...props
}: ControlledAutocompleteProps) {
  const {
    field: { value, onChange, ...field },
    fieldState: { error },
  } = useController(props);

  const [selected, setSelected] = useState<unknown | null>(null);

  useEffect(() => {
    !multiple &&
      setSelected(
        options.find((option) => isOptionEqualToValue && isOptionEqualToValue(option, value)) ??
          null,
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, options]);

  const size = props.size ?? 'small';
  const fullWidth = props.fullWidth ?? true;

  if (props.disabled)
    return (
      <TextField
        disabled
        label={props.label}
        size={size}
        fullWidth={fullWidth}
        error={!!error}
        helperText={error?.message}
        value={getOptionLabel && selected ? getOptionLabel(multiple ? value : selected) : ''}
      />
    );

  return (
    <Autocomplete
      {...props}
      multiple={multiple}
      value={multiple ? value : selected}
      fullWidth={fullWidth}
      onChange={(_, data) => onChange(data)}
      options={options}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      ChipProps={{
        ...props.ChipProps,
        size: size,
      }}
      renderInput={(params) => (
        <TextField
          {...field}
          {...params}
          placeholder={placeholder}
          label={props.label}
          size={size}
          error={!!error}
          helperText={error?.message}
          InputProps={{
            ...params.InputProps,
            readOnly: props.readOnly,
            endAdornment: (
              <Fragment>
                {props.loading && (
                  <CircularProgress color='inherit' size='1.25rem' title='Carregando...' />
                )}
                {!props.readOnly && params.InputProps.endAdornment}
                {tooltip && (
                  <Tooltip title={tooltip()}>
                    <Info />
                  </Tooltip>
                )}
              </Fragment>
            ),
          }}
        />
      )}
    />
  );
}
