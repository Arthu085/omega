import { Grid } from '@mui/material';

export function UserUpdateFilter() {

  // const { control } = useFormContext<UserUpdateData>();

  return (
    <Grid container spacing={2} component='form'>
      {/* {(user?.role?.reference === ERoleReference.ADMIN) &&
        <Grid item md={6} sm={12} xs={12} >
          <ControlledCompany label='Empresa' name='company' control={control} />
        </Grid>
      } */}

      {/* <Grid item md={6} sm={12} xs={12} >
        <ControlledText label='Negócio' name='business' control={control} />
      </Grid> */}
      {/* <Grid item md={3} sm={6} xs={6}>
        <ControlledEnum
          label='Status'
          name='status'
          options={EStatus}
          translate={EStatusTranslate}
          control={methods.control}
        />
      </Grid> */}
      {/* <Grid item md={3} sm={6} xs={6}>
        <ControlledRole label='Perfil' name='role' control={control} />
      </Grid> */}
    </Grid>
  );
}
