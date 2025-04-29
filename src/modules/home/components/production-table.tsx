// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//   } from '@mui/material';
//   import { formatDate } from '@/shared/utils';
//   import { AlarmLog } from '../domain/entities/AlarmLog';
//   import { EAlarmLogTranslate } from '../domain/enums/EAlarmLogAction';
  
//   interface Props {
//     logs: AlarmLog[];
//   }
  
//   export function AlarmLogTable({ logs }: Props) {
//     return (
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Data</TableCell>
//               <TableCell>Ação</TableCell>
//               <TableCell>Mensagem</TableCell>
//               <TableCell>Usuário</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {logs.map((log) => (
//               <TableRow key={log.id}>
//                 <TableCell>{formatDate(log.executedAt, true)}</TableCell>
//                 <TableCell>{EAlarmLogTranslate[log.action]}</TableCell>
//                 <TableCell>{log.message}</TableCell>
//                 <TableCell>{log.users?.name}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     );
//   }
  