import { toast } from 'react-toastify';

import { ProductionRepository } from '@/modules/home/repositories/home-repository';
import { useConfirmDialog } from '@/shared/components';
import { ID } from '@/shared/domain/types/id.type';
import { formatErrorForNotification } from '@/shared/utils/error';

export function useProduction() {
    const repository = new ProductionRepository();
    const { openConfirmDialog } = useConfirmDialog();

    async function finalizeProduction(id: ID, callback?: () => void) {
        const continueRemove = await openConfirmDialog({
            title: 'Confirmar Finalização',
            description:
                'Você tem certeza que deseja excluir esta produção? Essa é uma ação irreversível.',
        });

        if (!continueRemove) return;

        await toast.promise(repository.finalize(id), {
            pending: 'Finalizando produção...',
            success: 'Produção excluída com sucesso!',
            error: {
                render: ({ data }) => {
                    return formatErrorForNotification(data);
                },
            },
        });

        if (callback) callback();
    }

    return {
        finalizeProduction
    };
}
