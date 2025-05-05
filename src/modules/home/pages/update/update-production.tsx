import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

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
import { ID } from '@/shared/domain';
import { callbackOnInvalidZod, formatErrorForNotification } from '@/shared/utils';
import { ProductionUpdateDto } from '../../domain/dto/production-update.dto';
import { EStatusProduction } from '../../domain/enums/status-production.enum';
import { productionUpdateSchema } from '../../domain/schemas/production-update.schema';
import { ProductionRepository } from '../../repositories/home-repository';
import { UpdateProductionForm } from './components/update-production-form';
// import { useAuth } from '@/modules/auth/hooks';
// import { EAbilityAction, EAbilityCodes } from '@/modules/role/domain';

export function ProductionUpdate() {
    // const { user } = useAuth();
    const { id } = useParams();

    const navigate = useNavigate();

    // const canDelete = user?.role?.permissions.some(permission =>
    //   permission.action === EAbilityAction.DELETE && permission.code === EAbilityCodes.COMPANIES
    // );
    const companyRepository = new ProductionRepository();

    const [loading, setLoading] = useState<boolean>(false);

    // const { openConfirmDialog } = useConfirmDialog();

    const methods = useForm<ProductionUpdateDto>({
        defaultValues: {
            forno: {
                id: 0
            },
            lote: 0,
            loteFrita: 0,
            temperatura: 0,
            oleo: 0,
            peso: 0,
            rpm: 0,
            oxigenio: 0,
            status: EStatusProduction.EXECUTANDO,
            tMovel: 0,
        },
        resolver: zodResolver(productionUpdateSchema),
    });

    async function update(id: ID, data: ProductionUpdateDto) {
        if (loading) return;

        try {
            setLoading(true);

            await companyRepository.update(id, data);

            toast.success('Empresa atualizada com sucesso!');

            navigate(EAuthenticatedPath.PRODUCAO);
        } catch (error) {
            toast.error(formatErrorForNotification(error));
        } finally {
            setLoading(false);
        }
    }

    async function submit(data: ProductionUpdateDto) {
        if (!id) {
            toast.error('Identificador da Empresa não encontrado!');
            return;
        }


        const transformedData = {
            ...data,
            idForno: data.forno?.id,
        };

        update(id, transformedData);
    }

    async function getProduction(id: ID) {
        if (loading) return;

        try {
            setLoading(true);

            const { ...company } = await companyRepository.getProductionById(id);

            methods.reset({
                ...company,
            });
        } catch (error) {
            toast.error(formatErrorForNotification(error));
            navigate(EAuthenticatedPath.PRODUCAO);
        } finally {
            setLoading(false);
        }
    }

    // async function handleDelete(id: any) {
    //   const continueDelete = await openConfirmDialog({
    //     title: 'Confirmar Exclusão',
    //     description: 'Você tem certeza que deseja apagar esta Empresa? Essa é uma ação irreversível. ',
    //   });

    //   if (!continueDelete) return;

    //   if (loading) return;

    //   try {
    //     setLoading(true);

    //     await companyRepository.delete(id);

    //     toast.success('Empresa excluida com sucesso!');

    //     navigate(EAuthenticatedPath.COMPANIES);
    //   } catch (error: any) {
    //     toast.error(formatErrorForNotification(error.response.data));
    //   } finally {
    //     setLoading(false);
    //   }
    // }

    useEffect(() => {
        if (id) getProduction(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <Page>
            <PageHeader>
                <PageTitle>Editar Produção</PageTitle>

                <PageButtons display='flex' flexWrap='wrap'>
                    {/* {canDelete && (
            <LoadingButton
              loading={loading}
              loadingIndicator='Deletando...'
              onClick={() => handleDelete(id!)}
              size='large'
              variant='contained'
              sx={{ minWidth: '180px', backgroundColor: 'background.paper', color: 'text.primary', '&:hover': { backgroundColor: 'text.disabled' } }}
            >
              Excluir
            </LoadingButton>
          )} */}
                    <LinkButton to='/empresas' variant='outlined' size='large' sx={{ minWidth: '180px' }}>
                        Cancelar
                    </LinkButton>
                    <LoadingButton
                        loading={loading}
                        loadingIndicator='Salvando...'
                        onClick={methods.handleSubmit(submit, callbackOnInvalidZod)}
                        variant='contained'
                        size='large'
                        sx={{ minWidth: '180px' }}
                    >
                        Salvar
                    </LoadingButton>
                </PageButtons>
            </PageHeader>

            <PageCard sx={{ flexGrow: 1 }}>
                <FormProvider {...methods}>
                    <UpdateProductionForm />
                </FormProvider>
            </PageCard>
        </Page>
    );
}
