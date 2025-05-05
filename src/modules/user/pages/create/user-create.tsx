import {
  LinkButton,
  LoadingButton,
  Page,
  PageButtons,
  PageCard,
  PageHeader,
  PageTitle,
} from '@/shared/components';
import { EStatus } from '@/shared/domain';
import { formatErrorForNotification } from '@/shared/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { UserCreateDTO, UserCreateData, userCreateSchema } from '../../domain';
import { UserRepository } from '../../repositories';
import { UserCreateFilter } from './components/user-create-filter';
import { UserForm } from './components/user-create-form';

export function UserCreate() {
  const [loading, setLoading] = useState<boolean>(false);
  const userRepository = new UserRepository();

  const methods = useForm<UserCreateData>({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      status: EStatus.ACTIVE,
      registration: '',
    },
    resolver: zodResolver(userCreateSchema),
  });

  async function create(data: UserCreateDTO) {
    if (loading) return;

    try {
      setLoading(true);

      await userRepository.create(data);

      toast.success('Usuário cadastrado com sucesso!');
      // navigate(EAuthenticatedPath.USERS);
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  async function submit(data: UserCreateData) {
    const user = {
      name: data.name,
      username: data.username,
      registration: data.registration,
      email: data.email,
      password: data.password,
      status: data.status,
      roleId: data.role?.id
    }
    create(user);
  }

  function alertMessage(error: any) {
    const errorMessages: any = Object.values(error);
    const firstMessage: string = errorMessages[0].message;
    toast.error(firstMessage);
  }

  return (
    <Page>
      <PageHeader>
        <PageTitle toHome>Novo Usuário</PageTitle>

        <PageButtons>
          <LinkButton to='/usuarios' variant='outlined' size='large' sx={{ minWidth: '180px' }}>
            Cancelar
          </LinkButton>
          <LoadingButton
            loading={loading}
            loadingIndicator='Salvando...'
            onClick={methods.handleSubmit(submit, alertMessage)}
            variant='contained'
            size='large'
            sx={{ width: '180px' }}
          >
            Salvar
          </LoadingButton>
        </PageButtons>
      </PageHeader>

      <PageCard sx={{ flexGrow: 1 }}>
        <FormProvider {...methods}>
          <UserCreateFilter />
          <UserForm />
        </FormProvider>
      </PageCard>
    </Page>
  );
}
