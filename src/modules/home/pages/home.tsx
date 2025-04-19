// import { useAuth } from '@/modules/auth/hooks';
// import { useProductivePhaseListParams } from '@/modules/company/hooks/productive-phase-list-params.hook';
import { LinkButton, Page, PageButtons, PageCard, PageHeader, PageTitle } from '@/shared/components';
import { Card, CardContent, Grid, Typography } from '@mui/material';
// import useSWR from 'swr';
// import { ProductivePhaseListTable } from '../components/productive-phase-list-table';
import { useState } from 'react';
import { Cards } from '../repositories/home-repository';
// import { useForm } from 'react-hook-form';

export function Home() {
  const [cards] = useState<Cards>({
    countAllAssets: 0,
    countAllSubsetsCompany: 0,
  });
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
        <PageTitle toHome>Minhas Produções</PageTitle>
        <PageButtons>
          <LinkButton to='./novo' variant='contained' size='large' sx={{ minWidth: '180px' }}>
            Nova Produção
          </LinkButton>
        </PageButtons>
        <Grid spacing={3} container>
          <Grid xs={12} md={4} item>
            <Card variant='outlined' sx={{ borderRadius: 2, flexGrow: 1, boxShadow: 1 }}>
              <CardContent>
                <Typography variant='h6' component='div'>
                  Total de produções
                </Typography>
                <Typography variant='h5' color={'primary'}>
                  {cards.countAllAssets}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* <Grid xs={12} md={4} item>
            <Card variant='outlined' sx={{ borderRadius: 2, flexGrow: 1, boxShadow: 1 }}>
              <CardContent>
                <Typography variant='h6' component='div'>
                  Alarmes Disparados
                </Typography>
                <Typography variant='h5' color={'primary'}>
                  {cards.countAllSubsetsCompany}
                </Typography>
              </CardContent>
            </Card>
          </Grid> */}

          {/* <Grid xs={12} md={4} item>
            <Card variant='outlined' sx={{ borderRadius: 2, flexGrow: 1, boxShadow: 1 }}>
              <CardContent>
                <Typography variant='h6' component='div'>
                  Alarmes ativados
                </Typography>
                <Typography variant='h5' color={'primary'}>
                  {cards.countAllSubsetsCompany}
                </Typography>
              </CardContent>
            </Card>
          </Grid> */}
        </Grid>
      </PageHeader>


      {/* 
      {data && data.data && data.data.length > 0 && (
        <Grid item xs={12}>
          <AlarmLogTable logs={data.data} />
        </Grid>
      )} */}

      {/* <PageCard sx={{ flexGrow: 1 }}> 
        <Grid spacing={2} container>
          <Grid md={12} item>
            <Typography variant='h6'>Produções</Typography>
          </Grid>
          <Grid md={6} item>
            <Grid item md={12}>
              <ControlledDebounce name='level' control={control} label='Nível' fullWidth />
            </Grid>
          </Grid>
          <Grid md={6} item>
            <Grid item md={12}>
              <ControlledDebounce name='searchText' control={control} label='Procurar' fullWidth />
            </Grid>
          </Grid> 
           <Grid md={12} item>
            <AlarmCardProps
              name="name"
              description="Descrição breve"
              onDelete={() => console.log("Excluir")}
              onHistory={() => console.log("Histórico")}
              onRename={() => console.log("Renomear")}
            />
          </Grid> 
        </Grid>
      </PageCard> */}
    </Page>
  );
}
