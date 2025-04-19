// import { useAuth } from '@/modules/auth/hooks';
// import { useProductivePhaseListParams } from '@/modules/company/hooks/productive-phase-list-params.hook';
import { Cards } from '@/modules/home/repositories/home-repository';
import { Page, PageButtons, PageCard, PageHeader, PageTitle } from '@/shared/components';
import { Box, Button } from '@mui/material';
// import useSWR from 'swr';
// import { ProductivePhaseListTable } from '../components/productive-phase-list-table';
import { useAuth } from '@/modules/auth/hooks';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { FurnaceListTable } from '../components/tabela-fornos';
import { useFornosListParams } from '../hook/furnace-list-params.hook';
import { FurnaceRepository } from '../repositories/furnace.repository';
import { FurnaceCreateModal } from './create/components/create-furnace-modal';
import { FurnaceListFilter } from './create/components/fornos-list-filter';


// import { Cards } from '../repositories/home-repository';
// import { useForm } from 'react-hook-form';

export function Fornos() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [cards] = useState<Cards>({
        countAllAssets: 0,
        countAllSubsetsCompany: 0,
    });



    const { user } = useAuth();
    const { control, watch } = useForm({
        defaultValues: {
            searchText: '',
            level: undefined,
        },
    });
    const searchText = watch('searchText');
    const level = watch('level');
    const repository = new FurnaceRepository();
    const { params, onChangePagination } = useFornosListParams();
    const { data, isLoading, error, mutate } = useSWR(
        [
            `fornos-list-${user?.id}`,
            { ...params, filter: { search: searchText, level: level } },
        ],
        ([_url, value]) => repository.list(value),
    );

    console.log('data: ', data);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = async () => {
        setModalOpen(false);
        await mutate();
    };

    return (
        <Page>
            <PageHeader>
                <PageTitle toHome>Fornos</PageTitle>
                <PageButtons>
                    <Button
                        onClick={handleOpenModal}
                        variant='contained'
                        size='large'
                        sx={{ minWidth: '180px' }}
                    >
                        Novo Forno
                    </Button>
                </PageButtons>
            </PageHeader>
            <PageCard sx={{ flexGrow: 1 }}>
                <Box sx={{ width: '100%' }}>
                    <FurnaceListFilter />
                    <FurnaceListTable
                        data={data}
                        isLoading={isLoading}
                        error={error}
                        mutate={mutate}
                        params={params}
                        onChangePagination={onChangePagination}
                    />
                </Box>
            </PageCard>
            <FurnaceCreateModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </Page>
    );
}
