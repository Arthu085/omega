// import { EAuthenticatedPath } from '@/core/router';
import {
  LinkButton,
  LoadingButton,
  Page,
  PageButtons,
  PageCard,
  PageHeader,
  PageTitle,
} from '@/shared/components';
import { callbackOnInvalidZod, formatErrorForNotification } from '@/shared/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FieldErrors, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RoleCreateDTO } from '../../domain/dto';
import { RoleCreateData, roleCreateSchema } from '../../domain/schemas/role-create.schema';
import { RoleRepository } from '../../repositories/role.repository';
import { RoleCreateFilter } from '../create/components/role-create-filter';
import { RoleForm } from './components/role-create-form';

export function RoleCreate() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const roleRepository = new RoleRepository();
  const methods = useForm<RoleCreateData>({
    defaultValues: {
      name: '',
      permissions: [],
      baseProfile: false,
    },
    resolver: zodResolver(roleCreateSchema),
  });

  async function create(data: RoleCreateDTO) {
    if (loading) return;

    try {
      setLoading(true);

      await roleRepository.create(data);

      toast.success('Perfil cadastrado com sucesso!');
      navigate('');
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  async function submit(data: RoleCreateData) {
    const dataDTO = {
      name: data.name,
      reference: data.reference,
      permissionsIds: data.permissions.map((permission) => permission.id)
    }
    create(dataDTO);
  }

  function handleZodInvalidSchema(errors: FieldErrors<RoleCreateData>) {
    callbackOnInvalidZod(errors);
    Object.values(errors).map((prop) => {
      if (prop.message && !prop.ref) toast.error(prop.message);
    });
  }

  return (
    <Page>
      <PageHeader>
        <PageTitle toHome>Novo Tipo de Perfil</PageTitle>

        <PageButtons>
          <LinkButton to='/perfis' variant='outlined' size='large' sx={{ minWidth: '180px' }}>
            Cancelar
          </LinkButton>
          <LoadingButton
            loading={loading}
            loadingIndicator='Salvando...'
            onClick={methods.handleSubmit(submit, handleZodInvalidSchema)}
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
          <RoleCreateFilter />
          <RoleForm />
        </FormProvider>
      </PageCard>
    </Page>
  );
}
