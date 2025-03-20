import { Fragment, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function Page({ children }: Props) {
  return <Fragment>{children}</Fragment>;
}
