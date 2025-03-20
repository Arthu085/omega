import { ReactNode } from 'react';

export interface IStepperStep {
  label: string;
  step: ReactNode;
  badge?: number;
  optional?: boolean;
}
