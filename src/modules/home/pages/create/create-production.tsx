import { ControlledText, Page, PageCard, PageHeader, PageTitle } from '@shared/components';
import { useForm } from 'react-hook-form';
import { Button, Grid } from '@mui/material';
import { CreateProductionEntity } from '@modules/home/domain/entities/create-production.entity.ts';

export function CreateProduction() {
  const { control } = useForm<CreateProductionEntity>();

  return (
    <Page>
      <PageHeader>
        <PageTitle>Nova Produção</PageTitle>
      </PageHeader>
      <PageCard sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item md={4} sm={6} xs={12}>
            <ControlledText label='Lote frita' name='loteFrita' control={control} />
          </Grid>

          <Grid item md={2} sm={6} xs={12}>
            <ControlledText label='Lote' name='lote' control={control} />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item md={3} sm={6} xs={12}>
            <ControlledText label='Temperatura' name='temperatura' control={control} />
          </Grid>

          <Grid item md={2} sm={6} xs={12}>
            <ControlledText label='Oleo' name='oleo' control={control} />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item md={2} sm={6} xs={12}>
            <ControlledText label='Oxigenio' name='oxigenio' control={control} />
          </Grid>

          <Grid item md={3} sm={6} xs={12}>
            <ControlledText label='Peso (KG)' name='peso' control={control} />
          </Grid>

          <Grid item md={3} sm={6} xs={12}>
            <ControlledText label='RPM' name='rpm' control={control} />
          </Grid>

          <Grid item md={3} sm={6} xs={12}>
            <ControlledText label='T. Movel' name='tMovel' control={control} />
          </Grid>
        </Grid>

        <Button
          variant='contained'
          color='primary'
          size='large'
          onClick={() => {}}>
          Salvar
        </Button>
      </PageCard>
    </Page>
  );
}