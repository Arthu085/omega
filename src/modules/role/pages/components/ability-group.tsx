//import { useAuth } from '@/modules/auth/hooks';
import {
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Ability } from '../../domain';
import {
  EAbilityAction,
  EAbilityActionTranslate,
  EAbilityCodes,
  EAbilityCodesTranslate
} from '../../domain/enums/';
import { RoleCreateData } from '../../domain/schemas/role-create.schema';

interface Props {
  code: EAbilityCodes;
  abilities: Ability[];
  onChange: (select: boolean, ...abilities: Ability[]) => void;
}

export function AbilityGroup({ code, abilities, onChange }: Props) {
  //const { user } = useAuth();
  const { watch } = useFormContext<RoleCreateData>();

  const baseProfile = watch('baseProfile');
  const disabled: boolean = baseProfile! ? true : false;
  
  const selectedAbilities: Ability[] = watch('permissions') ?? [];

  //const reference = watch('reference');

  //const isAdminCompany =  ( reference === ERoleReference.ADMIN_COMPANY ) || ( user?.role?.reference === ERoleReference.ADMIN_COMPANY );
  //const isNoProfile = ( reference === ERoleReference.NO_PROFILE) || ( user?.role?.reference === ERoleReference.NO_PROFILE );

  //if ( isAdminCompany && code === EAbilityCodes.COMPANIES ) return
  //if ( isNoProfile && ( code === EAbilityCodes.COMPANIES || code === EAbilityCodes.COMPANY ) ) return

  return (
    <Paper elevation={1} sx={{ padding: 1, width: 300 }}>
      <Stack>
        <Stack direction='row' alignItems='center' gap={1}>
          <Typography
            width='100%'
            variant='h6'
            fontWeight='bold'
            color='text.secondary'
            textAlign='right'
          >
            {EAbilityCodesTranslate[code]}
          </Typography>
          <Checkbox
            onChange={(e) => onChange(e.target.checked, ...abilities)}
            checked={selectedAbilities.filter((a) => a.code === code).length === abilities.length}
            disabled={disabled}
          />
        </Stack>
        <Divider />
        {abilities.length > 1 && (
          <List dense>
            {abilities.map((ability: Ability) => (
              <ListItem
                key={ability.id}
                secondaryAction={
                  <Checkbox
                    edge='end'
                    onChange={(e) => onChange(e.target.checked, ability)}
                    checked={!!selectedAbilities.find((a) => a.id === ability.id)}
                    disabled={disabled}
                  />
                }
              >
                <ListItemText
                  sx={{ textAlign: 'end', paddingRight: 2 }}
                  primary={EAbilityActionTranslate[ability.action as EAbilityAction]}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Stack>
    </Paper>
  );
}
