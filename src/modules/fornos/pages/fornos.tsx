// import { useAuth } from '@/modules/auth/hooks';
// import { useProductivePhaseListParams } from '@/modules/company/hooks/productive-phase-list-params.hook';
import { Cards } from '@/modules/home/repositories/home-repository';
import { Page, PageButtons, PageCard, PageHeader, PageTitle } from '@/shared/components';
import { Box, Button } from '@mui/material';
// import useSWR from 'swr';
// import { ProductivePhaseListTable } from '../components/productive-phase-list-table';
import { useState } from 'react';
import { TabelaFornos } from '../components/tabela-fornos';
import { EStatusForno } from '../domain/enums/status-fornos.enum';
import useSWR from 'swr';
import { FurnaceCreateModal } from './create/components/create-furnace-modal';


// import { Cards } from '../repositories/home-repository';
// import { useForm } from 'react-hook-form';

export function Fornos() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [cards] = useState<Cards>({
        countAllAssets: 0,
        countAllSubsetsCompany: 0,
    });

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = async () => {
        setModalOpen(false);
        // await mutate();
    };


    // const { user } = useAuth();
    // const { control, watch } = useForm({
    //   defaultValues: {
    //     searchText: '',
    //     level: undefined,
    //   },
    // });
    // const searchText = watch('searchText');
    // const level = watch('level');
    // const productivePhaseRepository = new ProductivePhaseRepository();
    // const homeRepository = new HomeRepository();
    // const { params, onChangePagination } = useProductivePhaseListParams();
    // const { data, isLoading, error, mutate } = useSWR(
    //   [
    //     `productive-phase-list-${user?.id}`,
    //     { ...params, filter: { search: searchText, level: level } },
    //   ],
    //   ([_url, value]) => productivePhaseRepository.list(value),
    // );

    // useEffect(() => {
    //   homeRepository.get().then((value) => {
    //     setCards(value);
    //   });
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

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
                    <TabelaFornos
                        logs={[
                            {
                                id: 1,
                                name: 'Fornos 1',
                                nro_forno: 123456,
                                status: EStatusForno.EM_MANUTENCAO,
                                situacao: 'Ativo',
                            },
                            {
                                id: 2,
                                name: 'Fornos 2',
                                nro_forno: 123456,
                                status: EStatusForno.ATIVO,
                                situacao: 'Ativo',
                            },
                        ]}
                    />
                </Box>
            </PageCard>
            <FurnaceCreateModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </Page>
    );
}
