import { FornosDto } from '@/modules/fornos/domain/dto/fornos.dto';
import { FurnaceEntity } from '@/modules/fornos/domain/entities/furnace.entity';
import { FurnaceRepository } from '@/modules/fornos/repositories/furnace.repository';
import { Box, Button, Grid, Modal } from '@mui/material';
import { ControlledNumber, ControlledText } from '@shared/components';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

interface FurnaceCreateModalProps {
    isOpen: boolean;
    onClose: () => void;
    id?: number | undefined;
    data?: FurnaceEntity
}

export function FurnaceCreateModal({
    isOpen,
    onClose,
    id = undefined,
    data = undefined,
}: FurnaceCreateModalProps) {
    const { control, handleSubmit, reset } = useForm({
    });
    const furnaceRepository = new FurnaceRepository();

    useEffect(() => {
        if (data) {
            reset(data);
        }
    }, [id, data, reset]);

    const onSubmit = async (formData: FornosDto) => {
        if (data && id) {
            const phase = {
                name: formData.name,
                nro_forno: formData.nro_forno,
            };

            console.log('phase: ', phase);

            furnaceRepository
                .update(id, phase)
                .then(async () => {
                    reset();
                    toast.success('Processo principal atualizado com sucesso!');
                    onClose();
                })
                .catch((e) => {
                    console.log(e);
                    toast.error(`Ooops! Um erro ocorreu! ${e.response?.data?.message}.`);
                });
        } else {
            const { ...create } = formData;
            furnaceRepository
                .create(create)
                .then(async () => {
                    reset();
                    toast.success('Processo principal criado com sucesso!');
                    onClose();
                })
                .catch((e) => {
                    console.log(e);
                    toast.error(`Ooops! Um erro ocorreu! ${e.response?.data?.message}.`);
                });
        }
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={style} component='form' onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ControlledText label='Nome' name='name' control={control} />
                    </Grid>
                    <Grid item xs={12}>
                        <ControlledText label='Número do forno' name='nro_forno' control={control} />
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 16 }}>
                    <Button variant='contained' color='primary' type='submit'>
                        Salvar
                    </Button>
                    <Button variant='outlined' color='secondary' onClick={onClose} sx={{ ml: 2 }}>
                        Cancelar
                    </Button>
                </Grid>
            </Box>
        </Modal>
    );
}

