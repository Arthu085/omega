import { formatPhone } from '@/shared/utils/phone';
import { Link } from '@mui/material';

interface Props {
  phone: string;
}

export function DataTableColumnPhone({ phone }: Props) {
  return (
    <Link onClick={(e) => e.stopPropagation()} href={`tel:+${phone}`}>
      {formatPhone(phone)}
    </Link>
  );
}
