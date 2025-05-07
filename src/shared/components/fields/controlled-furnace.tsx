import { AutocompleteProps } from '@mui/material';
import { useEffect, useState } from 'react';
import { UseControllerProps } from 'react-hook-form';

import { formatErrorForNotification } from '@/shared/utils/error';

import { FornosListDTO } from '@/modules/fornos/domain/dto/fornos-list.dto';
import { FurnaceEntity } from '@/modules/fornos/domain/entities/furnace.entity';
import { FurnaceRepository } from '@/modules/fornos/repositories/furnace.repository';
import { ControlledAutocomplete } from '.';

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
    optionsParams?: FornosListDTO;
}

export function ControlledFurnace({ optionsParams, ...props }: Props) {
    const repository = new FurnaceRepository();

    const [loading, setLoading] = useState<boolean>(false);

    const [error, setError] = useState<string | undefined>();

    const [furnace, setFurnace] = useState<Array<FurnaceEntity>>([]);

    async function getFurnace() {
        if (loading) return;

        try {
            setLoading(true);
            setError(undefined);

            const { data } = await repository.list({
                ...optionsParams!,
                pagination: { take: 100, skip: 1 },
            });

            setFurnace(data);
        } catch (error) {
            setError(formatErrorForNotification(error));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getFurnace();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ControlledAutocomplete
            {...props}
            options={furnace}
            loading={loading}
            noOptionsText={error}
            getOptionLabel={(furnace: FurnaceEntity) => {
                return furnace?.nome ?? '';
            }}
            isOptionEqualToValue={(option, selected) => option?.id === selected?.id}
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option.id}>
                        {option.nome}
                    </li>
                );
            }}
        />
    );

}
