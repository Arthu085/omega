import { Link } from '@mui/material';

interface Props {
  email: string;
}

export function DataTableColumnEmail({ email }: Props) {
  return (
    <Link
      onClick={(e) => e.stopPropagation()}
      href={`mailto:${email}`}
      sx={{ wordBreak: 'break-all' }}
    >
      {email}
    </Link>
  );
}
