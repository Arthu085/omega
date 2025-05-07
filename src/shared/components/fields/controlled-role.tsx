import { useEffect, useState } from 'react';
import { UseControllerProps } from 'react-hook-form';
import { AutocompleteProps } from '@mui/material';

import { formatErrorForNotification } from '@/shared/utils/error';

import { ControlledAutocomplete } from '.';
import { RoleListDTO } from '@/modules/role/domain/dto';
import {  ERolesUser } from '@/modules/user/domain/enums/user-roles';

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

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | undefined>();

  const [roles, setRoles] = useState<Array<ERolesUser>>([]);

  async function getRoles() {
    if (loading) return;

    try {
      setLoading(true);
      setError(undefined);
      
      const rolesArray = Object.values(ERolesUser).filter(value => 
        typeof value === 'string'
      ) as ERolesUser[];
      
      setRoles(rolesArray);
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
      getOptionLabel={(role: ERolesUser) => role ?? ''}
      isOptionEqualToValue={(option, selected) => option === selected}
    />
  );
}
