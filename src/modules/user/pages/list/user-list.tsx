import {
  Page,
  PageButtons,
  PageCard,
  PageHeader,
  PageTitle,
} from '@/shared/components';
import { UserListFilter } from './components/user-list-filter';
import { UserListTable } from './components/user-list-table';
import { useState } from 'react';
//import { Cards } from '@/modules/home/repositories/home-repository';
import { useAuth } from '@/modules/auth/hooks';
import { useForm } from 'react-hook-form';
import { UserRepository } from '../../repositories';
import { useUserListParams } from '../../hooks';
import useSWR from 'swr';
import { Button } from '@mui/material';
import { UserCreateForm } from '../create/components/user-create-form';

export function UserList() {
  const [isModalOpen, setModalOpen] = useState(false);
 // const [cards] = useState<Cards>({
  //    countAllAssets: 0,
  //    countAllSubsetsCompany: 0,
 // });

  const { user } = useAuth();
  const { watch } = useForm({
      defaultValues: {
          searchText: '',
          level: undefined,
      },
  });
  const searchText = watch('searchText');
  const level = watch('level');
  const repository = new UserRepository();
  const { params, onChangePagination } = useUserListParams();
  const { data, isLoading, error, mutate } = useSWR(
      [
          `fornos-${user?.id}`,
          { ...params, filter: { search: searchText, level: level } },
      ],
      ([_url, value]) => repository.list(value),
  );

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = async () => {
      setModalOpen(false);
      await mutate();
  };

  return (
    <Page>
      <PageHeader>
        <PageTitle toHome>Usuários</PageTitle>

        <PageButtons>
          <Button onClick={handleOpenModal}
                        variant='contained'
                        size='large'
                        sx={{ minWidth: '180px' }}>
            Novo funcionário
          </Button>
        </PageButtons>
      </PageHeader>

      <PageCard sx={{ flexGrow: 1 }}>
        <UserListFilter />

        <UserListTable 
          data={data}
          isLoading={isLoading}
          error={error}
          mutate={mutate}
          params={params}
          onChangePagination={onChangePagination}
        />
      </PageCard>
      <UserCreateForm isOpen={isModalOpen} onClose={handleCloseModal} />
    </Page>
  );
}
