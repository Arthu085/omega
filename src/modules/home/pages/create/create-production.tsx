import { ControlledFurnace } from '@/shared/components/fields/controlled-furnace';
import { ProductionDTO } from '@modules/home/domain/dto/production.dto.ts';
import { Button, Grid } from '@mui/material';
import { ControlledText, Page, PageCard, PageHeader, PageTitle } from '@shared/components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProductionRepository } from '../../repositories/home-repository';
import { EAuthenticatedPath } from '@/core/router';


interface ProductionCreateProps {
  id?: number | undefined;
  data?: ProductionDTO | undefined;
}

export function CreateProduction({
  id = undefined,
  data = undefined,
}: ProductionCreateProps) {
  const { control, handleSubmit, reset } = useForm<ProductionDTO>({
    defaultValues: data || {}
  });
  const navigate = useNavigate();

  const repository = new ProductionRepository();

  const onSubmit = async (formData: ProductionDTO) => {
    console.log('formData: ', formData);
    if (data && id) {
      const production = {
        idForno: formData.forno?.id,
        loteFrita: formData.loteFrita,
        lote: formData.lote,
        temperatura: formData.temperatura,
        oleo: formData.oleo,
        oxigenio: formData.oxigenio,
        peso: formData.peso,
        rpm: formData.rpm,
        tMovel: formData.tMovel,
      };
      repository
        .update(id, production)
        .then(async () => {
          reset();
          toast.success('Produção atualizada com sucesso!');
          navigate(EAuthenticatedPath.PRODUCAO);
        })
        .catch((e) => {
          console.log(e);
          toast.error(`Ooops! Um erro ocorreu! ${e.response?.data?.message}.`);
        });
    } else {
      const { forno, ...data } = formData;
      try {
        (data as any).idForno = forno?.id;
      } catch (e) {
        console.log(e);
        toast.error("Selecione um forno!");
        return;
      }

      repository
        .create(data)
        .then(async () => {
          reset();
          toast.success('Produção criada com sucesso!');
          navigate(EAuthenticatedPath.PRODUCAO);
        })
        .catch((e) => {
          console.log(e);
          toast.error(`Ooops! Um erro ocorreu! ${e.response?.data?.message}.`);
        });
    }
  };


  return (
    <Page>
      <PageHeader>
        <PageTitle>Nova Produção</PageTitle>
      </PageHeader>
      <PageCard sx={{ flexGrow: 1 }}>
        <form onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item md={4} sm={6} xs={12}>
              <ControlledFurnace label='Fornos' name='forno' control={control} />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <ControlledText label='Lote frita' name='loteFrita' control={control} />
            </Grid>
            <Grid item md={2} sm={6} xs={12}>
              <ControlledText label='Lote' name='lote' control={control} />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item md={3} sm={6} xs={12}>
              <ControlledText label='Temperatura' name='temperatura' control={control} />
            </Grid>
            <Grid item md={2} sm={6} xs={12}>
              <ControlledText label='Oleo' name='oleo' control={control} />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 3 }}>
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
        </form>

      </PageCard>
    </Page>
  );
}