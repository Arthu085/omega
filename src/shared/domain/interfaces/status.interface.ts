import { ReactElement } from 'react';
import { IOption } from './option.interface';

export interface IStatus<T> extends IOption<T> {
  color: 'error' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'default';
  icon?: ReactElement;
}
