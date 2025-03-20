import { Grid } from '@mui/material';
import { RoleAbilities } from '../../components/ability';

export function RoleForm() {

  return (
    <Grid container spacing={2}>
      <Grid item md={12} sm={12} xs={12}>
          <RoleAbilities/>
      </Grid>
    </Grid>
  );
}