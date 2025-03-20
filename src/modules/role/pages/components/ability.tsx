import { Grid, LinearProgress, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Title from '@/shared/components/title';
import { AbilityGroup } from './ability-group';

// import { EAuthenticatedPath } from '@/core/router';
import { EAbilityCodes } from '../../domain';

import { formatErrorForNotification } from '@/shared/utils/error';
import { groupAbilityByReference } from '../../helpers';
import { RoleRepository } from '../../repositories/role.repository';

import { Ability } from '../../domain';
import { RoleCreateData } from '../../domain/schemas/role-create.schema';

export function RoleAbilities() {
  const navigate = useNavigate();
  const repository = new RoleRepository();

  const [loading, setLoading] = useState<boolean>(false);
  const [groups, setGroups] = useState<Record<EAbilityCodes, Array<Ability>>>();

  const { watch, setValue } = useFormContext<RoleCreateData>();
  
  const selectedAbilities: Ability[] = watch('permissions') ?? [];

  function handleChangeAbility(select: boolean, ...abilities: Ability[]) {
    if (select) {
      setValue(
        'permissions',
        [...selectedAbilities, ...abilities].filter(
          (sa, index, arr) => arr.findIndex((a) => a.id === sa.id) === index,
        ),
      );
      return;
    }
    setValue(
      'permissions',
      selectedAbilities.filter((sa) => !abilities.find((a) => sa.id === a.id)),
    );
  }

  async function getAbilities() {
    if (loading) return;

    try {
      setLoading(true);

      const abilities = await repository.listAllAbilities();

      setGroups(groupAbilityByReference(abilities));
    } catch (error) {
      toast.error(formatErrorForNotification(error));
      navigate(`/${''}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!groups) getAbilities();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Title>Permissões</Title>
      </Grid>

      {loading && (
        <Grid item xs={12}>
          <LinearProgress sx={{ width: '100%' }} />
        </Grid>
      )}
      <Grid item xs={12}>
        <Stack direction='row' flexWrap='wrap' justifyContent='center' gap={4}>
          {Object.entries(groups ?? {}).map(([code, abilities]) => (
            <AbilityGroup
              onChange={handleChangeAbility}
              key={code}
              code={code as EAbilityCodes}
              abilities={abilities}
            />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}
