/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';
import { Autocomplete, AutocompleteProps, TextField } from '@mui/material';

import { BrazilRepository } from '../../repositories';
import { BrazilCity } from '../../domain';

interface ControlledCityProps
  extends UseControllerProps<any>,
    Omit<
      AutocompleteProps<any, false, false, false>,
      'defaultValue' | 'name' | 'renderInput' | 'options'
    > {
  label?: string;
  state?: string;
  disabledErrorOnValue?: boolean;
}

export function ControlledCity({
  fullWidth = true,
  size = 'small',
  multiple,
  state,
  label,
  disabledErrorOnValue,
  ...props
}: ControlledCityProps) {
  const {
    field: { value, onChange, ...field },
    fieldState: { error },
  } = useController(props);

  const repository = new BrazilRepository();

  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<Array<BrazilCity>>([]);
  const [selected, setSelected] = useState<BrazilCity | null>(null);
  const [selectees, setSelectees] = useState<Array<BrazilCity>>([]);

  function getNoOptionsText() {
    if (!state) return 'Selecione um estado.';

    return 'Nenhuma cidade encontrada.';
  }

  function handleChange(data: BrazilCity | Array<BrazilCity> | null) {
    multiple
      ? setSelectees((data as Array<BrazilCity> | null) ?? [])
      : setSelected(data as BrazilCity | null);

    onChange(
      multiple
        ? (data as Array<BrazilCity> | null)?.map(({ name }) => name) ?? []
        : (data as BrazilCity | null)?.name ?? '',
    );
  }

  async function getCities(brazilState: string): Promise<void> {
    if (loading) return;

    setLoading(true);

    const data = await repository.cities(brazilState);

    setOptions(data ?? []);

    setLoading(false);
  }

  useEffect(() => {
    if (state) {
      getCities(state);
    } else {
      setOptions([]);
    }
  }, [state]);

  useEffect(() => {
    if (multiple) {
      setSelectees(options.filter((option) => !!value && value.includes(option.name)) ?? []);
    } else {
      setSelected(options.find((option) => option.name === value) ?? null);
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
      options={options}
      loading={loading}
      multiple={multiple}
      fullWidth={fullWidth}
      noOptionsText={getNoOptionsText()}
      value={multiple ? selectees : selected}
      onChange={(_, data) => handleChange(data)}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, selected) => option.name == selected.name}
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
