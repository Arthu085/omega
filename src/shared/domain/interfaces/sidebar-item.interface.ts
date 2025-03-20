import { ReactNode } from 'react';

interface ItemChildren {
  name: string;
  path: string;
  ability?: any;
}

export interface ISidebarItem {
  icon: ReactNode;
  name: string;
  path: string;
  ability?: any;
  children?: Array<ItemChildren>;
}
