import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { FornosDto } from '../domain/dto/fornos.dto';
import { EStatusForno } from '../domain/enums/status-fornos.enum';

interface Props {
    logs: FornosDto[];
}

export function TabelaFornos({ logs }: Props) {
    return (
        <TableContainer component={Paper} >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Número do forno</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Situação</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {logs.map((log) => (
                        <TableRow key={log.id}>
                            <TableCell>{log.name}</TableCell>
                            <TableCell>{log.nro_forno}</TableCell>
                            <TableCell>
                                <Box display="flex" alignItems="center">
                                    <Box
                                        sx={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: '50%',
                                            bgcolor: log.status === EStatusForno.EM_MANUTENCAO ? 'yellow' : 'green',
                                            // marginRight: 1,
                                        }}
                                    />
                                </Box>
                            </TableCell>
                            <TableCell>{log.situacao}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
