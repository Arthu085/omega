import { EAuthenticatedPath } from '@/core/router';
import {
  LinkButton,
  LoadingButton,
  Page,
  PageButtons,
  PageCard,
  PageHeader,
  PageTitle,
} from '@/shared/components';
import { formatErrorForNotification } from '@/shared/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserCreateFilter } from './components/user-create-filter';
import { UserRepository } from '../../repositories';
import { UserCreateDTO, UserCreateData, userCreateSchema } from '../../domain';
import { EStatusUser } from '../../domain/enums/user-status';
import { ERolesUser } from '../../domain/enums/user-roles';

export function UserCreate() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const userRepository = new UserRepository();

  const methods = useForm<UserCreateData>({
    defaultValues: {
      name: '',
      lastname: '',
      email: '',
      password: '',
      status: EStatusUser.ACTIVE,
      role: ERolesUser.USER,
    },
    resolver: zodResolver(userCreateSchema),
  });

  async function create(data: UserCreateDTO) {
    if (loading) return;

    try {
      setLoading(true);

      await userRepository.create(data);

      toast.success('Usuário cadastrado com sucesso!');
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  async function submit(data: UserCreateData) {
    const user = {
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      status: data.status,
      role: data.role
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
          <LinkButton to='/funcionarios' variant='outlined' size='large'>
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
        </FormProvider>
      </PageCard>
    </Page>
  );
}
