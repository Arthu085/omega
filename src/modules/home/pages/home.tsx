import { PageCard, LinkButton, Page, PageButtons, PageHeader, PageTitle } from '@/shared/components';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { Box } from '@mui/material';
import { useState } from 'react';
import { Cards } from '../repositories/home-repository';
import { useAuth } from '@/modules/auth/hooks';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { ProductionListTable } from '../components/production-table';
import { useProductionListParams } from '../hook/production-list-params.hook';
import { HomeRepository } from '../repositories/home-repository';

export function Home() {
  const [cards] = useState<Cards>({
    countAllAssets: 0,
    countAllSubsetsCompany: 0,
  });

  const { user } = useAuth();
    const { watch } = useForm({
        defaultValues: {
            searchText: '',
            level: undefined,
        },
    });
    const searchText = watch('searchText');
    const level = watch('level');
    const repository = new HomeRepository();
    const { params, onChangePagination } = useProductionListParams();
    const { data, isLoading, error, mutate } = useSWR(
        [
            `fornos-${user?.id}`,
            { ...params, filter: { search: searchText, level: level } },
        ],
        ([_url, value]) => repository.list(value),
    );

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
          <Grid xs={12} md={4} item>
            <Card variant='outlined' sx={{ borderRadius: 2, flexGrow: 1, boxShadow: 1 }}>
              <CardContent>
                <Typography variant='h6' component='div'>
                  Total de produções ativas
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
      <PageCard sx={{ flexGrow: 1 }}>
              <Box sx={{ width: '100%' }}>
                  <ProductionListTable
                      data={data}
                      isLoading={isLoading}
                      error={error}
                      mutate={mutate}
                      params={params}
                      onChangePagination={onChangePagination}
                  />
            </Box>
          </PageCard>


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
