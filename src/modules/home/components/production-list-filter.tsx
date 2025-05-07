import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { ControlledDebounce } from '@/shared/components';
import { useProductionListParams } from '../hook/production-list-params.hook';
import { IProductionListFilter } from '../interface/productionListFilterInterface';

export function ProductionListFilter() {
    const { params, onChangeFilter } = useProductionListParams();

    console.log('params: ', params);

    const { control, watch } = useForm<IProductionListFilter>({
        defaultValues: {
            search: params.filter.search ?? '',
            level: params.filter.level ?? undefined,
        },
    });

    const search = watch('search');
    const level = watch('level');

    useEffect(() => {
        onChangeFilter({
            search: search,
            level: level,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, level]);

    return (
        <Grid container spacing={2} component='form'>
            <Grid item md={6} sm={6} xs={6}>
                <ControlledDebounce label='Número de identificação' name='level' control={control} />
            </Grid>

            <Grid item md={6} sm={6} xs={6}>
                <ControlledDebounce label='Procurar' name='search' control={control} />
            </Grid>
        </Grid>
    );
}
