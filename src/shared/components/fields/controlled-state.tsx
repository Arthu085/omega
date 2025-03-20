/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';
import { Autocomplete, AutocompleteProps, TextField } from '@mui/material';

import { BrazilState } from '../../domain';
import { BrazilRepository } from '../../repositories';

interface ControlledStateProps
  extends UseControllerProps<any>,
    Omit<
      AutocompleteProps<any, boolean, false, false>,
      'defaultValue' | 'name' | 'renderInput' | 'options'
    > {
  label?: string;
  disabledErrorOnValue?: boolean;
}

export function ControlledState({
  fullWidth = true,
  size = 'small',
  multiple,
  label,
  disabledErrorOnValue,
  ...props
}: ControlledStateProps) {
  const {
    field: { value, onChange, ...field },
    fieldState: { error },
  } = useController(props);

  const repository = new BrazilRepository();

  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<Array<BrazilState>>([]);
  const [selected, setSelected] = useState<BrazilState | null>(null);
  const [selectees, setSelectees] = useState<Array<BrazilState>>([]);

  function handleChange(data: BrazilState | Array<BrazilState> | null) {
    multiple
      ? setSelectees((data as Array<BrazilState> | null) ?? [])
      : setSelected(data as BrazilState | null);

    onChange(
      multiple
        ? (data as Array<BrazilState> | null)?.map(({ acronym }) => acronym) ?? []
        : (data as BrazilState | null)?.acronym ?? '',
    );
  }

  async function getStates(): Promise<void> {
    if (loading) return;

    setLoading(true);

    const data = await repository.states();

    setOptions(data ?? []);

    setLoading(false);
  }

  useEffect(() => {
    if (!options.length) getStates();
  }, []);

  useEffect(() => {
    if (multiple) {
      setSelectees(options.filter((option) => !!value && value.includes(option.acronym)) ?? []);
    } else {
      setSelected(options.find((option) => option.acronym === value) ?? null);
    }
  }, [value, options]);

  if (props.disabled)
    return (
      <TextField
        disabled
        size={size}
        error={!!error}
        label={label}
        fullWidth={fullWidth}
        helperText={error?.message}
        value={multiple ? selectees.map((s) => s.name).join(', ') : selected?.name ?? ''}
      />
    );

  return (
    <Autocomplete
      {...props}
      size={size}
      options={options}
      loading={loading}
      multiple={multiple}
      fullWidth={fullWidth}
      value={multiple ? selectees : selected}
      onChange={(_, data) => handleChange(data)}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, selected) => option.acronym == selected.acronym}
      renderInput={(params) => (
        <TextField
          {...field}
          {...params}
          size={size}
          label={label}
          error={!disabledErrorOnValue ? !!error : !!error && !value}
          helperText={
            !disabledErrorOnValue ? (!!error && !value ? error?.message : undefined) : undefined
          }
          InputProps={{
            ...params.InputProps,
            readOnly: props.readOnly,
          }}
        />
      )}
    />
  );
}
