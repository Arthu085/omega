import { productionUpdateSchema } from '@/modules/home/domain/schemas/production-update.schema';
import { ControlledNumber, ControlledText } from '@/shared/components';
import { ControlledFurnace } from '@/shared/components/fields/controlled-furnace';
import { Divider, Grid, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';

export function UpdateProductionForm() {
    const { control } = useFormContext<productionUpdateSchema>();

    return (
        <Grid container spacing={2}>
            <Grid item md={12} sm={12} xs={12} marginTop={6}>
                <Typography component='h2' variant='h5' fontWeight='bold'>
                    Dados da produção
                </Typography>
                <Divider orientation='horizontal' variant='middle' flexItem />
            </Grid>

            <Grid item md={6} sm={12} xs={12}>
                <ControlledFurnace label='Fornos' name='forno' control={control} />
            </Grid>

            <Grid item md={3} sm={6} xs={12}>
                <ControlledText label='Lote frita' name='loteFrita' control={control} />
            </Grid>

            <Grid item md={3} sm={6} xs={12}>
                <ControlledNumber label='Temperatura' name='temperatura' control={control} />
            </Grid>

            <Grid item md={6} sm={12} xs={12}>
                <ControlledText label='Oleo' name='oleo' control={control} />
            </Grid>

            <Grid item md={6} sm={12} xs={12}>
                <ControlledText label='Oxigenio' name='oxigenio' control={control} />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
                <ControlledNumber label='Peso (KG)' name='peso' control={control} />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
                <ControlledNumber label='RPM' name='rpm' control={control} />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
                <ControlledNumber label='T. Movel' name='tMovel' control={control} />
            </Grid>
        </Grid>
    );
}
