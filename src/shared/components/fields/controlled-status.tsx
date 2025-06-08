import { useEffect, useState } from 'react';
import { UseControllerProps } from 'react-hook-form';
import { AutocompleteProps } from '@mui/material';

import { formatErrorForNotification } from '@/shared/utils/error';

import { ControlledAutocomplete } from '.';
import { EStatusUser } from '@/modules/user/domain/enums/user-status';

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
  optionsParams?: EStatusUser;
}

export function ControlledStatus({ optionsParams, ...props }: Props) {

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | undefined>();

  const [roles, setRoles] = useState<Array<EStatusUser>>([]);

  async function getStatus() {
    if (loading) return;

    try {
      setLoading(true);
      setError(undefined);
      
      const statusArray = Object.values(EStatusUser).filter(value => 
        typeof value === 'string'
      ) as EStatusUser[];
      
      setRoles(statusArray);
    } catch (error) {
      setError(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <ControlledAutocomplete
      {...props}
      options={roles}
      loading={loading}
      noOptionsText={error}
      getOptionLabel={(role: EStatusUser) => role ?? ''}
      isOptionEqualToValue={(option, selected) => option === selected}
    />
  );
}
