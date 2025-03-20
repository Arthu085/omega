import { useEffect, useState } from 'react';
import { UseControllerProps } from 'react-hook-form';
import { AutocompleteProps } from '@mui/material';

import { formatErrorForNotification } from '@/shared/utils/error';

import { ControlledAutocomplete } from '.';
import { RoleRepository } from '@/modules/role/repositories/role.repository';
import { Role } from '@/modules/role/domain';
import { RoleListDTO } from '@/modules/role/domain/dto';

interface Props
  extends UseControllerProps<any>,
    Omit<
      AutocompleteProps<any, false, false, false>,
      | 'defaultValue'
      | 'name'
      | 'renderInput'
      | 'options'
      | 'getOptionLabel'
      | 'isOptionEqualToValue'
    > {
  label?: string;
  optionsParams?: RoleListDTO;
}

export function ControlledRole({ optionsParams, ...props }: Props) {
  const repository = new RoleRepository();

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | undefined>();

  const [roles, setRoles] = useState<Array<Role>>([]);

  async function getRoles() {
    if (loading) return;

    try {
      setLoading(true);
      setError(undefined);

      const { data } = await repository.list({...optionsParams!});

      setRoles(data);
    } catch (error) {
      setError(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getRoles();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ControlledAutocomplete
      {...props}
      options={roles}
      loading={loading}
      noOptionsText={error}
      getOptionLabel={(role: Role) => role?.name ?? ''}
      isOptionEqualToValue={(option, selected) => option?.id === selected?.id}
    />
  );
}
