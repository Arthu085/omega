import { Box, Button, Grid, Modal } from '@mui/material';
import { ControlledText } from '@shared/components';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CadastroFuncionarioEntity } from '../domain/entities/cadastro-funcionario.entity';
import { FuncionarioRepository } from '../repositories/funcionario.hook';
import { cadastroFuncionarioDto } from '../domain/dto/cadastro-funcionarios.dto';
import { EStatusFuncionario } from '../domain/enums/status-funcionario';

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

interface FuncionarioCreateModalProps {
    isOpen: boolean;
    onClose: () => void;
    id?: number | undefined;
    data?: CadastroFuncionarioEntity
}

export function FuncionarioCreateModal({
    isOpen,
    onClose,
    id = undefined,
    data = undefined,
}: FuncionarioCreateModalProps) {
    const { control, handleSubmit, reset } = useForm({
    });
    const funcionarioRepository = new FuncionarioRepository();

    useEffect(() => {
        if (data) {
            reset(data);
        }
    }, [id, data, reset]);

    const onSubmit = async (formData: cadastroFuncionarioDto) => {
        if (data && id) {
            const funcionario = {
                 nome: formData.nome,
                 sobrenome: formData.sobrenome,
                 email: formData.email,
                 senha: formData.senha,
            };

            funcionarioRepository
                .update(id, furnace)
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
            funcionarioRepository
                .create(create)
                .then(async () => {
                    reset();
                    toast.success('Funcionario criado com sucesso!');
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
                        <ControlledText label='Nome' name='nome' control={control} />
                    </Grid>
                    <Grid item xs={12}>
                        <ControlledText label='Número do forno' name='nroForno' control={control} />
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

