import { ControlledAutocomplete, ControlledText, Page, PageCard, PageHeader, PageTitle } from '@shared/components';
import { useForm } from 'react-hook-form';
import { Box, Button, Grid } from '@mui/material';
import { ProductionDTO } from '@modules/home/domain/dto/production.dto.ts';
import { useState } from 'react';

export function CreateProduction() {
  const { control, handleSubmit, reset } = useForm({});

  const onSubmit = async (formData: ProductionDTO) => {
    console.log(formData)
  };

  return (
    <Page>
      <PageHeader>
        <PageTitle>Nova Produção</PageTitle>
      </PageHeader>
      <PageCard sx={{ flexGrow: 1 }}>
          <Grid container component='form' spacing={2} onSubmit={handleSubmit(onSubmit)}>
            <Grid item md={4} sm={6} xs={12}>
              {/*<ControlledAutocomplete*/}
              {/*  {...props}*/}
              {/*  options={phases}*/}
              {/*  loading={loading}*/}
              {/*  noOptionsText={error}*/}
              {/*  getOptionLabel={(phase: Phase) => phase?.sigla ?? ''}*/}
              {/*  isOptionEqualToValue={(option, selected) => option?.id === selected?.id}*/}
              {/*/>*/}
            </Grid>
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

          <Button variant='contained' color='primary' type='submit'>
            Salvar
          </Button>
      </PageCard>
    </Page>
  );
}