/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Autocomplete, AutocompleteProps, TextField } from '@mui/material';
import { UseControllerProps, useController } from 'react-hook-form';
import { IOption } from '../../domain/interfaces/option.interface';

interface ControlledEnumProps
  extends UseControllerProps<any>,
    Omit<
      AutocompleteProps<any, boolean, false, false>,
      'renderInput' | 'translate' | 'options' | 'onChange' | 'value'
    > {
  translate?: Record<string, string>;
  options: Record<string, string>;
  excludeOptions?: Array<string>;
  label?: string;
}

export function ControlledEnum({
  translate,
  multiple,
  options,
  label,
  excludeOptions = [],
  ...props
}: ControlledEnumProps) {
  const {
    field: { value, onChange, ...field },
    fieldState: { error },
  } = useController(props);

  const [selected, setSelected] = useState<IOption<string> | null>(null);
  const [selectees, setSelectees] = useState<Array<IOption<string>>>([]);

  const formattedOptions = Object.entries(options)
    .map(([key, value]) => ({
      label: key,
      value: value,
    }))
    .filter((options) => !excludeOptions.includes(options.value));

  function handleChange(data: IOption<string> | IOption<string>[] | null) {
    multiple
      ? setSelectees((data as Array<IOption<string>> | null) ?? [])
      : setSelected(data as IOption<string> | null);

    onChange(
      multiple
        ? (data as Array<IOption<string>> | null)?.map(({ value }) => value) ?? []
        : (data as IOption<string> | null)?.value,
    );
  }

  function EnumKeyToLabel(key: string): string {
    if (translate) return translate[key];

    return key
      .split('_')
      .map((label) => label.toLowerCase())
      .map((label) => {
        const first = label.at(0);
        if (first) return label.replace(first, first.toUpperCase());
        return label;
      })
      .join(' ');
  }

  function formatLabel(key: string | null): string {
    if (!key) return '';

    return EnumKeyToLabel(key);
  }

  useEffect(() => {
    multiple
      ? setSelectees(formattedOptions.filter((option) => !!value && value.includes(option.value)))
      : setSelected(formattedOptions.find((option) => option.value == value) ?? null);
  }, [value]);

  if (props.disabled)
    return (
      <TextField
        disabled
        label={label}
        error={!!error}
        size={props.size ?? 'small'}
        fullWidth={props.fullWidth ?? true}
        helperText={error?.message}
        value={
          multiple
            ? selectees.map((v) => formatLabel(v?.label || null)).join(', ')
            : formatLabel(selected?.label || null)
        }
      />
    );

  return (
    <Autocomplete
      {...props}
      {...field}
      multiple={multiple}
      size={props.size ?? 'small'}
      fullWidth={props.fullWidth ?? true}
      options={formattedOptions}
      value={multiple ? selectees : selected}
      onChange={(_, data) => handleChange(data as IOption<string> | IOption<string>[] | null)}
      getOptionLabel={(option) => formatLabel(option.label)}
      isOptionEqualToValue={(option, selected) => option.value == selected.value}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.value}>
            {formatLabel(option.label)}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={!!error}
          helperText={error?.message}
          InputProps={{ ...params.InputProps, readOnly: props.readOnly }}
        />
      )}
    />
  );
}
